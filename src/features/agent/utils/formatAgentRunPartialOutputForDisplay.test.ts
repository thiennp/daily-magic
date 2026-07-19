import { describe, expect, it } from "vitest";

import {
  formatAgentRunPartialOutputForDisplay,
  hasFormattedAgentRunPartialOutput,
} from "@/features/agent/utils/formatAgentRunPartialOutputForDisplay";

describe("formatAgentRunPartialOutputForDisplay (DISPATCH-002)", () => {
  it("parses [[PROGRESS]] blocks into title and detail for checkpoint modals", () => {
    const formatted = formatAgentRunPartialOutputForDisplay(
      [
        "[[PROGRESS]]",
        "Exploring the app structure",
        "Found the app at ~/daily-magic. Now exploring the src directory",
      ].join("\n"),
    );

    expect(formatted).toEqual({
      progressUpdates: [
        {
          title: "Exploring the app structure",
          detail:
            "Found the app at ~/daily-magic. Now exploring the src directory",
        },
      ],
      remainingText: "",
    });
    expect(hasFormattedAgentRunPartialOutput(formatted)).toBe(true);
  });

  it("keeps non-progress reply text after stripping markers", () => {
    const formatted = formatAgentRunPartialOutputForDisplay(
      [
        "[[PROGRESS]]",
        "Reading files",
        "Opened brief.md",
        "",
        "Here is the proposal body.",
      ].join("\n"),
    );

    expect(formatted.progressUpdates).toEqual([
      {
        title: "Reading files",
        detail: "Opened brief.md",
      },
    ]);
    expect(formatted.remainingText).toBe("Here is the proposal body.");
  });
});
