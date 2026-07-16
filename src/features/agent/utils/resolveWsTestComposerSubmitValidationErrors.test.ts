import { describe, expect, it } from "vitest";

import { resolveWsTestComposerSubmitValidationErrors } from "@/features/agent/utils/resolveWsTestComposerSubmitValidationErrors";

describe("resolveWsTestComposerSubmitValidationErrors", () => {
  it("returns workflow field errors for workflow tasks", () => {
    expect(
      resolveWsTestComposerSubmitValidationErrors({
        isWorkflowTask: true,
        workflowValidationErrors: ["Topic is required."],
        resolvedPrompt: "built prompt",
      }),
    ).toEqual(["Topic is required."]);
  });

  it("requires instructions for blank custom tasks", () => {
    expect(
      resolveWsTestComposerSubmitValidationErrors({
        isWorkflowTask: false,
        workflowValidationErrors: [],
        resolvedPrompt: "   ",
      }),
    ).toEqual(["Task instructions are required."]);
  });

  it("accepts a non-empty custom task prompt", () => {
    expect(
      resolveWsTestComposerSubmitValidationErrors({
        isWorkflowTask: false,
        workflowValidationErrors: [],
        resolvedPrompt: "Summarize my inbox",
      }),
    ).toEqual([]);
  });
});
