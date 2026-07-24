/** Agent emits this early so the UI can show estimated working progress. */
export const AGENT_RUN_WORKING_ESTIMATE_MARKER = "[[WORKING_ESTIMATE]]";

export const AGENT_RUN_WORKING_ESTIMATE_INSTRUCTION = [
  "Put this marker on its own line:",
  AGENT_RUN_WORKING_ESTIMATE_MARKER,
  "On the next line, emit only an integer number of seconds (for example: 120).",
  "Then add one short plain-language sentence explaining the estimate.",
  "Do not use [[AWAITING_INPUT]], [[PROGRESS]], or [[NEXT_ACTIONS]].",
].join("\n");

export const buildAgentRunPreEstimatePrompt = (taskPrompt: string): string =>
  [
    "Estimate how long the following task will take on this Mac.",
    "Do not start the task yet. Do not ask the operator to confirm.",
    "",
    AGENT_RUN_WORKING_ESTIMATE_INSTRUCTION,
    "",
    "Task to estimate:",
    taskPrompt.trim(),
  ].join("\n");
