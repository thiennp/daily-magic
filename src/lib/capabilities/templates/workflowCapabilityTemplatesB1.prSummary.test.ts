import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("pr-summary workflow", () => {
  it("is registered with optional testNotes and three operator checkpoints", () => {
    const template = findCapabilityTemplateById("pr-summary");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("PR / code change summary");
    expect(template?.category).toBe("Engineering");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    const testNotes = template.workflowFields.find(
      (field) => field.key === "testNotes",
    );
    expect(testNotes?.required).toBe(false);
    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "context",
      "change",
      "audience",
      "testNotes",
    ]);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm PR context and audience",
      "Answer gaps and test notes",
      "Review the summary before you share",
    ]);

    expect(template.exampleRequest).toContain("Map context");
    expect(template.exampleRequest).toContain("blast radius");
    expect(template.exampleRequest).toContain("Review pack");
  });
});
