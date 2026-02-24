import { readdir, readFile, stat } from "fs/promises";
import { join, resolve } from "path";
import { appMetaSchema, type AppMeta } from "./schema";
import { getGitInfo, type GitInfo } from "./git-info";

const WORKSPACE_DIR = resolve(process.cwd(), "..");
const META_FILENAME = "app.meta.json";
const SKIP_NAMES = new Set(["node_modules", ".claude"]);

export interface DiscoveredApp {
  folderName: string;
  path: string;
  meta: AppMeta | null;
  parseError?: string;
  git: GitInfo;
}

export async function scanWorkspace(): Promise<DiscoveredApp[]> {
  const entries = await readdir(WORKSPACE_DIR, { withFileTypes: true });

  const dirs = entries.filter(
    (e) => e.isDirectory() && !e.name.startsWith(".") && !SKIP_NAMES.has(e.name)
  );

  const results = await Promise.all(
    dirs.map(async (dir) => {
      const dirPath = join(WORKSPACE_DIR, dir.name);
      const metaPath = join(dirPath, META_FILENAME);

      let meta: AppMeta | null = null;
      let parseError: string | undefined;

      try {
        const raw = await readFile(metaPath, "utf-8");
        const parsed = JSON.parse(raw);
        meta = appMetaSchema.parse(parsed);
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
          parseError = String(err);
        }
      }

      const git = await getGitInfo(dirPath);

      return { folderName: dir.name, path: dirPath, meta, parseError, git };
    })
  );

  // Sort: configured first (deployed > ready > in-progress > planning > archived), then unconfigured
  const statusOrder: Record<string, number> = {
    deployed: 0,
    ready: 1,
    "in-progress": 2,
    planning: 3,
    archived: 4,
  };

  return results.sort((a, b) => {
    if (a.meta && !b.meta) return -1;
    if (!a.meta && b.meta) return 1;
    if (a.meta && b.meta) {
      const orderA = statusOrder[a.meta.status] ?? 5;
      const orderB = statusOrder[b.meta.status] ?? 5;
      if (orderA !== orderB) return orderA - orderB;
    }
    return a.folderName.localeCompare(b.folderName);
  });
}
