import { RULE_COMPARE_OVERLAP_JACCARD_THRESHOLD } from "@/features/project-pitfalls/internal/core/ruleCompareOverlap.constant";
import { jaccardTokenSetScore } from "@/features/project-pitfalls/internal/core/jaccardTokenSetScore";
import { normalizeRuleCompareText } from "@/features/project-pitfalls/internal/core/normalizeRuleCompareText";
import { tokenizeRuleCompareText } from "@/features/project-pitfalls/internal/core/tokenizeRuleCompareText";
import type { RuleCompareOverlap } from "@/features/project-pitfalls/internal/core/ruleUsage.type";

/** Compare one ordered pair (idA < idB). Pure; null when below threshold. */
export const compareRuleOverlapPair = (input: {
  readonly ruleIdA: string;
  readonly ruleIdB: string;
  readonly textA: string;
  readonly textB: string;
}): RuleCompareOverlap | null => {
  const normA = normalizeRuleCompareText(input.textA);
  const normB = normalizeRuleCompareText(input.textB);
  if (normA.length > 0 && normA === normB) {
    return {
      ruleIdA: input.ruleIdA,
      ruleIdB: input.ruleIdB,
      reason: "duplicate",
      score: 1,
    };
  }
  const score = jaccardTokenSetScore(
    tokenizeRuleCompareText(input.textA),
    tokenizeRuleCompareText(input.textB),
  );
  if (score < RULE_COMPARE_OVERLAP_JACCARD_THRESHOLD) {
    return null;
  }
  return {
    ruleIdA: input.ruleIdA,
    ruleIdB: input.ruleIdB,
    reason: "overlap",
    score,
  };
};
