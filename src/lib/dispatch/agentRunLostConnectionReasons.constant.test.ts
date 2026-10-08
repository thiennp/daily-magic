import { describe, expect, it } from "vitest";
import {
  AGENT_RUN_LOST_CONNECTION_REASONS,
  formatAgentRunTerminalReasonLine,
} from "./agentRunLostConnectionReasons.constant";

describe("formatAgentRunTerminalReasonLine", () => {
  it("formats stale run as lost connection", () => {
    expect(
      formatAgentRunTerminalReasonLine(AGENT_RUN_LOST_CONNECTION_REASONS.STALE),
    ).toBe("Lost connection to your computer — this task stopped.");
  });

  it("formats disconnect as lost connection", () => {
    expect(
      formatAgentRunTerminalReasonLine(
        AGENT_RUN_LOST_CONNECTION_REASONS.DISCONNECT,
      ),
    ).toBe("Lost connection to your computer — this task stopped.");
  });

  it("returns other reasons as is", () => {
    expect(formatAgentRunTerminalReasonLine("Some other error")).toBe(
      "Some other error",
    );
  });

  it("returns empty string for null or empty reason", () => {
    expect(formatAgentRunTerminalReasonLine(null)).toBe("");
    expect(formatAgentRunTerminalReasonLine("   ")).toBe("");
  });
});
