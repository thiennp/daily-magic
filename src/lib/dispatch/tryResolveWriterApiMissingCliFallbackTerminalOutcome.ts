import {
  AGENT_RUN_HONESTY_CHIP_LABEL,
  formatAgentRunHonestyDegradedSummary,
  formatAgentRunHonestyFailedSummary,
  resolveMarketplacePlanEstimateFallbackReason,
} from "@/lib/dispatch/agentRunHonestyCopy.constant";
import { resolveWriterMissingCliCantRunLockedReason } from "@/lib/dispatch/resolveWriterMissingCliCantRunLockedReason";
import type { AgentRunHonestyOutcome } from "@/lib/dispatch/agentRunHonestyOutcome.type";
import { hasRealAgentRunTerminalWork } from "@/lib/dispatch/hasRealAgentRunTerminalWork";
import { isAgentRunSpawnFailureInOutput } from "@/lib/dispatch/isAgentRunSpawnFailureInOutput";
import { resolveWriterApiMissingCliFallbackHonesty } from "@/lib/dispatch/resolveWriterApiMissingCliFallbackHonesty";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import { ANTIGRAVITY_CLI_CANT_RUN_LOCKED_REASON } from "@/lib/dispatch/agentRunHonestyCopy.constant";

export const tryResolveWriterApiMissingCliFallbackTerminalOutcome = (input: {
  readonly output: string;
  readonly runStatus?: AgentRunStatusValue | null;
  readonly writerAgent?: string | null;
}): AgentRunHonestyOutcome | null => {
  if (
    input.writerAgent === "antigravity" &&
    isAgentRunSpawnFailureInOutput(input.output) &&
    !hasRealAgentRunTerminalWork(input.output)
  ) {
    return {
      kind: "failed",
      chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.failed,
      summaryLines: [
        formatAgentRunHonestyFailedSummary(
          ANTIGRAVITY_CLI_CANT_RUN_LOCKED_REASON,
        ),
      ],
    };
  }

  const cliFallback = resolveWriterApiMissingCliFallbackHonesty(
    input.output,
    input.writerAgent,
  );
  if (cliFallback === null) {
    return null;
  }

  if (!hasRealAgentRunTerminalWork(input.output)) {
    return {
      kind: "failed",
      chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.failed,
      summaryLines: [
        formatAgentRunHonestyFailedSummary(
          resolveWriterMissingCliCantRunLockedReason(input.writerAgent),
        ),
      ],
    };
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
