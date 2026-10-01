import { describe, expect, it } from "vitest";

import {
  canUseThisPromptSdlcOutcome,
  labelPromptSdlcCycleOutcome,
  labelPromptSdlcErrorKind,
} from "@/features/prompt-optimizer/internal/presentation/promptSdlcOutcomeLabels.constant";

describe("promptSdlcOutcomeLabels", () => {
  it("labels timeout / interrupt / no_reply unmistakably", () => {
    expect(labelPromptSdlcErrorKind("writer_timeout")).toBe("Timeout");
    expect(labelPromptSdlcErrorKind("writer_interrupted")).toBe("Interrupt");
    expect(labelPromptSdlcErrorKind("writer_no_reply")).toBe("No reply");
    expect(
      labelPromptSdlcCycleOutcome({
        status: "failed",
        errorKind: "writer_timeout",
      }).label,
    ).toBe("Timeout");
  });

  it("labels usage_limit and action_required for G2 chrome", () => {
    expect(labelPromptSdlcErrorKind("usage_limit")).toBe("Usage limit");
    expect(labelPromptSdlcErrorKind("action_required")).toBe("Action required");
    expect(
      labelPromptSdlcCycleOutcome({
        status: "failed",
        errorKind: "usage_limit",
      }).label,
    ).toBe("Usage limit");
    expect(
      labelPromptSdlcCycleOutcome({
        status: "failed",
        errorKind: "action_required",
      }).label,
    ).toBe("Action required");
  });

  it("allows useThisPrompt only on passed", () => {
    expect(canUseThisPromptSdlcOutcome("passed")).toBe(true);
    expect(canUseThisPromptSdlcOutcome("failed")).toBe(false);
    expect(canUseThisPromptSdlcOutcome("stopped")).toBe(false);
  });
});
