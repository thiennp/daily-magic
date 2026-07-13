import { describe, expect, it } from "vitest";

import hasUserCreatedFirstWorkflowOrAgent from "@/features/home/utils/hasUserCreatedFirstWorkflowOrAgent";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { DEFAULT_AGENT_CAPABILITY_NAME } from "@/lib/capabilities/defaultAgentCapability.constant";

describe("hasUserCreatedFirstWorkflowOrAgent", () => {
  it("returns true when a workflow exists", () => {
    expect(
      hasUserCreatedFirstWorkflowOrAgent([
        {
          type: CapabilityType.WORKFLOW,
          name: "Weekly report",
        },
      ]),
    ).toBe(true);
  });

  it("returns true for a custom agent but not the auto-seeded default", () => {
    expect(
      hasUserCreatedFirstWorkflowOrAgent([
        {
          type: CapabilityType.AGENT,
          name: DEFAULT_AGENT_CAPABILITY_NAME,
        },
      ]),
    ).toBe(false);

    expect(
      hasUserCreatedFirstWorkflowOrAgent([
        {
          type: CapabilityType.AGENT,
          name: "Research assistant",
        },
      ]),
    ).toBe(true);
  });
});
