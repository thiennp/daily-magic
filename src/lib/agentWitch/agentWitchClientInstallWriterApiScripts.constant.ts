/** Writer API-key execution aux scripts (shipped beside main client install scripts). */
export const AGENT_WITCH_CLIENT_INSTALL_WRITER_API_SCRIPT_NAMES = [
  "buildAgentWitchLocalWriterApiPage.ts",
  "readAgentWitchRunConfig.ts",
  "writerApi/WriterApiProvider.constant.ts",
  "writerApi/WriterApiSecrets.type.ts",
  "writerApi/writerApiSecretsPath.ts",
  "writerApi/maskWriterApiKeyForDisplay.ts",
  "writerApi/readWriterApiSecrets.ts",
  "writerApi/writeWriterApiSecrets.ts",
  "writerApi/resolveWriterExecutionBackend.ts",
  "writerApi/resolveWriterApiProvider.ts",
  "writerApi/shouldUseWriterApi.ts",
  "writerApi/callWriterApi.ts",
  "writerApi/parseWriterLlmUsageFromApiBody.ts",
  "writerApi/estimateWriterLlmUsageCostUsd.ts",
  "writerApi/runWriterApiPrompt.ts",
  "writerApi/applyWriterApiSettings.ts",
] as const;
