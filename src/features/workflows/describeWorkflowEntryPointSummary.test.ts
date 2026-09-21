import { describe, expect, it } from "vitest";

import { describeWorkflowEntryPointSummary } from "@/features/workflows/describeWorkflowEntryPointSummary";

describe("describeWorkflowEntryPointSummary", () => {
  it("returns empty copy when there are no fields", () => {
    expect(describeWorkflowEntryPointSummary([])).toBe("No questions yet");
  });

  it("summarizes a single titled question", () => {
    expect(describeWorkflowEntryPointSummary(["Client name"])).toBe(
      "Client name",
    );
  });

  it("summarizes multiple questions with a truncated preview", () => {
    expect(
      describeWorkflowEntryPointSummary(["Week of", "Client name", ""]),
    ).toBe("2 questions · Week of, …");
  });

  it("handles all-untitled fields", () => {
    expect(describeWorkflowEntryPointSummary(["", " "])).toBe(
      "2 untitled questions",
    );
  });
});
