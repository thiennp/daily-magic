import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";
import { OFFICIAL_WORKFLOW_DEFINITION } from "@/lib/workflowOrchestration/definitions/freelancerClientProposal.definition";

const WORKFLOW_FIELD_KEYS = [
  "clientName",
  "projectBrief",
  "portfolioFolderPath",
  "budgetRange",
  "proposalHistoryPath",
] as const;

describe("freelancer-client-proposal official workflow definition", () => {
  it("aligns human nodes with harness operator steps", () => {
    const template = findCapabilityTemplateById("freelancer-client-proposal");
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
    const agentPrompts = OFFICIAL_WORKFLOW_DEFINITION.nodes
      .filter((node) => node.kind === "agent")
      .map((node) => node.promptSection)
      .join("\n");

    WORKFLOW_FIELD_KEYS.forEach((key) => {
      expect(agentPrompts).toContain(key);
    });
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

  it("ends on a human send checkpoint after agent finalize", () => {
    const nodes = OFFICIAL_WORKFLOW_DEFINITION.nodes;
    expect(nodes.at(-1)?.kind).toBe("human");
    expect(nodes.at(-1)?.title).toBe("Send the proposal through your channel");
    expect(nodes.at(-2)?.kind).toBe("agent");
  });
});
