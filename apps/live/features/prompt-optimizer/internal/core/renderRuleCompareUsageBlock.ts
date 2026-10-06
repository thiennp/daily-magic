import { RULE_COMPARE_COPY } from "./ruleCompareCopy.constant";
import {
  renderRuleDropFlash,
  renderRuleUsageMessage,
  renderRuleUsageRetry,
} from "./renderRuleDropFlash";
import { renderRuleUsageList } from "./renderRuleUsageList";
import type {
  RuleChangeFetchResult,
  RuleUsageFetchResult,
} from "./ruleCompare.type";

const renderChangeError = (
  result: RuleChangeFetchResult,
  action: "drop" | "restore",
): string => {
  if (result.ok) return "";
  if (result.reason === "forbidden") {
    return renderRuleUsageMessage(RULE_COMPARE_COPY.ownerOnlyDrop);
  }
  if (result.reason === "limit_exceeded") {
    return renderRuleUsageMessage(RULE_COMPARE_COPY.limitReached);
  }
  return renderRuleUsageMessage(
    action === "restore"
      ? RULE_COMPARE_COPY.restoreFailed
      : RULE_COMPARE_COPY.dropFailed,
  );
};

/** Rule use panel body from usage fetch + optional drop flash/error. */
export const renderRuleCompareUsageBlock = (input: {
  readonly projectId: string;
  readonly prompt: string;
  readonly usage: RuleUsageFetchResult | null;
  readonly dropFlash?: { readonly ruleId: string; readonly title: string } | null;
  readonly changeError?: RuleChangeFetchResult | null;
  readonly changeAction?: "drop" | "restore";
}): string => {
  if (input.usage === null) {
    return renderRuleUsageMessage(RULE_COMPARE_COPY.connectComputer, "muted");
  }
  if (!input.usage.ok) {
    if (input.usage.reason === "not_connected") {
      return renderRuleUsageMessage(RULE_COMPARE_COPY.connectComputer, "muted");
    }
    if (input.usage.reason === "forbidden") {
      return renderRuleUsageMessage(RULE_COMPARE_COPY.ownerOnlyUsage, "muted");
    }
    return renderRuleUsageRetry({
      projectId: input.projectId,
      prompt: input.prompt,
    });
  }
  let flashHtml = "";
  if (input.changeError !== undefined && input.changeError !== null) {
    flashHtml = renderChangeError(
      input.changeError,
      input.changeAction ?? "drop",
    );
  } else if (input.dropFlash) {
    flashHtml = renderRuleDropFlash({
      projectId: input.projectId,
      ruleId: input.dropFlash.ruleId,
      title: input.dropFlash.title,
      prompt: input.prompt,
    });
  }
  return renderRuleUsageList({
    projectId: input.projectId,
    rules: input.usage.data.rules,
    overlaps: input.usage.data.overlaps,
    flashHtml,
    prompt: input.prompt,
  });
};
