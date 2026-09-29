import { describe, expect, it } from "vitest";

import { substitutePromptSdlcTemplate } from "./substitutePromptSdlcTemplate";

describe("substitutePromptSdlcTemplate", () => {
  it("replaces known placeholders", () => {
    const result = substitutePromptSdlcTemplate(
      "Refactor {{componentName}} to use {{storeName}}.",
      [
        {
          name: "componentName",
          description: "React component",
          sampleValue: "ProfileCard",
        },
        {
          name: "storeName",
          description: "Zustand store",
          sampleValue: "useProfileStore",
        },
      ],
    );
    expect(result).toBe("Refactor ProfileCard to use useProfileStore.");
  });
});
