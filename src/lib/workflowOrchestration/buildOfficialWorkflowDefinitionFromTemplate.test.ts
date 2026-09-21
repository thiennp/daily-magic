import { describe, expect, it } from "vitest";

import allCapabilityTemplates from "@/lib/capabilities/templates/listCapabilityTemplates";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { findOfficialWorkflowDefinitionByTemplateId } from "@/lib/workflowOrchestration/buildOfficialWorkflowDefinitionFromTemplate";
import { parseExampleRequestSections } from "@/lib/workflowOrchestration/parseExampleRequestSections";

describe("official workflow definitions for marketplace templates", () => {
  it("builds orchestration graphs for every workflow preset", () => {
    const workflows = allCapabilityTemplates.filter(
      (template) => template.type === CapabilityType.WORKFLOW,
    );

    expect(workflows.length).toBe(27);

    workflows.forEach((template) => {
      const definition = findOfficialWorkflowDefinitionByTemplateId(
        template.id,
      );
      expect(definition).not.toBeNull();
      if (definition === null) {
        return;
      }
      expect(definition.templateId).toBe(template.id);
      expect(definition.version).toBeGreaterThanOrEqual(2);
      expect(definition.nodes.length).toBeGreaterThanOrEqual(3);
      expect(definition.nodes.at(-1)?.kind).toBe("human");
      expect(definition.nodes.some((node) => node.kind === "human")).toBe(true);
      expect(definition.nodes.some((node) => node.kind === "agent")).toBe(true);
    });
  });

  it("uses curated graph for weekly team status", () => {
    const definition =
      findOfficialWorkflowDefinitionByTemplateId("weekly-team-status");
    expect(definition?.version).toBeGreaterThanOrEqual(2);
    expect(
      definition?.nodes.filter((node) => node.kind === "agent"),
    ).toHaveLength(2);
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
    expect(sections.length).toBeGreaterThanOrEqual(3);
  });

  it("uses custom orchestration for contract summarizer workflow", () => {
    const definition = findOfficialWorkflowDefinitionByTemplateId(
      "contract-summarizer",
    );
    expect(definition?.version).toBeGreaterThanOrEqual(2);
    expect(
      definition?.nodes.filter((node) => node.kind === "agent"),
    ).toHaveLength(2);
  });
});
