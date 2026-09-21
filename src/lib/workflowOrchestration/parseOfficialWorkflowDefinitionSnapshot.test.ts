import { describe, expect, it } from "vitest";

import CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS from "@/lib/workflowOrchestration/definitions/registry";
import { parseOfficialWorkflowDefinitionSnapshot } from "@/lib/workflowOrchestration/parseOfficialWorkflowDefinitionSnapshot";

const toSnapshot = (value: unknown): Record<string, unknown> =>
  JSON.parse(JSON.stringify(value)) as Record<string, unknown>;

describe("parseOfficialWorkflowDefinitionSnapshot", () => {
  it("parses every curated definition snapshot regardless of version", () => {
    Object.entries(CUSTOM_OFFICIAL_WORKFLOW_DEFINITIONS).forEach(
      ([templateId, definition]) => {
        const parsed = parseOfficialWorkflowDefinitionSnapshot(
          toSnapshot(definition),
        );

        expect(parsed, `${templateId} snapshot must parse`).not.toBeNull();
        expect(parsed?.nodes).toHaveLength(definition.nodes.length);
        expect(parsed?.version).toBe(definition.version);
      },
    );
  });

  it("keeps optional human skip and agent skip conditions", () => {
    const parsed = parseOfficialWorkflowDefinitionSnapshot({
      templateId: "demo",
      version: 3,
      capabilityName: "Demo",
      nodes: [
        {
          id: "human_0",
          kind: "human",
          title: "Optional checkpoint",
          instructions: "Reply or skip.",
          allowSkip: true,
        },
        {
          id: "agent_0",
          kind: "agent",
          title: "Conditional step",
          promptSection: "Only when asked.",
          skipWhenPriorResponseMatches: ["approve"],
        },
      ],
    });

    expect(parsed?.nodes[0]).toMatchObject({ allowSkip: true });
    expect(parsed?.nodes[1]).toMatchObject({
      skipWhenPriorResponseMatches: ["approve"],
    });
  });

  it("rejects snapshots without usable nodes or version", () => {
    expect(
      parseOfficialWorkflowDefinitionSnapshot({
        templateId: "demo",
        version: 0,
        capabilityName: "Demo",
        nodes: [],
      }),
    ).toBeNull();
    expect(
      parseOfficialWorkflowDefinitionSnapshot({
        templateId: "demo",
        version: 2,
        capabilityName: "Demo",
        nodes: [],
      }),
    ).toBeNull();
  });
});
