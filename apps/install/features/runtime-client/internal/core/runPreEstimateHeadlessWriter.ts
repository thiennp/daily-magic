import type { HarnessWriterAgentId } from "../../../../../../scripts/buildWriterCliInvocation";

import { runHeadlessWriter } from "./agentWitchHeadlessWriterRun";
import { appendWriterLlmUsageFooter } from "./formatWriterLlmUsageFooter";
import type { AgentWitchRunConfig } from "./readAgentWitchRunConfig";
import { resolvePreEstimateFastApiRoute } from "./preEstimate/resolvePreEstimateFastApiRoute";
import { PRE_ESTIMATE_WRITER_MODES } from "./preEstimate/resolvePreEstimateWriterMode";
import { callWriterApi } from "./writerApi/callWriterApi";
import { readWriterApiProviderSecret } from "./writerApi/readWriterApiSecrets";
import { resolveAgentWitchProfileDirFromConfigPath } from "./writerApi/shouldUseWriterApi";

export const runPreEstimateHeadlessWriter = async (
  config: AgentWitchRunConfig,
  writerAgent: HarnessWriterAgentId,
  prompt: string,
): Promise<{ readonly exitCode: number; readonly output: string }> => {
  if (config.preEstimateWriterMode !== PRE_ESTIMATE_WRITER_MODES.FAST_API) {
    return runHeadlessWriter(config, writerAgent, prompt);
  }

  const profileDir = resolveAgentWitchProfileDirFromConfigPath(
    config.layout.configPath,
  );
  const route = resolvePreEstimateFastApiRoute(profileDir);
  if (route === null) {
    return runHeadlessWriter(config, writerAgent, prompt);
  }

  const secret = readWriterApiProviderSecret(profileDir, route.provider);
  if (secret === null) {
    return runHeadlessWriter(config, writerAgent, prompt);
  }

  const apiResult = await callWriterApi({
    provider: route.provider,
    secret,
    prompt,
    modelOverride: route.model,
    maxOutputTokens: 512,
  });

  return {
    exitCode: apiResult.exitCode,
    output: appendWriterLlmUsageFooter(apiResult.output, apiResult.llmUsage),
  };
};
