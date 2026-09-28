export const PROMPT_SDLC_PASS_SCORE = 90;

/** Default judged rounds. The run stops when this many rounds have a score. */
export const PROMPT_SDLC_MAX_ROUNDS = 10;

/** Highest round limit a person or a bot can set. */
export const PROMPT_SDLC_MAX_ROUNDS_LIMIT = 30;

/** Judged rounds in a row that do not beat the best score before the run stops. */
export const PROMPT_SDLC_STALL_ROUNDS = 3;

export const PROMPT_SDLC_STOP_ROUND_LIMIT =
  "Stopped at the round limit. The best prompt is kept.";

export const PROMPT_SDLC_STOP_STALL =
  "Stopped because the score stopped rising. The best prompt is kept.";

export const PROMPT_SDLC_STOP_USER = "Stopped. The best prompt is kept.";

export const PROMPT_SDLC_GOAL_MAX_LENGTH = 2_000;

export const PROMPT_SDLC_PROMPT_MAX_LENGTH = 20_000;
