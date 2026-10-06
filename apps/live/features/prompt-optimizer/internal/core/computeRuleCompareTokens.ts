import { estimateTokenCount } from "@agent-witch/shared/pitfalls";
import { formatCheckContextTip } from "@agent-witch/shared/token-saver";
import { resolvePromptSdlcWriterRateUsdPer1k } from "./proposePromptSdlcStep4Budget";
import type {
  RuleCompareMatchedRule,
  RuleCompareTokenStats,
} from "./ruleCompare.type";

/** One tip counter for matched rules + predicted added USD. */
export const computeRuleCompareTokens = (input: {
  readonly prompt: string;
  readonly matched: readonly RuleCompareMatchedRule[];
}): RuleCompareTokenStats => {
  const promptTokens = estimateTokenCount(input.prompt);
  const tip = formatCheckContextTip(
    input.matched.map((rule) => ({
      id: rule.id,
      avoidance: rule.avoidance,
    })),
  );
  const rulesTokens =
    input.matched.length === 0 ? 0 : estimateTokenCount(tip);
  const rate = resolvePromptSdlcWriterRateUsdPer1k(null);
  return {
    promptTokens,
    rulesTokens,
    addedCostUsd: (rulesTokens / 1000) * rate,
  };
};
