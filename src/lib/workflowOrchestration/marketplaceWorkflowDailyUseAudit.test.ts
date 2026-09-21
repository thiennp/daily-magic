import { describe, expect, it } from "vitest";

import allCapabilityTemplates from "@/lib/capabilities/templates/listCapabilityTemplates";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { findOfficialWorkflowDefinitionByTemplateId } from "@/lib/workflowOrchestration/buildOfficialWorkflowDefinitionFromTemplate";
import { findCustomOfficialWorkflowDefinitionByTemplateId } from "@/lib/workflowOrchestration/definitions/registry";
import { renderOfficialWorkflowAgentPrompt } from "@/lib/workflowOrchestration/renderOfficialWorkflowAgentPrompt";

describe("marketplace workflow daily-use audit", () => {
  const workflows = allCapabilityTemplates.filter(
    (t) => t.type === CapabilityType.WORKFLOW,
  );

  it("has 27 presets", () => expect(workflows.length).toBe(27));

  workflows.forEach((template) => {
    it(`${template.id} daily-use ready`, () => {
      expect(template.description).not.toMatch(/\bdemo(s)?\b/i);
      expect(
        findCustomOfficialWorkflowDefinitionByTemplateId(template.id),
      ).toBeDefined();

      const definition = findOfficialWorkflowDefinitionByTemplateId(
        template.id,
      );
      expect(definition).not.toBeNull();
      if (definition === null) {
        return;
      }

      expect(definition.version).toBeGreaterThanOrEqual(2);
      expect(definition.nodes.length).toBeGreaterThanOrEqual(3);
      expect(definition.nodes.at(-1)?.kind).toBe("human");
      expect(definition.nodes.some((node) => node.kind === "agent")).toBe(true);

      definition.nodes
        .filter((node) => node.kind === "agent")
        .forEach((node) => {
          expect(node.promptSection).not.toMatch(
            /Stop with \[\[AWAITING_INPUT\]\]/,
          );
        });

      const agentNode = definition.nodes.find((n) => n.kind === "agent");
      if (agentNode?.kind !== "agent") {
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
