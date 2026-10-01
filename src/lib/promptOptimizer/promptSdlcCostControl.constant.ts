/** Default Step 4 / module trial ceiling (one trial per module today). */
export const PROMPT_SDLC_DEFAULT_MAX_TRIALS = 1;

/** Highest maxTrials the compose / agent form accepts. */
export const PROMPT_SDLC_MAX_TRIALS_LIMIT = 30;

/** Default USD per 1k tokens when Product / judge omit a model rate. */
export const PROMPT_SDLC_DEFAULT_RATE_USD_PER_1K_TOKENS = 0.01;

/** Heuristic tokens assumed per Step 4 module trial (runner + judge). */
export const PROMPT_SDLC_STEP4_TOKENS_PER_MODULE_TRIAL = 8_000;

/** Soft-warn when spend or tokens reach this fraction of the confirmed ceiling. */
export const PROMPT_SDLC_BUDGET_SOFT_WARN_RATIO = 0.8;

export const PROMPT_SDLC_STOP_BUDGET_EXCEEDED =
  "Stopped because the confirmed token or spend budget was exceeded.";

export const PROMPT_SDLC_SOFT_WARN_BUDGET =
  "Approaching the confirmed budget. Further trials may hard-stop.";

export const PROMPT_SDLC_BUDGET_CONFIRM_REQUIRED =
  "Confirm the Step 4 token and spend budget before optimizing modules.";
