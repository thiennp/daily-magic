import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("job-application-pack workflow", () => {
  it("is registered with required career fields and three operator checkpoints", () => {
    const template = findCapabilityTemplateById("job-application-pack");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Job application pack");
    expect(template?.category).toBe("Career");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    const applicationHistory = template.workflowFields.find(
      (field) => field.key === "applicationHistoryPath",
    );
    expect(applicationHistory?.required).toBe(false);
    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "targetRole",
      "companyName",
      "jobPostingUrl",
      "jobDescription",
      "resumeFolderPath",
      "applicationHistoryPath",
    ]);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Open the job posting and confirm facts",
      "Approve resume bullets and cover letter",
      "Submit the application yourself",
    ]);

    expect(template.exampleRequest).toContain(
      "## Map requirements to resume evidence",
    );
    expect(template.exampleRequest).toContain(
      "## Draft tailored bullets and cover letter",
    );
    expect(template.exampleRequest).toContain(
      "## Finalize pack after approval",
    );
    expect(template.exampleRequest).toContain("resumeFolderPath");
  });
});
