import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";
import { findOfficialWorkflowDefinitionByTemplateId } from "@/lib/workflowOrchestration/buildOfficialWorkflowDefinitionFromTemplate";

describe("release-notes-draft workflow", () => {
  it("is registered with operator checkpoints and a curated orchestration graph", () => {
    const template = findCapabilityTemplateById("release-notes-draft");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Release notes draft");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "version",
      "changes",
      "audience",
    ]);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm version, audience, and change list",
      "Review grouping, breaking changes, and tone",
      "Approve release notes before you publish",
    ]);

    const definition = findOfficialWorkflowDefinitionByTemplateId(
      "release-notes-draft",
    );
    expect(definition?.version).toBeGreaterThanOrEqual(2);
    expect(definition?.nodes).toHaveLength(5);
  });
});
