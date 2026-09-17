import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("weekly-team-status workflow", () => {
  it("registers form fields and three operator checkpoints", () => {
    const template = findCapabilityTemplateById("weekly-team-status");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Weekly team status");
    expect(template?.category).toBe("Reporting");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "weekOf",
      "highlights",
      "blockers",
    ]);
    expect(
      template.workflowFields.find((field) => field.key === "blockers")
        ?.required,
    ).toBe(false);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm the week and your highlights",
      "Answer clarifying questions",
      "Review before you share",
    ]);

    expect(template.exampleRequest).toContain("Confirm inputs and clarify");
    expect(template.exampleRequest).toContain("Draft the team status");
    expect(template.description).toContain("approve");
  });
});
