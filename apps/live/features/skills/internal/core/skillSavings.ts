/** Savings math (pure). Tokens are per call; see settleSkillCalls for the source. */

/** One call in this many is a holdout (the agent does the step itself). */
export const SKILL_HOLDOUT_EVERY = 10;
/** Fewer baseline samples than this are shown with an estimate mark. */
export const SKILL_MIN_SAMPLES = 3;

export const median = (values: readonly number[]): number | null => {
  if (values.length === 0) {
    return null;
  }
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1
    ? (sorted[mid] ?? 0)
    : Math.round(((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2);
};

export const savedTokens = (baseline: number, actual: number): number =>
  Math.max(0, Math.round(baseline - actual));

export const isEstimate = (samples: number): boolean =>
  samples < SKILL_MIN_SAMPLES;

const hashOffset = (skillId: string, every: number): number => {
  let h = 0;
  for (const ch of skillId) {
    h = (h * 31 + ch.charCodeAt(0)) % 1_000_003;
  }
  return h % every;
};

/**
 * Deterministic holdout: the nth call of a skill is a holdout when
 * (n + per-skill offset) % every == every - 1. Never before a baseline exists
 * and never the first call.
 */
export const shouldHoldout = (input: {
  readonly skillId: string;
  readonly priorCalls: number;
  readonly hasBaseline: boolean;
  readonly every?: number;
}): boolean => {
  const every = input.every ?? SKILL_HOLDOUT_EVERY;
  return (
    every > 0 &&
    input.hasBaseline &&
    input.priorCalls > 0 &&
    (input.priorCalls + hashOffset(input.skillId, every)) % every === every - 1
  );
};
