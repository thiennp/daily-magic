/**
 * Screen D — branch / worktree meta refs for Assign dialog.
 * HARD: meta names only; absolute / local paths stay local and never enter Neon meta.
 */

export type ProjectTaskGitRefOption = {
  readonly id: string;
  readonly label: string;
};

/** Reject absolute/relative paths; keep short git-ish names. */
export const sanitizeProjectTaskGitRefName = (
  raw: string,
): string | null => {
  const trimmed = raw.trim();
  if (trimmed.length === 0) return null;
  if (trimmed.length > 128) return null;
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("~") ||
    trimmed.includes("\\") ||
    trimmed.includes(":") ||
    trimmed.includes("..")
  ) {
    return null;
  }
  // Disallow obvious filesystem path segments with separators beyond git-ish /
  // (single / is OK for "feat/foo"; leading / already rejected).
  if (/\s/.test(trimmed)) return null;
  return trimmed;
};

export const buildProjectTaskBranchOptions = (input: {
  readonly defaultBranch: string | null;
  readonly branches?: readonly string[];
}): readonly ProjectTaskGitRefOption[] => {
  const seen = new Set<string>();
  const out: ProjectTaskGitRefOption[] = [];
  const push = (raw: string): void => {
    const name = sanitizeProjectTaskGitRefName(raw);
    if (name === null || seen.has(name)) return;
    seen.add(name);
    out.push({ id: name, label: name });
  };
  if (input.defaultBranch !== null) push(input.defaultBranch);
  for (const b of input.branches ?? []) push(b);
  if (out.length === 0) push("main");
  return out;
};

export const buildProjectTaskWorktreeOptions = (input: {
  readonly worktrees?: readonly string[];
}): readonly ProjectTaskGitRefOption[] => {
  const seen = new Set<string>();
  const out: ProjectTaskGitRefOption[] = [];
  for (const w of input.worktrees ?? []) {
    const name = sanitizeProjectTaskGitRefName(w);
    if (name === null || seen.has(name)) continue;
    seen.add(name);
    out.push({ id: name, label: name });
  }
  return out;
};
