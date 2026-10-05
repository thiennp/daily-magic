/** Arch-locked check_context statuses. Not preflight pass|warn|block. */
export const CHECK_CONTEXT_STATUSES = ["hit", "miss", "none"] as const;

export type CheckContextStatus = (typeof CHECK_CONTEXT_STATUSES)[number];

/** Tip budget for a hit (design: ≤~120 tokens). */
export const CHECK_CONTEXT_TIP_MAX_TOKENS = 120;

export const CHECK_CONTEXT_TIP_MAX_LINES = 4;

/** Rough token estimate for tip capping (chars/4). */
export const estimateTipTokenCount = (text: string): number =>
  Math.ceil(text.length / 4);
