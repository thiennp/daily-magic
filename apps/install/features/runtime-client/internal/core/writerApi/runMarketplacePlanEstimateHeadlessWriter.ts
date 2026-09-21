import { appendWriterLlmUsageFooter } from "../formatWriterLlmUsageFooter";
import type { HarnessWriterAgentId } from "../../../../../../../scripts/buildWriterCliInvocation";
import type { AgentWitchRunConfig } from "../readAgentWitchRunConfig";

import { callWriterApi } from "./callWriterApi";
import type { MarketplacePlanEstimateHeadlessWriterExecution } from "./MarketplacePlanEstimateHeadlessWriterExecution.type";
import { readWriterApiProviderSecret } from "./readWriterApiSecrets";
import { resolveAgentWitchProfileDirFromConfigPath } from "./shouldUseWriterApi";
import {
  MARKETPLACE_PLAN_ESTIMATE_EMPTY_CATALOG_MODEL_ID,
  MARKETPLACE_PLAN_ESTIMATE_LOG_FAIL_PREFIX,
  MARKETPLACE_PLAN_ESTIMATE_LOG_PASS_PREFIX,
  MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY,
} from "./marketplacePlanEstimateReasonCode.constant";

const buildPlanEstimateFailure = (input: {
  readonly execution: MarketplacePlanEstimateHeadlessWriterExecution;
  readonly message: string;
}): {
  readonly exitCode: number;
  readonly output: string;
  readonly execution: MarketplacePlanEstimateHeadlessWriterExecution;
} => {
  const modelSuffix =
    input.execution.modelOverride !== null &&
    input.execution.modelOverride.length > 0
      ? ` modelOverride=${input.execution.modelOverride}`
      : "";
  console.error(
    `${MARKETPLACE_PLAN_ESTIMATE_LOG_FAIL_PREFIX}${input.execution.reasonCode ?? "unknown"}${modelSuffix}`,
  );
  console.error(`[agent-witch] ${input.message}`);

  return {
    exitCode: -1,
    output: input.message,
    execution: input.execution,
  };
};

/**
 * Marketplace plan/estimate: catalog model via Anthropic Writer API only.
 * No claude-cli fallback — missing key fails the stage (Magi / Testi contract).
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
  void writerAgent;
  const trimmed = prompt.trim();
  if (trimmed.length === 0) {
    return buildPlanEstimateFailure({
      execution: {
        backend: "failed-empty-catalog-model-id",
        modelOverride: null,
        reasonCode: MARKETPLACE_PLAN_ESTIMATE_EMPTY_CATALOG_MODEL_ID,
      },
      message:
        "Marketplace plan/estimate failed: empty instruction prompt for Writer API.",
    });
  }

  const modelId = catalogModelId.trim();
  if (modelId.length === 0) {
    return buildPlanEstimateFailure({
      execution: {
        backend: "failed-empty-catalog-model-id",
        modelOverride: null,
        reasonCode: MARKETPLACE_PLAN_ESTIMATE_EMPTY_CATALOG_MODEL_ID,
      },
      message:
        "Marketplace plan/estimate failed: catalog plan/estimate model id is empty.",
    });
  }

  const profileDir = resolveAgentWitchProfileDirFromConfigPath(
    config.layout.configPath,
  );
  const secret = readWriterApiProviderSecret(profileDir, "anthropic");
  if (secret === null || secret.apiKey.length === 0) {
    return buildPlanEstimateFailure({
      execution: {
        backend: "failed-missing-anthropic-writer-api-key",
        modelOverride: modelId,
        reasonCode: MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY,
      },
      message:
        "Marketplace plan/estimate requires an Anthropic Writer API key in writer-api-secrets.json on this Mac. Add a key in Agent Witch Live settings, then retry. Write stage was not started.",
    });
  }

  const execution: MarketplacePlanEstimateHeadlessWriterExecution = {
    backend: "anthropic-writer-api",
    modelOverride: modelId,
    reasonCode: null,
  };
  console.log(`${MARKETPLACE_PLAN_ESTIMATE_LOG_PASS_PREFIX}${modelId}`);

  const apiResult = await callWriterApi({
    provider: "anthropic",
    secret,
    prompt: trimmed,
    modelOverride: modelId,
  });

  if (apiResult.exitCode !== 0) {
    return {
      exitCode: apiResult.exitCode,
      output: apiResult.output,
      execution,
    };
  }

  return {
    exitCode: 0,
    output: appendWriterLlmUsageFooter(apiResult.output, apiResult.llmUsage),
    execution,
  };
};
