import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";
import { OFFICIAL_WORKFLOW_DEFINITION } from "@/lib/workflowOrchestration/definitions/incidentPostmortem.definition";

describe("incident-postmortem official workflow definition", () => {
  it("aligns human nodes with harness operator steps", () => {
    const template = findCapabilityTemplateById("incident-postmortem");
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

  it("references workflow form fields in agent prompt sections", () => {
    const agentNodes = OFFICIAL_WORKFLOW_DEFINITION.nodes.filter(
      (node) => node.kind === "agent",
    );
    const combinedPrompts = agentNodes
      .map((node) => node.promptSection)
      .join("\n");

    expect(combinedPrompts).toMatch(/\btimeline\b/i);
    expect(combinedPrompts).toMatch(/\bimpact\b/i);
    expect(combinedPrompts).toMatch(/\brootCause\b/);
    expect(combinedPrompts).toMatch(/\bfollowUps\b/);
  });

  it("does not instruct awaiting-input stops in agent prompt sections", () => {
    OFFICIAL_WORKFLOW_DEFINITION.nodes
      .filter((node) => node.kind === "agent")
      .forEach((node) => {
        expect(node.promptSection).not.toMatch(
          /Stop with \[\[AWAITING_INPUT\]\]/,
        );
      });
  });
});
