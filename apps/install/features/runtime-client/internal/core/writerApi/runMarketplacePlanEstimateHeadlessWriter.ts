import { appendWriterLlmUsageFooter } from "../formatWriterLlmUsageFooter";
import type { HarnessWriterAgentId } from "../../../../../../../scripts/buildWriterCliInvocation";
import type { AgentWitchRunConfig } from "../readAgentWitchRunConfig";

import { runHeadlessWriter } from "../agentWitchHeadlessWriterRun";

import { callWriterApi } from "./callWriterApi";
import type { MarketplacePlanEstimateHeadlessWriterExecution } from "./MarketplacePlanEstimateHeadlessWriterExecution.type";
import { readWriterApiProviderSecret } from "./readWriterApiSecrets";
import { resolveAgentWitchProfileDirFromConfigPath } from "./shouldUseWriterApi";

const logMarketplacePlanEstimateRoute = (
  execution: MarketplacePlanEstimateHeadlessWriterExecution,
): void => {
  if (execution.backend === "anthropic-writer-api") {
    console.log(
      `[agent-witch] marketplace plan/estimate modelOverride=${execution.modelOverride ?? "unknown"} (anthropic Writer API)`,
    );
    return;
  }

  if (execution.backend === "cli-fallback-missing-anthropic-key") {
    console.log(
      `[agent-witch] marketplace plan/estimate modelOverride=${execution.modelOverride ?? "unknown"} skipped — no Anthropic API key in writer-api-secrets; falling back to ${"claude-cli"} headless pre-estimate`,
    );
    return;
  }

  console.log(
    "[agent-witch] marketplace plan/estimate catalog model id empty; falling back to CLI headless pre-estimate",
  );
};

/**
 * Marketplace plan/estimate: always routes catalog model via Anthropic Writer API when a key exists.
 * Not gated on `writerExecutionBackend === "api"` (write stage may still use CLI).
 */
export const runMarketplacePlanEstimateHeadlessWriter = async (
  config: AgentWitchRunConfig,
  writerAgent: HarnessWriterAgentId,
  prompt: string,
  catalogModelId: string,
): Promise<{
  readonly exitCode: number;
  readonly output: string;
  readonly execution: MarketplacePlanEstimateHeadlessWriterExecution;
}> => {
  const trimmed = prompt.trim();
  if (trimmed.length === 0) {
    return {
      exitCode: -1,
      output: "Writer instruction must be a non-empty string.",
      execution: {
        backend: "cli-empty-catalog-model",
        modelOverride: null,
      },
    };
  }

  const modelId = catalogModelId.trim();
  if (modelId.length === 0) {
    const execution: MarketplacePlanEstimateHeadlessWriterExecution = {
      backend: "cli-empty-catalog-model",
      modelOverride: null,
    };
    logMarketplacePlanEstimateRoute(execution);
    const cliResult = await runHeadlessWriter(config, writerAgent, trimmed);
    return { ...cliResult, execution };
  }

  const profileDir = resolveAgentWitchProfileDirFromConfigPath(
    config.layout.configPath,
  );
  const secret = readWriterApiProviderSecret(profileDir, "anthropic");
  if (secret === null || secret.apiKey.length === 0) {
    const execution: MarketplacePlanEstimateHeadlessWriterExecution = {
      backend: "cli-fallback-missing-anthropic-key",
      modelOverride: modelId,
    };
    logMarketplacePlanEstimateRoute(execution);
    const cliResult = await runHeadlessWriter(config, writerAgent, trimmed);
    return { ...cliResult, execution };
  }

  const execution: MarketplacePlanEstimateHeadlessWriterExecution = {
    backend: "anthropic-writer-api",
    modelOverride: modelId,
  };
  logMarketplacePlanEstimateRoute(execution);

  const apiResult = await callWriterApi({
    provider: "anthropic",
    secret,
    prompt: trimmed,
    modelOverride: modelId,
  });

  return {
    exitCode: apiResult.exitCode,
    output: appendWriterLlmUsageFooter(apiResult.output, apiResult.llmUsage),
    execution,
  };
};
