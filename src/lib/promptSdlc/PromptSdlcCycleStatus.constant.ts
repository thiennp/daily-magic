export const PROMPT_SDLC_CYCLE_STATUSES = [
  "judging",
  "improving",
  "awaiting_local",
  "wizard_paused",
  "passed",
  "stopped",
  "failed",
] as const;

export type PromptSdlcCycleStatus = (typeof PROMPT_SDLC_CYCLE_STATUSES)[number];

export const isPromptSdlcCycleStatus = (
  value: string,
): value is PromptSdlcCycleStatus =>
  (PROMPT_SDLC_CYCLE_STATUSES as readonly string[]).includes(value);

export const isPromptSdlcTerminalStatus = (
  status: PromptSdlcCycleStatus,
): boolean =>
  status === "passed" || status === "stopped" || status === "failed";
