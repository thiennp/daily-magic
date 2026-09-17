import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";
import { OFFICIAL_WORKFLOW_DEFINITION } from "@/lib/workflowOrchestration/definitions/emailInboxReply.definition";
import { parseExampleRequestSections } from "@/lib/workflowOrchestration/parseExampleRequestSections";

describe("email-inbox-reply official workflow definition", () => {
  it("aligns human nodes with harness operator steps", () => {
    const template = findCapabilityTemplateById("email-inbox-reply");
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
    ).toHaveLength(3);
    expect(OFFICIAL_WORKFLOW_DEFINITION.version).toBeGreaterThanOrEqual(2);
  });

  it("references workflow form fields in agent prompt sections", () => {
    const agentPrompts = OFFICIAL_WORKFLOW_DEFINITION.nodes
      .filter((node) => node.kind === "agent")
      .map((node) => node.promptSection)
      .join("\n");

    expect(agentPrompts).toContain("knowledgeFolderPath");
    expect(agentPrompts).toContain("inboxFocus");
    expect(agentPrompts).toContain("answeredLogPath");
    expect(agentPrompts).toContain("replyTone");
    expect(agentPrompts).toContain("signatureBlock");
  });

  it("does not instruct awaiting-input stops in agent prompt sections", () => {
    OFFICIAL_WORKFLOW_DEFINITION.nodes
      .filter((node) => node.kind === "agent")
      .forEach((node) => {
        expect(node.promptSection).not.toMatch(/\[\[AWAITING_INPUT\]\]/);
      });
  });

  it("matches example request sections to agent node count", () => {
    const template = findCapabilityTemplateById("email-inbox-reply");
    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    if (template?.type !== CapabilityType.WORKFLOW) {
      return;
    }

    const sections = parseExampleRequestSections(template.exampleRequest);
    const agentCount = OFFICIAL_WORKFLOW_DEFINITION.nodes.filter(
      (node) => node.kind === "agent",
    ).length;

    expect(sections.length).toBe(agentCount + 1);
  });
});
