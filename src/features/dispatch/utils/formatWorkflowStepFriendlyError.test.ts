import { describe, expect, it } from "vitest";

import { formatWorkflowStepFriendlyError } from "@/features/dispatch/utils/formatWorkflowStepFriendlyError";

describe("formatWorkflowStepFriendlyError", () => {
  it("maps exit codes to a friendly headline", () => {
    const result = formatWorkflowStepFriendlyError(
      "Agent step failed with exit code 1.",
    );
    expect(result.headline).toBe("This step could not finish on your Mac.");
    expect(result.detail).toContain("exit code 1");
  });

  it("maps Mac connectivity errors", () => {
    const result = formatWorkflowStepFriendlyError("No Mac connected.");
    expect(result.headline).toBe("Your Mac is not connected right now.");
  });
});
