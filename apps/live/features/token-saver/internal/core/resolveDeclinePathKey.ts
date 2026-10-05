import type { CliFs } from "./cliFs.types";

/**
 * Decline/dedupe key for a folder.
 * v1: realpath(cwd). TODO(D3): git rev-parse --git-common-dir parent so
 * worktrees share one decline; submodules keep their own toplevel.
 */
export const resolveDeclinePathKey = (
  cwd: string,
  fs: Pick<CliFs, "realpath" | "exists">,
): string => {
  const trimmed = cwd.trim();
  if (trimmed.length === 0) {
    return trimmed;
  }
  try {
    return fs.exists(trimmed) ? fs.realpath(trimmed) : trimmed;
  } catch {
    return trimmed;
  }
};
