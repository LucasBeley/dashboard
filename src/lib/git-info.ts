import { readFile } from "fs/promises";
import { join } from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export interface GitInfo {
  branch: string | null;
  lastCommitMessage: string | null;
  lastCommitDate: string | null;
}

export async function getGitInfo(appPath: string): Promise<GitInfo> {
  const result: GitInfo = {
    branch: null,
    lastCommitMessage: null,
    lastCommitDate: null,
  };

  try {
    const headContent = await readFile(
      join(appPath, ".git", "HEAD"),
      "utf-8"
    );
    const match = headContent.match(/^ref: refs\/heads\/(.+)/);
    if (match) {
      result.branch = match[1].trim();
    }
  } catch {
    // Not a git repo or no .git/HEAD
  }

  try {
    const { stdout } = await execFileAsync(
      "git",
      ["-C", appPath, "log", "-1", "--format=%s|%ar"],
      { timeout: 3000 }
    );
    const [message, date] = stdout.trim().split("|");
    result.lastCommitMessage = message || null;
    result.lastCommitDate = date || null;
  } catch {
    // git not available or no commits
  }

  return result;
}
