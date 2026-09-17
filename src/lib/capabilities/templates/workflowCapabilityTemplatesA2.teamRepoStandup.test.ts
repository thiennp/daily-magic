import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("team-repo-standup workflow", () => {
  it("is registered with project path field and three operator checkpoints", () => {
    const template = findCapabilityTemplateById("team-repo-standup");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("Repo branch standup (teammate Mac)");
    expect(template?.category).toBe("Team dispatch");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    expect(template.workflowFields.map((field) => field.key)).toEqual([
      "repoPath",
      "branch",
      "since",
    ]);
    expect(
      template.workflowFields.find((field) => field.key === "since")?.required,
    ).toBe(false);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Prepare repo path and branch fields",
      "Confirm standup scope",
      "Review before you share",
    ]);

    expect(template.exampleRequest).toContain(
      "Resolve repo and collect git facts",
    );
    expect(template.exampleRequest).toContain("Draft standup bullets");
    expect(template.exampleRequest).toContain("repoPath");
  });
});
