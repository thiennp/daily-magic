import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("shop-order-support workflow", () => {
  it("is registered with optional tone/log fields and three operator checkpoints", () => {
    const template = findCapabilityTemplateById("shop-order-support");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Shop order support");
    expect(template?.category).toBe("Commerce");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    const replyTone = template.workflowFields.find(
      (field) => field.key === "replyTone",
    );
    const supportLogPath = template.workflowFields.find(
      (field) => field.key === "supportLogPath",
    );
    expect(replyTone?.required).toBe(false);
    expect(supportLogPath?.required).toBe(false);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Open customer messages and order records",
      "Approve each customer reply",
      "Send replies from your shop tools",
    ]);

    expect(template.exampleRequest).toContain("Ground truth and drafts");
    expect(template.exampleRequest).toContain("Finalize for send and logging");
    expect(template.exampleRequest).toContain("supportLogPath");
  });
});
