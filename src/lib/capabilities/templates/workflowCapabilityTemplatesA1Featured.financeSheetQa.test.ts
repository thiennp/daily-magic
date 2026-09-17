import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("finance-sheet-qa workflow", () => {
  it("is registered with finance fields and four operator checkpoints", () => {
    const template = findCapabilityTemplateById("finance-sheet-qa");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Finance sheet Q&A");
    expect(template?.category).toBe("Finance");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "sheetUrl",
      "sheetSummary",
      "userQuestion",
      "tabOrRange",
      "notesPath",
    ]);

    const tabOrRange = template.workflowFields.find(
      (field) => field.key === "tabOrRange",
    );
    expect(tabOrRange?.required).toBe(false);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps).toHaveLength(4);
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Open the Google Sheet in Chrome",
      "Show the right tab and range",
      "Answer follow-up questions in the live terminal",
      "Review cited answers before you close the sheet",
    ]);

    expect(template.exampleRequest).toContain("## 1. Orient in the workbook");
    expect(template.exampleRequest).toContain("## 2. Analyze and answer");
    expect(template.exampleRequest).toContain("## 3. Follow-up Q&A");
  });
});
