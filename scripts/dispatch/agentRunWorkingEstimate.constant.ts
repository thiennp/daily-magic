/** Marker the estimate sidecar and the UI share. */
export const AGENT_RUN_WORKING_ESTIMATE_MARKER = "[[WORKING_ESTIMATE]]";

export const buildAgentRunPreEstimatePrompt = (
  taskPrompt: string,
  writerLabel: string,
  historyTable: string,
): string =>
  [
    "Estimate how long the following task will take on this Mac, in seconds.",
    `The task is already starting in parallel on this writer: ${writerLabel}.`,
    "Factor in that writer's typical speed and the latest finished tasks below.",
    "Do not run the task. Do not ask questions.",
    "Reply with exactly two lines and nothing else:",
    AGENT_RUN_WORKING_ESTIMATE_MARKER,
    "<integer seconds>",
    "",
    historyTable.trim(),
    "",
    "Task:",
    taskPrompt.trim(),
  ].join("\n");
