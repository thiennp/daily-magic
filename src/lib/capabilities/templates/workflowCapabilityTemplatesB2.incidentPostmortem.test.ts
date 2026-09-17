import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("incident-postmortem workflow template", () => {
  it("registers form fields and three operator checkpoints", () => {
    const template = findCapabilityTemplateById("incident-postmortem");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.category).toBe("Engineering");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "timeline",
      "impact",
      "rootCause",
      "followUps",
    ]);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm incident facts in the workflow form",
      "Answer timeline and impact gaps",
      "Review the postmortem draft",
    ]);

    expect(template.exampleRequest).toContain("## Timeline and impact");
    expect(template.exampleRequest).toContain("## Root cause and action items");
    expect(template.exampleRequest).toContain("blameless");
  });
});
