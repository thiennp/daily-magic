import {
  AGENT_RUN_HONESTY_CHIP_LABEL,
  CLAUDE_LOGIN_EXPIRED_LOCKED_REASON,
  formatAgentRunHonestyWaitingYouTerminalSummary,
} from "@/lib/dispatch/agentRunHonestyCopy.constant";
import type { AgentRunHonestyOutcome } from "@/lib/dispatch/agentRunHonestyOutcome.type";

export const buildClaudeLoginExpiredWaitingYouOutcome =
  (): AgentRunHonestyOutcome => ({
    kind: "waiting_you",
    chipLabel: AGENT_RUN_HONESTY_CHIP_LABEL.waiting_you,
    summaryLines: [
      formatAgentRunHonestyWaitingYouTerminalSummary(
        CLAUDE_LOGIN_EXPIRED_LOCKED_REASON,
      ),
    ],
  });
