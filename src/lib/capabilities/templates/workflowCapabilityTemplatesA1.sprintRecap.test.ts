import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";
import { findOfficialWorkflowDefinitionByTemplateId } from "@/lib/workflowOrchestration/buildOfficialWorkflowDefinitionFromTemplate";

describe("sprint-recap workflow", () => {
  it("uses curated orchestration and three operator checkpoints", () => {
    const template = findCapabilityTemplateById("sprint-recap");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Sprint recap");
    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    const missed = template.workflowFields.find(
      (field) => field.key === "missed",
    );
    expect(missed?.required).toBe(false);
    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "sprintName",
      "shipped",
      "missed",
      "nextFocus",
    ]);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm sprint facts and audience",
      "Answer gaps or confirm deferral reasons",
      "Review before you share",
    ]);

    const definition =
      findOfficialWorkflowDefinitionByTemplateId("sprint-recap");
    expect(definition?.version).toBe(2);
    expect(definition?.templateId).toBe("sprint-recap");

    expect(template.exampleRequest).toContain("Normalize inputs");
    expect(template.exampleRequest).toContain("Draft stakeholder recap");
    expect(template.exampleRequest).toContain("Deferred");
  });
});
