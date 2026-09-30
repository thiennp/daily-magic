import { describe, expect, it } from "vitest";

import {
  describePromptSdlcWizardModulePassStatus,
  isPromptSdlcWizardModulePassed,
} from "./describePromptSdlcWizardModulePassStatus";

describe("describePromptSdlcWizardModulePassStatus", () => {
  it("treats passed status with low score as below pass", () => {
    const wizardModule = {
      moduleId: "m1",
      title: "T",
      prompt: "p",
      status: "passed" as const,
      selectedRevisionRound: null,
      statistics: {
        bestScore: 66,
        bestRound: 0,
        bestRunOutput: "out",
        rounds: [],
      },
    };
    expect(isPromptSdlcWizardModulePassed(wizardModule, 90)).toBe(false);
    expect(describePromptSdlcWizardModulePassStatus(wizardModule, 90)).toBe(
      "Below pass (66)",
    );
  });
});
