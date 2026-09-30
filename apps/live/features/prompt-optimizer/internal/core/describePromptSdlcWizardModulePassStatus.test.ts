import { describe, expect, it } from "vitest";

import {
  describePromptSdlcWizardModulePassStatus,
  isPromptSdlcWizardModulePassed,
} from "./describePromptSdlcWizardModulePassStatus";

describe("describePromptSdlcWizardModulePassStatus", () => {
  it("treats passed status with low score as below pass", () => {
    const module = {
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
    expect(isPromptSdlcWizardModulePassed(module)).toBe(false);
    expect(describePromptSdlcWizardModulePassStatus(module)).toBe(
      "Below pass (66)",
    );
  });
});
