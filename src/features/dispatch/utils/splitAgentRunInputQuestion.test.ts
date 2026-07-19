import { describe, expect, it } from "vitest";

import { splitAgentRunInputQuestion } from "@/features/dispatch/utils/splitAgentRunInputQuestion";

describe("splitAgentRunInputQuestion (DISPATCH-003)", () => {
  it("splits compound questions joined by And", () => {
    expect(
      splitAgentRunInputQuestion(
        "Does this match the changes you want committed? And should I pull the 5 upstream commits first, or commit as-is and handle the merge separately?",
      ),
    ).toEqual([
      "Does this match the changes you want committed?",
      "Should I pull the 5 upstream commits first, or commit as-is and handle the merge separately?",
    ]);
  });
});
