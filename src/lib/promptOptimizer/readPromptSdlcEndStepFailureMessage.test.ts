import { describe, expect, it } from "vitest";

import { readPromptSdlcEndStepFailureMessage } from "@/lib/promptOptimizer/readPromptSdlcEndStepFailureMessage";

describe("readPromptSdlcEndStepFailureMessage", () => {
  it("returns cycle error for failed end steps", () => {
    expect(
      readPromptSdlcEndStepFailureMessage(
        {
          status: "failed",
          errorMessage: "The judge reply needs a score and a reason.",
        },
        { id: "end", detail: null },
      ),
    ).toBe("The judge reply needs a score and a reason.");
  });

  it("falls back to step detail when cycle error is empty", () => {
    expect(
      readPromptSdlcEndStepFailureMessage(
        { status: "failed", errorMessage: null },
        { id: "end", detail: "Writer timed out." },
      ),
    ).toBe("Writer timed out.");
  });

  it("returns null for non-failed terminal steps", () => {
    expect(
      readPromptSdlcEndStepFailureMessage(
        { status: "passed", errorMessage: null },
        { id: "end", detail: "ignored" },
      ),
    ).toBeNull();
  });
});
