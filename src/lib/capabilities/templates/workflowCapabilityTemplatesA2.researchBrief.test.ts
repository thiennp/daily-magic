import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("research-brief workflow", () => {
  it("is registered with three operator checkpoints and structured example request", () => {
    const template = findCapabilityTemplateById("research-brief");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Research brief");
    expect(template?.category).toBe("Research");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "topic",
      "audience",
      "questions",
      "sources",
    ]);
    expect(
      template.workflowFields.find((field) => field.key === "sources")
        ?.required,
    ).toBe(false);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm topic, audience, and questions",
      "Answer clarifying questions and add sources",
      "Review the research brief before you share it",
    ]);

    expect(template.exampleRequest).toContain("Frame scope and clarify");
    expect(template.exampleRequest).toContain("Synthesize the brief");
    expect(template.exampleRequest).toContain("confidence");
  });
});
