import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("tenant-support-reply workflow", () => {
  it("is registered with required tenant fields and three operator checkpoints", () => {
    const template = findCapabilityTemplateById("tenant-support-reply");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Tenant support reply");
    expect(template?.category).toBe("Property");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "propertyName",
      "tenantMessage",
      "leaseNotesPath",
      "issueType",
      "replyTone",
      "tenantLogPath",
    ]);

    const replyTone = template.workflowFields.find(
      (field) => field.key === "replyTone",
    );
    expect(replyTone?.required).toBe(false);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Read the tenant message and lease notes",
      "Approve the reply before sending",
      "Send through your property portal",
    ]);

    expect(template.exampleRequest).toContain("Triage and draft");
    expect(template.exampleRequest).toContain("Revise or prepare log");
    expect(template.exampleRequest).not.toContain("[[AWAITING_INPUT]]");
  });
});
