import {
  PROMPT_SDLC_MAX_ROUNDS,
  PROMPT_SDLC_MAX_ROUNDS_LIMIT,
} from "../../../../adapters/promptSdlcAwcCore";

export const readPromptSdlcLocalMaxRounds = (
  raw: string,
):
  | { readonly ok: true; readonly maxRounds: number }
  | { readonly ok: false; readonly errorMessage: string } => {
  const text = raw.trim();
  const maxRounds = Number(text);
  if (
    !/^\d{1,2}$/.test(text) ||
    maxRounds < 1 ||
    maxRounds > PROMPT_SDLC_MAX_ROUNDS_LIMIT
  ) {
    return {
      ok: false,
      errorMessage: `Round limit must be a whole number from 1 to ${PROMPT_SDLC_MAX_ROUNDS_LIMIT}.`,
    };
  }
  return { ok: true, maxRounds };
};

export const promptSdlcLocalMaxRoundsText = (raw: string | null): string =>
  raw?.trim() || String(PROMPT_SDLC_MAX_ROUNDS);
