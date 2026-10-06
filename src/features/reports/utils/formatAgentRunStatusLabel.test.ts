import { describe, expect, it } from "vitest";

import { formatAgentRunStatusLabel } from "@/features/reports/utils/formatAgentRunStatusLabel";
import { formatAgentRunTimedOutLine } from "@/features/reports/utils/formatAgentRunTimedOutLine";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";

describe("formatAgentRunStatusLabel (S0 Timed out)", () => {
  it("labels an expired approval Timed out", () => {
    expect(formatAgentRunStatusLabel(AgentRunStatus.EXPIRED)).toEqual({
      label: "Timed out",
      isFinalCase: true,
    });
  });

  it("keeps raw words for other statuses", () => {
    expect(formatAgentRunStatusLabel(AgentRunStatus.PENDING_APPROVAL)).toEqual({
      label: "pending approval",
      isFinalCase: false,
    });
  });
});

describe("formatAgentRunTimedOutLine", () => {
  it("names the 15-minute window", () => {
    expect(formatAgentRunTimedOutLine()).toBe(
      "No one approved this run in 15 minutes.",
    );
  });
});
