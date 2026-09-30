import { describe, expect, it } from "vitest";

import { shouldSkipPromptSdlcWizardSeparateReview } from "./shouldSkipPromptSdlcWizardSeparateReview";

describe("shouldSkipPromptSdlcWizardSeparateReview", () => {
  it("skips when there is exactly one module in one option", () => {
    expect(
      shouldSkipPromptSdlcWizardSeparateReview([
        {
          id: "only",
          title: "Single",
          summary: "No split",
          topology: "parallel",
          recommended: true,
          modules: [
            {
              id: "m1",
              title: "Main",
              prompt: "Do the thing",
              order: 0,
            },
          ],
        },
      ]),
    ).toBe(true);
  });

  it("does not skip when multiple modules are returned", () => {
    expect(
      shouldSkipPromptSdlcWizardSeparateReview([
        {
          id: "chain",
          title: "Chain",
          summary: "Two steps",
          topology: "chain",
          recommended: true,
          modules: [
            { id: "m1", title: "A", prompt: "a", order: 0 },
            { id: "m2", title: "B", prompt: "b", order: 1 },
          ],
        },
      ]),
    ).toBe(false);
  });
});
