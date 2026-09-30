import { PROMPT_SDLC_GOAL_SUGGESTION_EVAL_CASES_EN } from "./casesEn";
import { PROMPT_SDLC_GOAL_SUGGESTION_EVAL_CASES_VI } from "./casesVi";
import type { PromptSdlcGoalSuggestionEvalCase } from "./types";

export type { PromptSdlcGoalSuggestionEvalCase } from "./types";

export const PROMPT_SDLC_GOAL_SUGGESTION_EVAL_CASES: readonly PromptSdlcGoalSuggestionEvalCase[] =
  [
    ...PROMPT_SDLC_GOAL_SUGGESTION_EVAL_CASES_EN,
    ...PROMPT_SDLC_GOAL_SUGGESTION_EVAL_CASES_VI,
  ];
