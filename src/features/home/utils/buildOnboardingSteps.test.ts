import { describe, expect, it } from "vitest";

import { buildOnboardingSteps } from "@/features/home/utils/buildOnboardingSteps";
import { listRequiredOnboardingSteps } from "@/features/home/utils/listRequiredOnboardingSteps";

describe("buildOnboardingSteps", () => {
  it("requires only Mac connect and first task", () => {
    const steps = buildOnboardingSteps({
      hasPairedDevice: true,
      hasCreatedWorkflowOrAgent: false,
      hasSentTask: false,
      hasScheduledAutomation: false,
    });

    const required = listRequiredOnboardingSteps(steps);
    expect(required.map((step) => step.id)).toEqual(["pair", "task"]);
  });

  it("orders connect before task before optional playbook", () => {
    const steps = buildOnboardingSteps({
      hasPairedDevice: false,
      hasCreatedWorkflowOrAgent: false,
      hasSentTask: false,
      hasScheduledAutomation: false,
    });

    expect(steps.map((step) => step.id)).toEqual([
      "pair",
      "task",
      "workflow",
      "automate",
    ]);
    expect(
      steps.filter((step) => step.optional).map((step) => step.id),
    ).toEqual(["workflow", "automate"]);
  });
});
