import { AGENT_RUN_HONESTY_CHIP_LABEL } from "@/lib/dispatch/agentRunHonestyCopy.constant";
import type { AgentRunHonestyOutcome } from "@/lib/dispatch/agentRunHonestyOutcome.type";
import { buildAntigravityLoginWaitingYouOutcome } from "@/lib/dispatch/buildAntigravityLoginWaitingYouOutcome";
import { buildClaudeLoginExpiredWaitingYouOutcome } from "@/lib/dispatch/buildClaudeLoginExpiredWaitingYouOutcome";
import { isAgentRunUserStopped } from "@/lib/dispatch/isAgentRunUserStopped";
import { isAntigravityCliAuthBlockerInOutput } from "@/lib/dispatch/isAntigravityCliAuthBlockerInOutput";
import { isClaudeCliAuthBlockerInOutput } from "@/lib/dispatch/isClaudeCliAuthBlockerInOutput";

export const tryResolveAgentRunHonestyAuthStopTerminalOutcome = (input: {
  readonly output: string;
  readonly resultExitCode?: number | null;
}): AgentRunHonestyOutcome | null => {
  if (isAgentRunUserStopped(input.output, input.resultExitCode)) {
    return {
      kind: "stopped",
      chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.stopped,
      summaryLines: ["Stopped — run ended from the console."],
    };
  }

  if (isClaudeCliAuthBlockerInOutput(input.output)) {
    return buildClaudeLoginExpiredWaitingYouOutcome();
  }

  if (isAntigravityCliAuthBlockerInOutput(input.output)) {
    return buildAntigravityLoginWaitingYouOutcome();
  }

  return null;
};
