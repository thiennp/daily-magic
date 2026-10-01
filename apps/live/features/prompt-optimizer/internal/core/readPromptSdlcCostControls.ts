import {
  PROMPT_SDLC_DEFAULT_MAX_TRIALS,
  PROMPT_SDLC_MAX_TRIALS_LIMIT,
} from "../../../../adapters/promptSdlcAwcCore";
import { defaultPromptSdlcCostControls } from "../../../../adapters/promptSdlcAwcCore";
import type {
  PromptSdlcCostControlKnobs,
  PromptSdlcCostControls,
} from "../../../../adapters/promptSdlcAwcCore";

export type ReadPromptSdlcCostControlsResult =
  | { readonly ok: true; readonly knobs: PromptSdlcCostControlKnobs }
  | { readonly ok: false; readonly errorMessage: string };

const parsePositiveInt = (
  text: string | null | undefined,
  fallback: number,
): number | null => {
  const raw = text?.trim() ?? "";
  if (raw.length === 0) {
    return fallback;
  }
  if (!/^\d{1,3}$/.test(raw)) {
    return null;
  }
  const value = Number(raw);
  if (
    !Number.isInteger(value) ||
    value < 1 ||
    value > PROMPT_SDLC_MAX_TRIALS_LIMIT
  ) {
    return null;
  }
  return value;
};

const parseUsd = (
  text: string | null | undefined,
):
  | { readonly ok: true; readonly value: number | null }
  | { readonly ok: false } => {
  const raw = text?.trim() ?? "";
  if (raw.length === 0) {
    return { ok: true, value: null };
  }
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) {
    return { ok: false };
  }
  return { ok: true, value: Math.round(value * 10_000) / 10_000 };
};

export const readPromptSdlcCostControlKnobs = (posted: {
  readonly maxTrials?: string | null;
  readonly maxSpendUsd?: string | null;
  readonly earlyStop?: string | null;
  readonly earlyStopFlatRounds?: string | null;
}): ReadPromptSdlcCostControlsResult => {
  const maxTrials = parsePositiveInt(
    posted.maxTrials,
    PROMPT_SDLC_DEFAULT_MAX_TRIALS,
  );
  if (maxTrials === null) {
    return {
      ok: false,
      errorMessage: `Max trials must be a whole number from 1 to ${PROMPT_SDLC_MAX_TRIALS_LIMIT}.`,
    };
  }
  const spend = parseUsd(posted.maxSpendUsd);
  if (!spend.ok) {
    return {
      ok: false,
      errorMessage: "Max spend (USD) must be empty or a non-negative number.",
    };
  }
  const earlyRaw = posted.earlyStop?.trim().toLowerCase() ?? "on";
  const earlyStop =
    earlyRaw === "on" ||
    earlyRaw === "true" ||
    earlyRaw === "1" ||
    earlyRaw === "yes";
  const flatParsed = parsePositiveInt(posted.earlyStopFlatRounds, 3);
  if (flatParsed === null) {
    return {
      ok: false,
      errorMessage:
        "Early-stop flat rounds must be a whole number from 1 to 30.",
    };
  }
  return {
    ok: true,
    knobs: {
      maxTrials,
      maxSpendUsd: spend.value,
      earlyStop,
      earlyStopFlatRounds: flatParsed,
    },
  };
};

export const costControlsFromKnobs = (
  knobs: PromptSdlcCostControlKnobs,
): PromptSdlcCostControls => defaultPromptSdlcCostControls(knobs);
