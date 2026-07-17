import { describe, expect, it } from "vitest";

import { stripAgentRunProgressFromOutput } from "@/features/agent/utils/stripAgentRunProgressFromOutput";

describe("stripAgentRunProgressFromOutput", () => {
  it("removes progress blocks and keeps the final reply", () => {
    const output = [
      "[[PROGRESS]]",
      "Reading files",
      "Opened brief.md",
      "",
      "Here is the proposal body.",
      "[[NEXT_ACTIONS]]",
      "1. Send proposal",
    ].join("\n");

    expect(stripAgentRunProgressFromOutput(output)).toBe(
      "Here is the proposal body.\n[[NEXT_ACTIONS]]\n1. Send proposal",
    );
  });

  it("strips a partial progress marker at the stream end", () => {
    expect(stripAgentRunProgressFromOutput("Hello\n[[PROGRE")).toBe("Hello");
  });
});
