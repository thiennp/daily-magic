import { describe, expect, it } from "vitest";

import allCapabilityTemplates from "@/lib/capabilities/templates/listCapabilityTemplates";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { findOfficialWorkflowDefinitionByTemplateId } from "@/lib/workflowOrchestration/buildOfficialWorkflowDefinitionFromTemplate";
import { renderOfficialWorkflowAgentPrompt } from "@/lib/workflowOrchestration/renderOfficialWorkflowAgentPrompt";

describe("marketplace workflow daily-use audit", () => {
  const workflows = allCapabilityTemplates.filter(
    (t) => t.type === CapabilityType.WORKFLOW,
  );

  it("has 29 presets", () => expect(workflows.length).toBe(29));

  workflows.forEach((template) => {
    it(`${template.id} daily-use ready`, () => {
      expect(template.description).not.toMatch(/\bdemo(s)?\b/i);
      const definition = findOfficialWorkflowDefinitionByTemplateId(
        template.id,
      );
      expect(definition?.nodes.length).toBeGreaterThanOrEqual(3);
      const agentNode = definition?.nodes.find((n) => n.kind === "agent");
      if (agentNode?.kind !== "agent" || definition === null) {
        return;
      }
      const prompt = renderOfficialWorkflowAgentPrompt({
        definition,
        node: agentNode,
        stepIndex: 1,
        totalSteps: definition.nodes.length,
        fields:
          template.type === CapabilityType.WORKFLOW
            ? template.workflowFields
            : [],
        fieldValues: {},
        priorHumanResponses: {},
      });
      expect(prompt).toContain("Daily-use rules:");
    });
  });
});
