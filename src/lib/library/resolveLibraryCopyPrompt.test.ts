import { describe, expect, it } from "vitest";

import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { resolveLibraryCopyPrompt } from "@/lib/library/resolveLibraryCopyPrompt";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

const baseCapability: PublishedCapabilityRecord = {
  id: "cap-1",
  ownerUserId: "user-1",
  name: "Weekly report",
  description: "Summary for leadership",
  exampleRequest: "Use bullet points",
  status: CapabilityStatus.PUBLISHED,
  visibility: "private",
  groupId: null,
  type: CapabilityType.WORKFLOW,
  workflowFields: [
    {
      key: "week_of",
      label: "Week of",
      type: "text",
      required: true,
    },
  ],
  operatorSteps: [],
  forkedFromCapabilityId: null,
  harnessSetSlug: null,
  dispatchPolicyOverride: null,
  currentVersionId: "ver-1",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

describe("resolveLibraryCopyPrompt", () => {
  it("assembles workflow prompts with empty field placeholders", () => {
    const prompt = resolveLibraryCopyPrompt(baseCapability);

    expect(prompt).toContain("Run workflow: Weekly report");
    expect(prompt).toContain("- Week of: (empty)");
    expect(prompt).toContain("Additional instructions:");
    expect(prompt).toContain("Use bullet points");
  });

  it("prefers exampleRequest for agent capabilities", () => {
    const prompt = resolveLibraryCopyPrompt({
      ...baseCapability,
      type: CapabilityType.AGENT,
      exampleRequest: "Research Q3 competitors",
      workflowFields: [],
    });

    expect(prompt).toBe("Research Q3 competitors");
  });
});
