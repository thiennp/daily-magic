import type { AgentWitchGitWorktreeSnapshot } from "./captureAgentWitchGitWorktreeSnapshot";

export const formatAgentWitchGitWorktreeVerdict = (input: {
  readonly before: AgentWitchGitWorktreeSnapshot;
  readonly after: AgentWitchGitWorktreeSnapshot;
}): string => {
  if (!input.before.isGitRepo && !input.after.isGitRepo) {
    return "Git: not a repository (no worktree verdict).";
  }

  if (!input.before.isGitRepo || !input.after.isGitRepo) {
    return "Git: repository state changed during the run (unexpected).";
  }

  const branchBefore = input.before.branch ?? "unknown";
  const branchAfter = input.after.branch ?? "unknown";
  const branchLine =
    branchBefore === branchAfter
      ? `branch ${branchAfter}`
      : `branch ${branchBefore} → ${branchAfter}`;

  const dirtyBefore =
    input.before.porcelainLineCount > 0
      ? `${input.before.porcelainLineCount} dirty path(s) before run`
      : "clean before run";
  const dirtyAfter =
    input.after.porcelainLineCount > 0
      ? `${input.after.porcelainLineCount} dirty path(s) after run`
      : "clean after run";

  const deltaParts: string[] = [];
  if (input.after.shortstat !== null) {
    deltaParts.push(`diff vs HEAD: ${input.after.shortstat}`);
  } else {
    deltaParts.push("diff vs HEAD: (no tracked changes)");
  }

  return `Git verdict: ${branchLine}; ${dirtyBefore}; ${dirtyAfter}; ${deltaParts.join("; ")}.`;
};
