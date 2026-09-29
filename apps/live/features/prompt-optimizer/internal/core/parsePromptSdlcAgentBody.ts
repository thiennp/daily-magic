import { isNumber, isString, isType, isUndefinedOr } from "guardz";

import { PROMPT_SDLC_AGENT_BODY_ERROR } from "../../../../adapters/promptSdlcAwcCore";

export interface PromptSdlcAgentBody {
  readonly goal: string;
  readonly prompt: string;
  readonly workingDirectory: string;
  readonly judge: string | null;
  readonly improver: string | null;
  readonly passScore: string | null;
  readonly maxRounds: string | null;
}

interface PromptSdlcAgentJson {
  readonly goal: string;
  readonly prompt: string;
  readonly workingDirectory: string;
  readonly judge?: string;
  readonly improver?: string;
  readonly passScore?: number;
  readonly maxRounds?: number;
}

const isPromptSdlcAgentJson = isType<PromptSdlcAgentJson>({
  goal: isString,
  prompt: isString,
  workingDirectory: isString,
  judge: isUndefinedOr(isString),
  improver: isUndefinedOr(isString),
  passScore: isUndefinedOr(isNumber),
  maxRounds: isUndefinedOr(isNumber),
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
    },
  };
};
