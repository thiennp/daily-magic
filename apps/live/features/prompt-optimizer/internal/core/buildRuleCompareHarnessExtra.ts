import { matchPitfallsByKeywords } from "@agent-witch/live-token-saver";
import type { Pitfall } from "@agent-witch/live-token-saver/types";
import type { ProjectPitfallView } from "@agent-witch/shared/pitfalls";

import { computeRuleCompareTokens } from "./computeRuleCompareTokens";
import { RULE_COMPARE_COPY } from "./ruleCompareCopy.constant";
import { renderProjectRuleCompareSection } from "./renderProjectRuleCompareSection";
import { renderRuleCompareResult } from "./renderRuleCompareResult";
import { renderRuleCompareUsageBlock } from "./renderRuleCompareUsageBlock";
import { renderRuleUsageMessage } from "./renderRuleDropFlash";
import type {
  RuleChangeFetchResult,
  RuleUsageFetchResult,
} from "./ruleCompare.type";

const toPitfall = (view: ProjectPitfallView): Pitfall => ({
  id: view.id,
  projectId: view.projectId,
  symptom: view.symptom,
  cause: view.cause,
  avoidance: view.avoidance,
  check: view.check,
  keywords: view.keywords,
  tags: view.tags,
  source: view.source,
  hitCount: view.hitCount,
  lastSeenAt: view.lastSeenAt,
  severity: view.severity,
});

export type BuildRuleCompareHarnessExtraInput = {
  readonly projectId: string;
  readonly prompt: string | null;
  readonly activeRules: readonly ProjectPitfallView[] | null;
  readonly rulesUnavailable?: boolean;
  readonly usage: RuleUsageFetchResult | null;
  readonly dropFlash?: {
    readonly ruleId: string;
    readonly title: string;
  } | null;
  readonly changeError?: RuleChangeFetchResult | null;
  readonly changeAction?: "drop" | "restore";
};

/** Build Playbooks harnessExtraHtml for rule compare + Rule use. */
export const buildRuleCompareHarnessExtra = (
  input: BuildRuleCompareHarnessExtraInput,
): string => {
  const prompt = input.prompt?.trim() ?? "";
  if (prompt.length === 0) {
    return renderProjectRuleCompareSection({
      projectId: input.projectId,
      promptError:
        input.prompt !== null && input.prompt !== undefined
          ? RULE_COMPARE_COPY.emptyPrompt
          : null,
    });
  }
  if (input.rulesUnavailable || input.activeRules === null) {
    return renderProjectRuleCompareSection({
      projectId: input.projectId,
      promptValue: prompt,
      resultHtml: renderRuleUsageMessage(
        RULE_COMPARE_COPY.rulesUnavailable,
        "muted",
      ),
    });
  }
  const matchedPitfalls = matchPitfallsByKeywords({
    pitfalls: input.activeRules.map(toPitfall),
    text: prompt,
  });
  const matched = matchedPitfalls.map((row) => ({
    id: row.id,
    title: row.symptom,
    avoidance: row.avoidance,
  }));
  const tokens = computeRuleCompareTokens({ prompt, matched });
  return renderProjectRuleCompareSection({
    projectId: input.projectId,
    promptValue: prompt,
    resultHtml: renderRuleCompareResult({ matched, tokens }),
    usageHtml: renderRuleCompareUsageBlock({
      projectId: input.projectId,
      prompt,
      usage: input.usage,
      dropFlash: input.dropFlash,
      changeError: input.changeError,
      changeAction: input.changeAction,
    }),
  });
};
