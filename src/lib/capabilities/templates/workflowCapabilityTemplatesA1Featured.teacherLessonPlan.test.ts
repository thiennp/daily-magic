import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("teacher-lesson-plan workflow", () => {
  it("registers required fields and three operator checkpoints", () => {
    const template = findCapabilityTemplateById("teacher-lesson-plan");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Teacher lesson plan");
    expect(template?.category).toBe("Education");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    const materialsPath = template.workflowFields.find(
      (field) => field.key === "materialsPath",
    );
    expect(materialsPath?.required).toBe(false);
    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "subject",
      "gradeLevel",
      "topicStandard",
      "classDuration",
      "materialsPath",
    ]);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm standards and class constraints",
      "Approve the lesson plan",
      "Deliver the lesson on your side",
    ]);

    expect(template.exampleRequest).toContain("Align objectives and pacing");
    expect(template.exampleRequest).toContain("Draft timed agenda");
    expect(template.exampleRequest).toContain("Finalize after approval");
    expect(template.exampleRequest).not.toContain("[[AWAITING_INPUT]]");
  });
});
