import {
  AGENT_RUN_HONESTY_CHIP_LABEL,
  ANTIGRAVITY_LOGIN_REQUIRED_LOCKED_REASON,
  formatAgentRunHonestyWaitingYouTerminalSummary,
} from "@/lib/dispatch/agentRunHonestyCopy.constant";
import type { AgentRunHonestyOutcome } from "@/lib/dispatch/agentRunHonestyOutcome.type";

export const buildAntigravityLoginWaitingYouOutcome =
  (): AgentRunHonestyOutcome => ({
    kind: "waiting_you",
    chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.waiting_you,
    summaryLines: [
      formatAgentRunHonestyWaitingYouTerminalSummary(
        ANTIGRAVITY_LOGIN_REQUIRED_LOCKED_REASON,
      ),
    ],
  });
