import { describe, expect, it } from "vitest";

import { formatAgentRunEstimateSummary } from "./formatAgentRunEstimateSummary";

describe("formatAgentRunEstimateSummary", () => {
  it("formats sub-minute estimates in seconds", () => {
    expect(formatAgentRunEstimateSummary(45)).toBe(
      "Estimated ~45s. Starting work on your Mac…",
    );
  });

  it("formats longer estimates in minutes", () => {
    expect(formatAgentRunEstimateSummary(180)).toBe(
      "Estimated ~3 min. Starting work on your Mac…",
    );
  });
});
