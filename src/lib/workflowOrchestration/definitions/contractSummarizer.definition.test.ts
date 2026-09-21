import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { OFFICIAL_WORKFLOW_DEFINITION } from "@/lib/workflowOrchestration/definitions/contractSummarizer.definition";

describe("contract-summarizer official workflow definition", () => {
  it("matches marketplace template and ends on human review", () => {
    const template = findCapabilityTemplateById("contract-summarizer");
    expect(template?.type).toBe("workflow");
    expect(OFFICIAL_WORKFLOW_DEFINITION.templateId).toBe("contract-summarizer");
    expect(OFFICIAL_WORKFLOW_DEFINITION.nodes.at(-1)?.kind).toBe("human");
    expect(
      OFFICIAL_WORKFLOW_DEFINITION.nodes.some((node) => node.kind === "agent"),
    ).toBe(true);
  });
});
