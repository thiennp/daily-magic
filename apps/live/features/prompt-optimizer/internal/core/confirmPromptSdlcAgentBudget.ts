import { isNumber, isType, isUndefinedOr } from "guardz";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

import { confirmPromptSdlcCostBudget } from "../../../../adapters/promptSdlcAwcCore";
interface PromptSdlcAgentBudgetConfirmJson {
  readonly intent: "confirm_budget";
  readonly confirmedTokenBudget: number;
  readonly confirmedMaxSpendUsd?: number;
  readonly rateUsdPer1kTokens?: number;
}

const isConfirmBody = isType<PromptSdlcAgentBudgetConfirmJson>({
  intent: (value: unknown): value is "confirm_budget" =>
    value === "confirm_budget",
  confirmedTokenBudget: isNumber,
  confirmedMaxSpendUsd: isUndefinedOr(isNumber),
  rateUsdPer1kTokens: isUndefinedOr(isNumber),
});

export type ParsePromptSdlcAgentBudgetConfirmResult =
  | {
      readonly kind: "confirm";
      readonly body: PromptSdlcAgentBudgetConfirmJson;
    }
  | { readonly kind: "invalid"; readonly error: string }
  | { readonly kind: "other" };

export const parsePromptSdlcAgentBudgetConfirmBody = (
  raw: string,
): ParsePromptSdlcAgentBudgetConfirmResult => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { kind: "invalid", error: "Send a JSON object." };
  }
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("intent" in parsed) ||
    (parsed as { intent?: unknown }).intent !== "confirm_budget"
  ) {
    return { kind: "other" };
  }
  if (!isConfirmBody(parsed)) {
    return {
      kind: "invalid",
      error:
        "confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd.",
    };
  }
  return { kind: "confirm", body: parsed };
};

export const applyPromptSdlcAgentBudgetConfirm = (
  cycle: PromptSdlcLocalCycle,
  body: PromptSdlcAgentBudgetConfirmJson,
):
  | { readonly ok: true; readonly cycle: PromptSdlcLocalCycle }
  | { readonly ok: false; readonly error: string } => {
  const confirmed = confirmPromptSdlcCostBudget({
    existing: cycle.costControls,
    confirmedTokenBudget: body.confirmedTokenBudget,
    confirmedMaxSpendUsd: body.confirmedMaxSpendUsd ?? null,
    rateUsdPer1kTokens:
      body.rateUsdPer1kTokens ?? cycle.costControls?.rateUsdPer1kTokens,
  });
  if (!confirmed.ok) {
    return { ok: false, error: confirmed.errorMessage };
  }
  return {
    ok: true,
    cycle: {
      ...cycle,
      costControls: confirmed.costControls,
      errorMessage: null,
      updatedAt: new Date().toISOString(),
    },
  };
};
