import {
  AGENT_RUN_HONESTY_CHIP_LABEL,
  formatAgentRunHonestyDegradedSummary,
  resolveMarketplacePlanEstimateFallbackReason,
} from "@/lib/dispatch/agentRunHonestyCopy.constant";
import type { AgentRunHonestyOutcome } from "@/lib/dispatch/agentRunHonestyOutcome.type";
import { hasRealAgentRunTerminalWork } from "@/lib/dispatch/hasRealAgentRunTerminalWork";
import { resolveWriterApiMissingCliFallbackHonesty } from "@/lib/dispatch/resolveWriterApiMissingCliFallbackHonesty";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

export const tryResolveWriterApiMissingCliFallbackTerminalOutcome = (input: {
  readonly output: string;
  readonly runStatus?: AgentRunStatusValue | null;
}): AgentRunHonestyOutcome | null => {
  const cliFallback = resolveWriterApiMissingCliFallbackHonesty(input.output);
  if (cliFallback === null) {
    return null;
  }

  if (!hasRealAgentRunTerminalWork(input.output)) {
    return null;
  }

  const reason = resolveMarketplacePlanEstimateFallbackReason(
    cliFallback.reasonCode,
  );
  return {
    kind: "degraded",
    chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.degraded,
    summaryLines: [formatAgentRunHonestyDegradedSummary(reason)],
  };
};
