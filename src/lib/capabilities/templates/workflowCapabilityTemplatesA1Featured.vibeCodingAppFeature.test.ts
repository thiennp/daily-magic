import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("vibe-coding-app-feature workflow", () => {
  it("is registered with optional appTarget and four operator checkpoints", () => {
    const template = findCapabilityTemplateById("vibe-coding-app-feature");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Add vibe coding app feature");
    expect(template?.category).toBe("Engineering");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    const appTarget = template.workflowFields.find(
      (field) => field.key === "appTarget",
    );
    expect(appTarget?.required).toBe(false);
    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "appTarget",
      "featureBrief",
      "targetSurface",
      "stackNotes",
      "acceptanceNotes",
    ]);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm the vibe, screen, and which app to change",
      "Answer clarifying questions",
      "Pick an approach from the decision table (if shown)",
      "Review the result before you merge",
    ]);

    expect(template.exampleRequest).toContain("Clarify first");
    expect(template.exampleRequest).toContain("Architecture decisions");
    expect(template.exampleRequest).toContain("Upsides");
    expect(template.exampleRequest).toContain("feature-knowledge");
  });
});
