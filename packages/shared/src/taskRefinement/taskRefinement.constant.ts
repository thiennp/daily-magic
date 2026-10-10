/** `script` = a published skill script does it (no agent); the rest are agent effort levels. */
export const EFFORT_TIERS = ["script", "low", "medium", "high"] as const;
export type EffortTier = (typeof EFFORT_TIERS)[number];

/** Why a refined task is blocked: waiting for a skill to be made, or for a person. */
export const BLOCKED_ON_VALUES = ["skill", "user"] as const;
export type BlockedOn = (typeof BLOCKED_ON_VALUES)[number];

/** How a finished task was checked. `none` = done but unverified. */
export const VERIFY_SIGNALS = [
  "exit_code",
  "schema",
  "checker",
  "none",
] as const;
export type VerifySignal = (typeof VERIFY_SIGNALS)[number];

export const TASK_CLAIM_LEASE_MS = 5 * 60 * 1000;
export const SPLIT_MAX_SUBTASKS = 10;
export const PARENT_MAX_CHILDREN = 20;
/** Failed runs before the task is handed to a person. */
export const TASK_MAX_ATTEMPTS = 3;
/** Blocks (block → unblock → block again) before the task is handed to a person. */
export const TASK_BLOCK_CAP = 3;
/** A task blocked on a skill this long is handed to a person. */
export const SKILL_BLOCK_STALE_HOURS = 24;
