import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";
import { OFFICIAL_WORKFLOW_DEFINITION } from "@/lib/workflowOrchestration/definitions/teacherLessonPlan.definition";

const REQUIRED_FIELD_KEYS = [
  "subject",
  "gradeLevel",
  "topicStandard",
  "classDuration",
] as const;

describe("teacher-lesson-plan official workflow definition", () => {
  it("aligns human nodes with harness operator steps", () => {
    const template = findCapabilityTemplateById("teacher-lesson-plan");
    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    if (template?.type !== CapabilityType.WORKFLOW) {
      return;
    }

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    const humanNodes = OFFICIAL_WORKFLOW_DEFINITION.nodes.filter(
      (node) => node.kind === "human",
    );

    expect(humanNodes.map((node) => node.title)).toEqual(
      operatorSteps.map((step) => step.title),
    );
    expect(
      OFFICIAL_WORKFLOW_DEFINITION.nodes.filter((n) => n.kind === "agent"),
    ).toHaveLength(2);
    expect(OFFICIAL_WORKFLOW_DEFINITION.version).toBeGreaterThanOrEqual(2);
  });

  it("references workflow form fields in agent steps and avoids awaiting-input gates", () => {
    const agentPrompts = OFFICIAL_WORKFLOW_DEFINITION.nodes
      .filter((node) => node.kind === "agent")
      .map((node) => node.promptSection)
      .join("\n");

    REQUIRED_FIELD_KEYS.forEach((key) => {
      expect(agentPrompts).toContain(key);
    });
    expect(agentPrompts).toContain("materialsPath");

    OFFICIAL_WORKFLOW_DEFINITION.nodes
      .filter((node) => node.kind === "agent")
      .forEach((node) => {
        expect(node.promptSection).not.toMatch(
          /Stop with \[\[AWAITING_INPUT\]\]/,
        );
      });
  });
});
