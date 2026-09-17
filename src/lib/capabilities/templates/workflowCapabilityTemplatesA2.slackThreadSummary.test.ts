import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("slack-thread-summary workflow", () => {
  it("is registered with optional audience and three operator checkpoints", () => {
    const template = findCapabilityTemplateById("slack-thread-summary");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Slack thread summary");
    expect(template?.category).toBe("Communication");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    const audience = template.workflowFields.find(
      (field) => field.key === "audience",
    );
    expect(audience?.required).toBe(false);
    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "thread",
      "audience",
      "goal",
    ]);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm thread paste, audience, and goal",
      "Answer thread ambiguities",
      "Review the summary before you post",
    ]);

    expect(template.exampleRequest).toContain("Parse and clarify");
    expect(template.exampleRequest).toContain("TL;DR");
    expect(template.exampleRequest).toContain("Review gate");
  });
});
