import { resolveWriterApiMissingCliFallbackFromWriterExecutionOutput } from "@agent-witch/shared/dispatch";

import { isCliFallbackMarketplacePlanEstimateBackend } from "@/lib/dispatch/agentRunHonestyCopy.constant";
import { hasRealAgentRunTerminalWork } from "@/lib/dispatch/hasRealAgentRunTerminalWork";
import { isAgentRunSpawnFailureInOutput } from "@/lib/dispatch/isAgentRunSpawnFailureInOutput";
import { parseMarketplacePlanEstimateFromOutput } from "@/lib/dispatch/parseMarketplacePlanEstimateFromOutput";

export type WriterApiMissingCliFallbackHonesty = {
  readonly reasonCode: string | null;
};

export const resolveWriterApiMissingCliFallbackHonesty = (
  output: string,
): WriterApiMissingCliFallbackHonesty | null => {
  const planEstimate = parseMarketplacePlanEstimateFromOutput(output);
  if (
    isCliFallbackMarketplacePlanEstimateBackend(planEstimate?.backend ?? null)
  ) {
    return { reasonCode: planEstimate?.reasonCode ?? null };
  }

  const fromWriterExecution =
    resolveWriterApiMissingCliFallbackFromWriterExecutionOutput(output);
  if (fromWriterExecution !== null) {
    return fromWriterExecution;
  }

  if (
    isAgentRunSpawnFailureInOutput(output) &&
    !hasRealAgentRunTerminalWork(output)
  ) {
    return { reasonCode: null };
  }

  return null;
};
