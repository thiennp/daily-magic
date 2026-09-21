import { appendWriterLlmUsageFooter } from "../formatWriterLlmUsageFooter";
import type { HarnessWriterAgentId } from "../../../../../../../scripts/buildWriterCliInvocation";
import type { AgentWitchRunConfig } from "../readAgentWitchRunConfig";

import { runHeadlessWriter } from "../agentWitchHeadlessWriterRun";

import { callWriterApi } from "./callWriterApi";
import type { MarketplacePlanEstimateHeadlessWriterExecution } from "./MarketplacePlanEstimateHeadlessWriterExecution.type";
import {
  MARKETPLACE_PLAN_ESTIMATE_EMPTY_CATALOG_MODEL_ID,
  MARKETPLACE_PLAN_ESTIMATE_LOG_CLI_FALLBACK_EMPTY_CATALOG,
  MARKETPLACE_PLAN_ESTIMATE_LOG_CLI_FALLBACK_MISSING_KEY,
  MARKETPLACE_PLAN_ESTIMATE_LOG_PASS_PREFIX,
  MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY,
} from "./marketplacePlanEstimateReasonCode.constant";
import { readWriterApiProviderSecret } from "./readWriterApiSecrets";
import { resolveAgentWitchProfileDirFromConfigPath } from "./shouldUseWriterApi";

/**
 * Marketplace plan/estimate: Haiku via Anthropic Writer API when profile key exists;
 * intentional claude-cli fallback when key missing (observable — Magi / Testi contract).
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
        backend: "cli-empty-catalog-model-id",
        modelOverride: null,
        reasonCode: MARKETPLACE_PLAN_ESTIMATE_EMPTY_CATALOG_MODEL_ID,
      },
    };
  }

  const modelId = catalogModelId.trim();
  if (modelId.length === 0) {
    console.log(MARKETPLACE_PLAN_ESTIMATE_LOG_CLI_FALLBACK_EMPTY_CATALOG);
    const cliResult = await runHeadlessWriter(config, writerAgent, trimmed);
    return {
      ...cliResult,
      execution: {
        backend: "cli-empty-catalog-model-id",
        modelOverride: null,
        reasonCode: MARKETPLACE_PLAN_ESTIMATE_EMPTY_CATALOG_MODEL_ID,
      },
    };
  }

  const profileDir = resolveAgentWitchProfileDirFromConfigPath(
    config.layout.configPath,
  );
  const secret = readWriterApiProviderSecret(profileDir, "anthropic");
  if (secret === null || secret.apiKey.length === 0) {
    console.log(MARKETPLACE_PLAN_ESTIMATE_LOG_CLI_FALLBACK_MISSING_KEY);
    const cliResult = await runHeadlessWriter(config, writerAgent, trimmed);
    return {
      ...cliResult,
      execution: {
        backend: "cli-fallback-missing-anthropic-writer-api-key",
        modelOverride: modelId,
        reasonCode: MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY,
      },
    };
  }

  console.log(`${MARKETPLACE_PLAN_ESTIMATE_LOG_PASS_PREFIX}${modelId}`);

  const apiResult = await callWriterApi({
    provider: "anthropic",
    secret,
    prompt: trimmed,
    modelOverride: modelId,
  });

  const execution: MarketplacePlanEstimateHeadlessWriterExecution = {
    backend: "anthropic-writer-api",
    modelOverride: modelId,
    reasonCode: null,
  };

  return {
    exitCode: apiResult.exitCode,
    output: appendWriterLlmUsageFooter(apiResult.output, apiResult.llmUsage),
    execution,
  };
};
