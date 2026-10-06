/**
 * S0-4 / S0-6: the one place for the limits and permission profile that
 * AgentWitch Local applies to every local CLI writer run (computer-seat
 * assigns and the owner's own runs alike). There is no "full" profile.
 *
 * - maxTurns:      Claude `--max-turns` (Codex/Cursor/Antigravity have no turn
 *                  flag; the wall-clock limit covers them).
 * - maxMinutes:    wall-clock cap enforced by AWL for every CLI
 *                  (AgentRunSessionLimit → kill process tree → session limit).
 * - maxBudgetUsd:  Claude `--max-budget-usd` (no equivalent on the others).
 */
export const LOCAL_CLI_RUN_LIMITS = {
  maxTurns: 30,
  maxMinutes: 30,
  maxBudgetUsd: 2,
} as const;

/**
 * Claude `--permission-mode dontAsk` allowlist: file tools inside the run's
 * working folder plus read-only git. Anything else is auto-denied (no prompt,
 * no bypass). Edits outside the working folder still need a permission
 * Claude cannot get in dontAsk, so they are denied.
 */
export const LOCAL_CLI_CLAUDE_ALLOWED_TOOLS = [
  "Read",
  "Glob",
  "Grep",
  "Edit",
  "Write",
  "TodoWrite",
  "Bash(git status *)",
  "Bash(git diff *)",
  "Bash(git log *)",
  "Bash(git show *)",
] as const;

/** `timeout(1)` convention, so a session-limit stop is not read as a user stop (130). */
export const LOCAL_CLI_SESSION_LIMIT_EXIT_CODE = 124;
