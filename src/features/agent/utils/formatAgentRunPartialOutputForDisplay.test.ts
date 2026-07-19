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
      sections: [],
    });
    expect(hasFormattedAgentRunPartialOutput(formatted)).toBe(true);
  });

  it("parses non-progress reply text into structured sections", () => {
    const formatted = formatAgentRunPartialOutputForDisplay(
      [
        "[[PROGRESS]]",
        "Reading files",
        "Opened brief.md",
        "",
        "Here is the proposal body.",
        "Branch is 5 commits behind origin/main.",
      ].join("\n"),
    );

    expect(formatted.progressUpdates).toEqual([
      {
        title: "Reading files",
        detail: "Opened brief.md",
      },
    ]);
    expect(formatted.sections).toEqual([
      { kind: "paragraph", text: "Here is the proposal body." },
      {
        kind: "callout",
        text: "Branch is 5 commits behind origin/main.",
      },
    ]);
  });
});
