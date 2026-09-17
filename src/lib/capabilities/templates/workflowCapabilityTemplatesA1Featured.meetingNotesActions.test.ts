import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("meeting-notes-actions workflow", () => {
  it("is registered with optional attendees and four operator checkpoints", () => {
    const template = findCapabilityTemplateById("meeting-notes-actions");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Meeting notes → actions");
    expect(template?.category).toBe("Communication");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    const attendees = template.workflowFields.find(
      (field) => field.key === "attendees",
    );
    expect(attendees?.required).toBe(false);
    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "meetingTitle",
      "attendees",
      "notes",
    ]);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm meeting title and raw notes",
      "Answer clarifying questions",
      "Correct owners and due dates in the draft",
      "Review before you share",
    ]);

    expect(template.exampleRequest).toContain("Clarify gaps");
    expect(template.exampleRequest).toContain("Action | Owner | Due");
    expect(template.exampleRequest).toContain("Open questions");
  });
});
