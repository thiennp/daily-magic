import { appendWriterLlmUsageFooter } from "../formatWriterLlmUsageFooter";
import type { HarnessWriterAgentId } from "../../../../../../../scripts/buildWriterCliInvocation";
import type { AgentWitchRunConfig } from "../readAgentWitchRunConfig";

import { runHeadlessWriter } from "../agentWitchHeadlessWriterRun";

import { callWriterApi } from "./callWriterApi";
import { readWriterApiProviderSecret } from "./readWriterApiSecrets";
import { resolveAgentWitchProfileDirFromConfigPath } from "./shouldUseWriterApi";

/**
 * Marketplace plan/estimate: always routes catalog model via Anthropic Writer API when a key exists.
 * Not gated on `writerExecutionBackend === "api"` (write stage may still use CLI).
 */
export const runMarketplacePlanEstimateHeadlessWriter = async (
  config: AgentWitchRunConfig,
  writerAgent: HarnessWriterAgentId,
  prompt: string,
  catalogModelId: string,
): Promise<{ readonly exitCode: number; readonly output: string }> => {
  const trimmed = prompt.trim();
  if (trimmed.length === 0) {
    return {
      exitCode: -1,
      output: "Writer instruction must be a non-empty string.",
    };
  }

  const modelId = catalogModelId.trim();
  if (modelId.length === 0) {
    return runHeadlessWriter(config, writerAgent, trimmed);
  }

  const profileDir = resolveAgentWitchProfileDirFromConfigPath(
    config.layout.configPath,
  );
  const secret = readWriterApiProviderSecret(profileDir, "anthropic");
  if (secret === null || secret.apiKey.length === 0) {
    return runHeadlessWriter(config, writerAgent, trimmed);
  }

  const apiResult = await callWriterApi({
    provider: "anthropic",
    secret,
    prompt: trimmed,
    modelOverride: modelId,
  });

  return {
    exitCode: apiResult.exitCode,
    output: appendWriterLlmUsageFooter(apiResult.output, apiResult.llmUsage),
  };
};
