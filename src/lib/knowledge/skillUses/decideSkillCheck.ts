/** Uses after which a skill version is checked; then every CHECK_EVERY_AFTER uses. */
const FIBONACCI_CHECKPOINTS: readonly number[] = [2, 3, 5, 8, 13, 21];
const CHECK_EVERY_AFTER = 21;
/** Failed runs can call a check early, but only this many times per version. */
export const MAX_FAILURE_CHECKS = 3;

export type SkillCheckTrigger = "checkpoint" | "failure";

/** 2, 3, 5, 8, 13, 21, then 42, 63, 84… */
export const isSkillCheckpoint = (usedCount: number): boolean =>
  FIBONACCI_CHECKPOINTS.includes(usedCount) ||
  (usedCount > CHECK_EVERY_AFTER && usedCount % CHECK_EVERY_AFTER === 0);

/**
 * Whether a skill version is due for a check after a run ended. `usedCount`
 * counts finished runs of this version; the window judged is everything
 * since the last check.
 */
export const decideSkillCheck = (input: {
  readonly usedCount: number;
  readonly lastCheckedCount: number;
  readonly unjudgedFailures: number;
  readonly failureChecks: number;
}): SkillCheckTrigger | null => {
  if (input.usedCount <= input.lastCheckedCount) {
    return null;
  }
  if (isSkillCheckpoint(input.usedCount)) {
    return "checkpoint";
  }
  return input.unjudgedFailures > 0 && input.failureChecks < MAX_FAILURE_CHECKS
    ? "failure"
    : null;
};
