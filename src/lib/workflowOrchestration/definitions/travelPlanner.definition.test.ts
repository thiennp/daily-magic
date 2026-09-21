import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { OFFICIAL_WORKFLOW_DEFINITION } from "@/lib/workflowOrchestration/definitions/travelPlanner.definition";

describe("travel-planner official workflow definition", () => {
  it("matches marketplace template and ends on human review", () => {
    const template = findCapabilityTemplateById("travel-planner");
    expect(template?.type).toBe("workflow");
    expect(OFFICIAL_WORKFLOW_DEFINITION.templateId).toBe("travel-planner");
    expect(OFFICIAL_WORKFLOW_DEFINITION.nodes.at(-1)?.kind).toBe("human");
  });
});
