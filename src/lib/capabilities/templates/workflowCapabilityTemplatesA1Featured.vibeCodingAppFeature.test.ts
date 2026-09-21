import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";
import { findOfficialWorkflowDefinitionByTemplateId } from "@/lib/workflowOrchestration/buildOfficialWorkflowDefinitionFromTemplate";

describe("vibe-coding-app-feature workflow", () => {
  it("requires a git app folder and exposes five operator checkpoints", () => {
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
    expect(appTarget?.required).toBe(true);
    expect(appTarget?.label).toContain("git repo");
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
      "Confirm the vibe, screen, and app folder",
      "Answer clarifying questions",
      "Pick an approach from the decision table (if shown)",
      "Review the result before you merge",
      "Confirm the fixes",
    ]);

    expect(template.exampleRequest).toContain("Clarify first");
    expect(template.exampleRequest).toContain(
      "Architecture analysis and decisions",
    );
    expect(template.exampleRequest).toContain("Upsides");
    expect(template.exampleRequest).toContain("feature-knowledge");
    expect(template.exampleRequest).toContain("Apply review fixes");
    expect(template.exampleRequest).not.toContain("[[AWAITING_INPUT]]");
  });

  it("splits implementation from verification and makes the fix pass skippable", () => {
    const definition = findOfficialWorkflowDefinitionByTemplateId(
      "vibe-coding-app-feature",
    );

    if (definition === null) {
      throw new Error("expected orchestration definition");
    }

    expect(definition.nodes.map((node) => node.title)).toEqual([
      "Confirm the vibe, screen, and app folder",
      "Resolve app folder and gather clarifying questions",
      "Answer clarifying questions",
      "Architecture analysis and options table",
      "Pick an approach from the decision table (if shown)",
      "Implement the slice",
      "Tests, knowledge, and summary",
      "Review the result before you merge",
      "Apply review fixes",
      "Confirm the fixes",
    ]);

    const preflightNode = definition.nodes[1];
    expect(
      preflightNode?.kind === "agent" ? preflightNode.promptSection : "",
    ).toContain("git repository");

    const fixNode = definition.nodes[8];
    expect(
      fixNode?.kind === "agent" ? fixNode.skipWhenPriorResponseMatches : [],
    ).toContain("approve");

    const skippableTitles = definition.nodes
      .filter((node) => node.kind === "human" && node.allowSkip === true)
      .map((node) => node.title);
    expect(skippableTitles).toEqual([
      "Pick an approach from the decision table (if shown)",
      "Confirm the fixes",
    ]);
  });
});
