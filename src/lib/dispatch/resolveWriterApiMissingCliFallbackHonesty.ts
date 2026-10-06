import { resolveWriterApiMissingCliFallbackFromWriterExecutionOutput } from "@agent-witch/shared/dispatch";

import { isCliFallbackMarketplacePlanEstimateBackend } from "@/lib/dispatch/agentRunHonestyCopy.constant";
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

  return resolveWriterApiMissingCliFallbackFromWriterExecutionOutput(output);
};
