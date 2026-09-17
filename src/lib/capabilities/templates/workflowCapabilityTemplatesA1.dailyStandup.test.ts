import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("daily-standup workflow", () => {
  it("is registered with three operator checkpoints and form fields", () => {
    const template = findCapabilityTemplateById("daily-standup");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Daily standup");
    expect(template?.category).toBe("Reporting");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "yesterday",
      "today",
      "blockers",
    ]);
    expect(
      template.workflowFields.find((field) => field.key === "blockers")
        ?.required,
    ).toBe(false);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm yesterday, today, and blockers",
      "Fill in any gaps the agent flagged",
      "Review the standup before you paste",
    ]);

    expect(template.exampleRequest).toContain("## 1. Validate inputs");
    expect(template.exampleRequest).toContain("## 2. Format for async chat");
    expect(template.exampleRequest).toMatch(/80–120 words/);
  });
});
