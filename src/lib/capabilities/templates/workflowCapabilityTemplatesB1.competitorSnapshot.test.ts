import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("competitor-snapshot workflow", () => {
  it("is registered with optional format and three operator checkpoints", () => {
    const template = findCapabilityTemplateById("competitor-snapshot");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Competitor snapshot");
    expect(template?.category).toBe("Research");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    const format = template.workflowFields.find(
      (field) => field.key === "format",
    );
    expect(format?.required).toBe(false);
    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "competitor",
      "focus",
      "format",
    ]);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm competitor, focus lens, and output format",
      "Answer evidence and scope questions",
      "Review the snapshot before you share",
    ]);

    expect(template.exampleRequest).toContain("Scope and evidence");
    expect(template.exampleRequest).toContain("implications");
    expect(template.exampleRequest).toContain("Review gate");
  });
});
