import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { buildGitSubprocessEnv } from "@agent-witch/shared";

const execFileAsync = promisify(execFile);
const GIT_TIMEOUT_MS = 20_000;
/** What the judge reads of one commit: the file list plus the start of the diff. */
export const COMMIT_CHANGES_CAP = 8_000;

/** Files that are noise or secret: never part of what the judge reads. */
const EXCLUDED_PATHS: readonly string[] = [
  "*.lock",
  "package-lock.json",
  "pnpm-lock.yaml",
  "*.snap",
  "*.map",
  "*.min.js",
  ".env*",
  "*.pem",
  "*.key",
  "*secret*",
];

/**
 * The changes one commit made (file list and diff), trimmed to a fixed size.
 * Only the commit's own changes: no other files, no history. Null when git
 * fails or the commit changed nothing readable.
 */
export const readCommitChanges = async (
  folderPath: string,
  sha: string,
): Promise<string | null> => {
  if (!/^[0-9a-f]{7,64}$/i.test(sha)) {
    return null;
  }
  try {
    const { stdout } = await execFileAsync(
      "git",
      [
        "show",
        "--no-color",
        "--no-ext-diff",
        "--format=",
        "--stat=100",
        "--patch",
        sha,
        "--",
        ".",
        ...EXCLUDED_PATHS.map((glob) => `:(exclude)${glob}`),
      ],
      {
        cwd: folderPath,
        env: buildGitSubprocessEnv(),
        maxBuffer: 16 * 1024 * 1024,
        timeout: GIT_TIMEOUT_MS,
      },
    );
    const text = stdout.trim();
    if (text.length === 0) {
      return null;
    }
    return text.length > COMMIT_CHANGES_CAP
      ? `${text.slice(0, COMMIT_CHANGES_CAP)}\n… (diff trimmed)`
      : text;
  } catch {
    return null;
  }
};
