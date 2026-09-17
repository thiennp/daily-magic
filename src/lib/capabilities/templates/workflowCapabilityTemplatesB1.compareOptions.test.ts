import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("compare-options workflow", () => {
  it("is registered with three operator checkpoints and criteria-driven example request", () => {
    const template = findCapabilityTemplateById("compare-options");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Compare options");
    expect(template?.category).toBe("Research");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "optionA",
      "optionB",
      "criteria",
    ]);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm the options and decision criteria",
      "Answer criteria and priority questions",
      "Review the comparison and recommendation",
    ]);

    expect(template.exampleRequest).toContain("Clarify criteria");
    expect(template.exampleRequest).toContain("comparison table");
    expect(template.exampleRequest).toContain("recommendation");
  });
});
