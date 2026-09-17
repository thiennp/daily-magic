import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("document-summary workflow", () => {
  it("is registered with source, length, focus and three operator checkpoints", () => {
    const template = findCapabilityTemplateById("document-summary");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Document summary");
    expect(template?.category).toBe("Research");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "source",
      "length",
      "focus",
    ]);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm source, length, and focus",
      "Answer clarifying questions (if any)",
      "Review the summary before you share it",
    ]);

    expect(template.exampleRequest).toContain("Read and clarify");
    expect(template.exampleRequest).toContain("Summarize for decision-makers");
    expect(template.exampleRequest).toContain("recommended actions");
  });
});
