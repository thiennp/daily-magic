/**
 * Returns true when every ref on stdin is a branch/tag deletion (local sha all-zero).
 * Git pre-push lines: `<local ref> <local sha> <remote ref> <remote sha>`.
 */
export const isDeleteOnlyGitPush = (lines: readonly string[]): boolean => {
  let sawRef = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length < 2) continue;
    sawRef = true;
    const localSha = parts[1];
    if (localSha !== "0000000000000000000000000000000000000000") {
      return false;
    }
  }
  return sawRef;
};
