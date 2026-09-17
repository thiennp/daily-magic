import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("one-on-one-prep workflow", () => {
  it("is registered with three operator checkpoints and structured example request", () => {
    const template = findCapabilityTemplateById("one-on-one-prep");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("1:1 talking points");
    expect(template?.category).toBe("Communication");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "person",
      "sinceLast",
      "topics",
      "feedback",
    ]);

    const sinceLast = template.workflowFields.find(
      (field) => field.key === "sinceLast",
    );
    expect(sinceLast?.required).toBe(false);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm who you are meeting and what matters",
      "Answer clarifying questions",
      "Review the agenda before your 1:1",
    ]);

    expect(template.exampleRequest).toContain("Clarify context");
    expect(template.exampleRequest).toContain("observation + impact + request");
    expect(template.exampleRequest).toContain("follow-ups");
  });
});
