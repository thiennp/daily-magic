import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("freelancer-client-proposal workflow", () => {
  it("is registered with portfolio path and three operator checkpoints", () => {
    const template = findCapabilityTemplateById("freelancer-client-proposal");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Freelancer client proposal");
    expect(template?.category).toBe("Freelance");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    const historyField = template.workflowFields.find(
      (field) => field.key === "proposalHistoryPath",
    );
    expect(historyField?.required).toBe(false);
    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "clientName",
      "projectBrief",
      "portfolioFolderPath",
      "budgetRange",
      "proposalHistoryPath",
    ]);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm the client brief and portfolio fit",
      "Approve the proposal before sending",
      "Send the proposal through your channel",
    ]);

    expect(template.exampleRequest).toContain("Brief and portfolio fit");
    expect(template.exampleRequest).toContain("Draft proposal");
    expect(template.exampleRequest).toContain("Finalize after approval");
    expect(template.exampleRequest).toContain("portfolioFolderPath");
  });
});
