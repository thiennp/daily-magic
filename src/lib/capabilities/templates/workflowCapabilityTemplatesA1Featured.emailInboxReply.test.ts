import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("email-inbox-reply workflow", () => {
  it("is registered with knowledge fields and four operator checkpoints", () => {
    const template = findCapabilityTemplateById("email-inbox-reply");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Email inbox reply");
    expect(template?.category).toBe("Communication");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "knowledgeFolderPath",
      "inboxFocus",
      "replyTone",
      "signatureBlock",
      "answeredLogPath",
    ]);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Open your inbox in the browser",
      "Confirm the knowledge folder on your Mac",
      "Approve each reply before it is sent",
      "Confirm sends and answered log",
    ]);

    expect(template.exampleRequest).toContain("Index knowledge and triage");
    expect(template.exampleRequest).toContain("Draft grounded replies");
    expect(template.exampleRequest).toContain("knowledgeFolderPath");
  });
});
