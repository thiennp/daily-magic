/** Agent emits this early so the UI can show estimated working progress. */
export const AGENT_RUN_WORKING_ESTIMATE_MARKER = "[[WORKING_ESTIMATE]]";

export const AGENT_RUN_WORKING_ESTIMATE_INSTRUCTION = [
  "Before other progress, estimate how long this task will take:",
  "1. Put this marker on its own line:",
  AGENT_RUN_WORKING_ESTIMATE_MARKER,
  "2. On the next line, emit only an integer number of seconds (for example: 120).",
  "3. Emit an updated estimate later if your plan changes significantly.",
  "4. Do not put [[PROGRESS]], [[NEXT_ACTIONS]], or [[AWAITING_INPUT]] inside the estimate block.",
].join("\n");
