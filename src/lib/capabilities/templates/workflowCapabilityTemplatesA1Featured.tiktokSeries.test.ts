import { describe, expect, it } from "vitest";

import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";

describe("tiktok-series-episode workflow", () => {
  it("is registered with series fields and four operator checkpoints", () => {
    const template = findCapabilityTemplateById("tiktok-series-episode");

    expect(template?.type).toBe(CapabilityType.WORKFLOW);
    expect(template?.name).toBe("TikTok series episode");
    expect(template?.category).toBe("Social");

    if (template?.type !== CapabilityType.WORKFLOW) {
      throw new Error("expected workflow template");
    }

    const episodeNumber = template.workflowFields.find(
      (field) => field.key === "episodeNumber",
    );
    const toneStyle = template.workflowFields.find(
      (field) => field.key === "toneStyle",
    );
    expect(episodeNumber?.required).toBe(false);
    expect(toneStyle?.required).toBe(false);

    const operatorSteps = mapHarnessItemsToOperatorSteps(
      template.harness.items,
    );
    expect(operatorSteps.map((step) => step.title)).toEqual([
      "Confirm the series brief and past episodes",
      "Approve the script before filming",
      "Film and publish on your side",
      "Confirm series history update",
    ]);

    expect(template.exampleRequest).toContain(
      "## 1. Series fit and script draft",
    );
    expect(template.exampleRequest).toContain("## 2. Film-ready pack");
    expect(template.exampleRequest).toContain("seriesHistoryPath");
  });
});
