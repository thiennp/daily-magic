import { describe, expect, it } from "vitest";

import { buildPromptSdlcSeparatePrompt } from "./buildPromptSdlcSeparatePrompt";

describe("buildPromptSdlcSeparatePrompt", () => {
  it("asks for templated placeholders and lists variables", () => {
    const prompt = buildPromptSdlcSeparatePrompt({
      goal: "Refactor prop drilling",
      templatedPrompt: "Edit {{targetFile}} under {{searchDir}}",
      variables: [
        {
          name: "targetFile",
          description: "tsx file",
          sampleValue: "Comparison.tsx",
        },
        {
          name: "searchDir",
          description: "search root",
          sampleValue: "src/components",
        },
      ],
      evaluatedPromptReference: "Edit Comparison.tsx under src/components",
      avoid: [],
      stepInstructions: "",
      lastAttemptSummary: "",
    });

    expect(prompt).toContain("Edit {{targetFile}} under {{searchDir}}");
    expect(prompt).toContain("{{targetFile}}");
    expect(prompt).not.toContain("Templated prompt:\nEdit Comparison.tsx");
    expect(prompt).toContain("do not paste sample values");
    expect(prompt).toContain("Evaluated wording reference");
  });
});
