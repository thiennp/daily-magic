/** Agent emits this early so the UI can show estimated working progress. */
export const AGENT_RUN_WORKING_ESTIMATE_MARKER = "[[WORKING_ESTIMATE]]";

export const AGENT_RUN_WORKING_ESTIMATE_INSTRUCTION = [
  "A local Ollama sidecar records the initial time estimate while you work. Do not wait for it.",
  "Do not emit [[WORKING_ESTIMATE]] before you start the task.",
  "Emit an updated estimate only if your plan changes significantly:",
  "1. Put this marker on its own line:",
  AGENT_RUN_WORKING_ESTIMATE_MARKER,
  "2. On the next line, emit only an integer number of seconds (for example: 120).",
  "3. Do not put [[PROGRESS]], [[NEXT_ACTIONS]], or [[AWAITING_INPUT]] inside the estimate block.",
  "4. Never use [[AWAITING_INPUT]] to ask the operator to confirm an estimate — proceed automatically.",
].join("\n");
