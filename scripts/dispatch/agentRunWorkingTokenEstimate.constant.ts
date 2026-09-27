/** Marker the token-estimate sidecar parses from the Ollama reply. */
export const AGENT_RUN_WORKING_TOKEN_ESTIMATE_MARKER =
  "[[WORKING_TOKEN_ESTIMATE]]";

export const buildAgentRunTokenPreEstimatePrompt = (
  taskPrompt: string,
  writerLabel: string,
  historyTable: string,
): string =>
  [
    "Estimate how many tokens the following task will use on this Mac, counting input and output together.",
    `The task is already starting in parallel on this writer: ${writerLabel}.`,
    "Factor in that writer's typical size and the latest finished tasks below.",
    "Do not run the task. Do not ask questions.",
    "Reply with exactly two lines and nothing else:",
    AGENT_RUN_WORKING_TOKEN_ESTIMATE_MARKER,
    "<integer tokens>",
    "",
    historyTable.trim(),
    "",
    "Task:",
    taskPrompt.trim(),
  ].join("\n");
