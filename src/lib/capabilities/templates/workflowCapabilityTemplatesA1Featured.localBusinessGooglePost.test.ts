import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("local-business-google-post workflow", () => {
  it("is registered with five workflow fields and three operator checkpoints", () => {
    const template = findCapabilityTemplateById("local-business-google-post");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Local business Google post");
    expect(template?.category).toBe("Local");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "businessName",
      "businessType",
      "postTopic",
      "hoursOrOffer",
      "postHistoryPath",
    ]);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Verify hours, offer, and photos",
      "Approve the Google post copy",
      "Publish on Google Business Profile",
    ]);

    expect(template.exampleRequest).toContain("Load history and dedupe");
    expect(template.exampleRequest).toContain("Draft post copy");
    expect(template.exampleRequest).toContain("postHistoryPath");
  });
});
