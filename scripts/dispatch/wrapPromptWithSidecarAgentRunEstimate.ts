export const wrapPromptWithSidecarAgentRunEstimate = (prompt: string): string =>
  [
    prompt.trim(),
    "",
    "---",
    [
      "A local Ollama sidecar is estimating this task in parallel.",
      "That estimate is recorded outside this conversation and shown in the UI.",
      "Proceed with the task immediately.",
      "Do not emit [[WORKING_ESTIMATE]] before you start.",
      "Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate.",
    ].join("\n"),
  ].join("\n");
