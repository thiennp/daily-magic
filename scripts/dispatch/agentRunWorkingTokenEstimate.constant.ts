/** Marker the token-estimate sidecar parses from the Ollama reply. */
export const AGENT_RUN_WORKING_TOKEN_ESTIMATE_MARKER =
  "[[WORKING_TOKEN_ESTIMATE]]";

export const buildAgentRunTokenPreEstimatePrompt = (
  taskPrompt: string,
  writerLabel: string,
  historyTable: string,
  capabilityNote = "",
): string =>
  [
    "Estimate the writer-reported token total for the following task on this computer.",
    "The total is input tokens + output tokens + cache read + cache write.",
    "The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.",
    "Ignore any earlier estimates near 100 or 1000. Those were wrong.",
    "The integer you reply with must sit inside the actual range for this writer.",
    "Use the history row whose task length is closest to this task. Copy that row's actual tokens.",
    `The task is already starting in parallel on this writer: ${writerLabel}.`,
    ...(capabilityNote.trim().length > 0 ? [capabilityNote.trim()] : []),
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
