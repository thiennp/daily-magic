import path from "node:path";

import type { CliWriteResult } from "../../public-api/setupProject.types";
import type { CliFs } from "./cliFs.types";
import { writeTextFileAtomic } from "./writeTextFileAtomic";

const EXCLUDE_HEADER = "# agent-witch-token-saver (local; never commit)";

/** Append relative paths to `.git/info/exclude` (D1). Idempotent. */
export const writeGitInfoExclude = (input: {
  readonly fs: CliFs;
  readonly repoRoot: string;
  readonly relativePaths: readonly string[];
}): CliWriteResult | { readonly ok: false; readonly reason: string } => {
  const gitDir = path.join(input.repoRoot, ".git");
  if (!input.fs.exists(gitDir)) {
    return { ok: false, reason: "not a git working tree" };
  }
  // Worktree: .git may be a file; exclude still lives under common info via
  // plain `.git/info/exclude` for normal repos. TODO: resolve git-common-dir.
  const excludePath = path.join(gitDir, "info", "exclude");
  const existing = input.fs.exists(excludePath)
    ? input.fs.readUtf8(excludePath)
    : "";
  const lines = existing.length > 0 ? existing.split(/\r?\n/) : [];
  const have = new Set(lines.map((line) => line.trim()));
  const toAdd = input.relativePaths.filter((p) => !have.has(p));
  if (toAdd.length === 0 && have.has(EXCLUDE_HEADER)) {
    return { ok: true, path: excludePath, wrote: false };
  }
  const nextLines = [...lines];
  while (nextLines.length > 0 && nextLines[nextLines.length - 1] === "") {
    nextLines.pop();
  }
  if (!have.has(EXCLUDE_HEADER)) {
    nextLines.push("", EXCLUDE_HEADER);
  }
  for (const rel of toAdd) {
    nextLines.push(rel);
  }
  nextLines.push("");
  writeTextFileAtomic({
    fs: input.fs,
    filePath: excludePath,
    contents: nextLines.join("\n"),
  });
  return { ok: true, path: excludePath, wrote: toAdd.length > 0 };
};
