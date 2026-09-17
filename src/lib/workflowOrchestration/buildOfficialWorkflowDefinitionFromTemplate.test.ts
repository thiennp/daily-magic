import { describe, expect, it } from "vitest";

import allCapabilityTemplates from "@/lib/capabilities/templates/listCapabilityTemplates";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { buildOfficialWorkflowDefinitionFromTemplate } from "@/lib/workflowOrchestration/buildOfficialWorkflowDefinitionFromTemplate";
import { parseExampleRequestSections } from "@/lib/workflowOrchestration/parseExampleRequestSections";

describe("official workflow definitions for marketplace templates", () => {
  it("builds orchestration graphs for every workflow preset", () => {
    const workflows = allCapabilityTemplates.filter(
      (template) => template.type === CapabilityType.WORKFLOW,
    );

    expect(workflows.length).toBeGreaterThan(20);

    workflows.forEach((template) => {
      const definition = buildOfficialWorkflowDefinitionFromTemplate(template);
      expect(definition.templateId).toBe(template.id);
      expect(definition.nodes.length).toBeGreaterThanOrEqual(2);
      expect(definition.nodes.some((node) => node.kind === "human")).toBe(true);
      expect(definition.nodes.some((node) => node.kind === "agent")).toBe(true);
    });
  });

  it("splits vibe coding example request into sections", () => {
    const template = allCapabilityTemplates.find(
      (entry) => entry.id === "vibe-coding-app-feature",
    );
    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    if (template?.type !== CapabilityType.WORKFLOW) {
      return;
    }

    const sections = parseExampleRequestSections(template.exampleRequest);
    expect(sections.length).toBeGreaterThan(3);
  });
});
