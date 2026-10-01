import { isBoolean, isNumber, isString, isType, isUndefinedOr } from "guardz";

import { PROMPT_SDLC_AGENT_BODY_ERROR } from "../../../../adapters/promptSdlcAwcCore";

export interface PromptSdlcAgentBody {
  readonly goal: string;
  readonly prompt: string;
  readonly workingDirectory: string;
  readonly judge: string | null;
  readonly improver: string | null;
  readonly passScore: string | null;
  readonly maxRounds: string | null;
  /** Cost-control knobs (optional; defaults apply). */
  readonly maxTrials: number | null;
  readonly maxSpendUsd: number | null;
  readonly earlyStop: boolean | null;
  readonly earlyStopFlatRounds: number | null;
  /**
   * When set with confirmedTokenBudget, auto-confirms ceilings on start
   * so agent runs need not POST confirm_budget separately.
   */
  readonly confirmedTokenBudget: number | null;
  readonly confirmedMaxSpendUsd: number | null;
  readonly rateUsdPer1kTokens: number | null;
}

interface PromptSdlcAgentJson {
  readonly goal: string;
  readonly prompt: string;
  readonly workingDirectory: string;
  readonly judge?: string;
  readonly improver?: string;
  readonly passScore?: number;
  readonly maxRounds?: number;
  readonly maxTrials?: number;
  readonly maxSpendUsd?: number;
  readonly earlyStop?: boolean;
  readonly earlyStopFlatRounds?: number;
  readonly confirmedTokenBudget?: number;
  readonly confirmedMaxSpendUsd?: number;
  readonly rateUsdPer1kTokens?: number;
}

const isPromptSdlcAgentJson = isType<PromptSdlcAgentJson>({
  goal: isString,
  prompt: isString,
  workingDirectory: isString,
  judge: isUndefinedOr(isString),
  improver: isUndefinedOr(isString),
  passScore: isUndefinedOr(isNumber),
  maxRounds: isUndefinedOr(isNumber),
  maxTrials: isUndefinedOr(isNumber),
  maxSpendUsd: isUndefinedOr(isNumber),
  earlyStop: isUndefinedOr(isBoolean),
  earlyStopFlatRounds: isUndefinedOr(isNumber),
  confirmedTokenBudget: isUndefinedOr(isNumber),
  confirmedMaxSpendUsd: isUndefinedOr(isNumber),
  rateUsdPer1kTokens: isUndefinedOr(isNumber),
});

const readOptionalWriter = (value: string | undefined): string | null => {
  const trimmed = value?.trim() ?? "";
  return trimmed.length === 0 ? null : trimmed;
};

export const parsePromptSdlcAgentBody = (
  raw: string,
):
  | { readonly ok: true; readonly body: PromptSdlcAgentBody }
  | { readonly ok: false; readonly error: string } => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: "Send a JSON object." };
  }

  if (!isPromptSdlcAgentJson(parsed)) {
    return { ok: false, error: PROMPT_SDLC_AGENT_BODY_ERROR };
  }

  if (parsed.workingDirectory.trim().length === 0) {
    return { ok: false, error: PROMPT_SDLC_AGENT_BODY_ERROR };
  }

  return {
    ok: true,
    body: {
      goal: parsed.goal,
      prompt: parsed.prompt,
      workingDirectory: parsed.workingDirectory.trim(),
      judge: readOptionalWriter(parsed.judge),
      improver: readOptionalWriter(parsed.improver),
      passScore:
        parsed.passScore === undefined ? null : String(parsed.passScore),
      maxRounds:
        parsed.maxRounds === undefined ? null : String(parsed.maxRounds),
      maxTrials: parsed.maxTrials ?? null,
      maxSpendUsd: parsed.maxSpendUsd ?? null,
      earlyStop: parsed.earlyStop ?? null,
      earlyStopFlatRounds: parsed.earlyStopFlatRounds ?? null,
      confirmedTokenBudget: parsed.confirmedTokenBudget ?? null,
      confirmedMaxSpendUsd: parsed.confirmedMaxSpendUsd ?? null,
      rateUsdPer1kTokens: parsed.rateUsdPer1kTokens ?? null,
    },
  };
};
