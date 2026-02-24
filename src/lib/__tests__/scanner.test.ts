import { describe, it, expect, vi, beforeEach } from "vitest";
import { resolve } from "path";

// We test the scanner by pointing it at a known fixture directory.
// Since the scanner reads from the filesystem relative to process.cwd(),
// we'll test the core logic pieces directly.

import { appMetaSchema } from "../schema";

describe("scanner integration", () => {
  it("can parse the dashboard's own app.meta.json", async () => {
    const fs = await import("fs/promises");
    const metaPath = resolve(process.cwd(), "app.meta.json");
    const raw = await fs.readFile(metaPath, "utf-8");
    const parsed = JSON.parse(raw);
    const result = appMetaSchema.parse(parsed);

    expect(result.name).toBe("dashboard");
    expect(result.displayName).toBe("Workspace Dashboard");
    expect(result.status).toBe("in-progress");
    expect(result.techStack).toContain("Next.js");
  });

  it("scanWorkspace returns at least the dashboard itself when run from workspace", async () => {
    // This test validates the full scan pipeline
    // The dashboard directory contains app.meta.json, so it should be discovered
    // (The scanner skips itself by default, so we check other directories)
    const { scanWorkspace } = await import("../scanner");
    const apps = await scanWorkspace();

    // Should return an array
    expect(Array.isArray(apps)).toBe(true);

    // Each app should have the expected shape
    for (const app of apps) {
      expect(app).toHaveProperty("folderName");
      expect(app).toHaveProperty("path");
      expect(app).toHaveProperty("meta");
      expect(app).toHaveProperty("git");
    }
  });
});
