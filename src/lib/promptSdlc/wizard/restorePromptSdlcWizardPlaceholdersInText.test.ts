import { describe, expect, it } from "vitest";

import { restorePromptSdlcWizardPlaceholdersInText } from "./restorePromptSdlcWizardPlaceholdersInText";

describe("restorePromptSdlcWizardPlaceholdersInText", () => {
  it("replaces sample values with placeholders", () => {
    const text = restorePromptSdlcWizardPlaceholdersInText(
      "In file Comparison.tsx, run grep in src/components",
      [
        {
          name: "targetFile",
          description: "file",
          sampleValue: "Comparison.tsx",
        },
        {
          name: "searchDir",
          description: "dir",
          sampleValue: "src/components",
        },
      ],
    );
    expect(text).toContain("{{targetFile}}");
    expect(text).toContain("{{searchDir}}");
    expect(text).not.toContain("Comparison.tsx");
  });

  it("leaves existing placeholders unchanged", () => {
    const text = restorePromptSdlcWizardPlaceholdersInText(
      "Use {{targetFile}} only",
      [
        {
          name: "targetFile",
          description: "file",
          sampleValue: "Comparison.tsx",
        },
      ],
    );
    expect(text).toBe("Use {{targetFile}} only");
  });
});
