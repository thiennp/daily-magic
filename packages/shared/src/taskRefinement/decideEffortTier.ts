import { EFFORT_TIERS, type EffortTier } from "./taskRefinement.constant";

const HIGH =
  /\b(architect|design|refactor|migrat|security|investigat|debug|root cause|performance)/i;
const MEDIUM =
  /\b(implement|build|integrat|fix|add|create|write|update|support)/i;

/**
 * Cheapest tier that can plausibly do the task. A matched skill script needs no
 * agent; otherwise short plain titles are `low`, build-style work is `medium`,
 * open-ended work is `high`. Callers may override (an Ollama score, the user).
 */
export const decideEffortTier = (input: {
  readonly title: string;
  readonly hasSkillScript: boolean;
}): EffortTier => {
  if (input.hasSkillScript) {
    return "script";
  }
  const words = input.title.trim().split(/\s+/).length;
  if (HIGH.test(input.title) || words > 18) {
    return "high";
  }
  return MEDIUM.test(input.title) || words > 8 ? "medium" : "low";
};

/** One tier up after a verified failure (script falls back to the cheapest agent). */
export const escalateEffortTier = (tier: EffortTier): EffortTier =>
  EFFORT_TIERS[
    Math.min(EFFORT_TIERS.indexOf(tier) + 1, EFFORT_TIERS.length - 1)
  ] ?? "high";
