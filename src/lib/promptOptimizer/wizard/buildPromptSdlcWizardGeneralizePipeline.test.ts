import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "./createInitialPromptSdlcWizardState";
import { buildPromptSdlcWizardGeneralizePipeline } from "./buildPromptSdlcWizardGeneralizePipeline";

describe("buildPromptSdlcWizardGeneralizePipeline", () => {
  it("marks CLI active while generalize writer is running", () => {
    const wizard = createInitialPromptSdlcWizardState("prompt");
    const steps = buildPromptSdlcWizardGeneralizePipeline({
      writerLabel: "Codex",
      folder: "~/proj",
      status: "judging",
      wizard: { ...wizard, phase: "generalize", gate: null },
    });
    const cli = steps.find((item) => item.id === "cli");
    expect(cli?.state).toBe("active");
    expect(steps.find((item) => item.id === "awl")?.state).toBe("done");
  });
});
