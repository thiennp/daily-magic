import { describe, expect, it } from "vitest";

import { buildPromptSdlcWizardModuleRunPrompt } from "./buildPromptSdlcWizardModuleRunPrompt";

describe("buildPromptSdlcWizardModuleRunPrompt", () => {
  it("scopes the runner to one module and forwards chain prior output", () => {
    const prompt = buildPromptSdlcWizardModuleRunPrompt({
      promptText: "Write the summary file.",
      runnerInstructions: "Use the project root.",
      chainPriorOutput: "Step 1 produced outline.md",
      moduleTitle: "Summarize",
    });
    expect(prompt).toContain("Run only this module step");
    expect(prompt).toContain("Do not run later chain modules");
    expect(prompt).toContain("Prior module output");
    expect(prompt).toContain("outline.md");
    expect(prompt).toContain("Write the summary file.");
  });
});
