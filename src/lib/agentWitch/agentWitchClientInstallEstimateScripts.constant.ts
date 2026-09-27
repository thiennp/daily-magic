/** Ollama task-estimate sidecar scripts shipped with the Mac client. */
export const AGENT_WITCH_CLIENT_INSTALL_ESTIMATE_SCRIPT_NAMES = [
  "requestOllamaTaskEstimate.ts",
  "requestOllamaEmbedding.ts",
  "agentRunEstimateHistory.ts",
  "dispatch/parseOllamaTaskEstimateSeconds.ts",
  "dispatch/resolveTaskWriterEstimateLabel.ts",
  "dispatch/wrapPromptWithSidecarAgentRunEstimate.ts",
] as const;
