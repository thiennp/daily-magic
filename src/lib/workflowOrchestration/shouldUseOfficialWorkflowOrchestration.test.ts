import { describe, expect, it } from "vitest";

import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { shouldUseOfficialWorkflowOrchestration } from "@/lib/workflowOrchestration/shouldUseOfficialWorkflowOrchestration";

describe("shouldUseOfficialWorkflowOrchestration", () => {
  it("returns false when capability is null", () => {
    expect(shouldUseOfficialWorkflowOrchestration(null)).toBe(false);
  });

  it("returns false for agent capabilities", () => {
    expect(
      shouldUseOfficialWorkflowOrchestration({
        type: CapabilityType.AGENT,
        harnessSetSlug: "template-weekly-team-status",
      }),
    ).toBe(false);
  });

  it("returns false for workflows without official template harness slug", () => {
    expect(
      shouldUseOfficialWorkflowOrchestration({
        type: CapabilityType.WORKFLOW,
        harnessSetSlug: "custom-harness",
      }),
    ).toBe(false);
  });

  it("returns true for official preset workflow harness slugs", () => {
    expect(
      shouldUseOfficialWorkflowOrchestration({
        type: CapabilityType.WORKFLOW,
        harnessSetSlug: "template-vibe-coding-app-feature",
      }),
    ).toBe(true);
  });
});
