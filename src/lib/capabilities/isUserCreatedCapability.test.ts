import { describe, expect, it } from "vitest";

import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { DEFAULT_AGENT_CAPABILITY_NAME } from "@/lib/capabilities/defaultAgentCapability.constant";
import isUserCreatedCapability from "@/lib/capabilities/isUserCreatedCapability";
import { SAMPLE_WORKFLOW_CAPABILITY_NAME } from "@/lib/capabilities/sampleWorkflowCapability.constant";

describe("isUserCreatedCapability", () => {
  it("returns false for the auto-seeded sample workflow", () => {
    expect(
      isUserCreatedCapability({
        type: CapabilityType.WORKFLOW,
        name: SAMPLE_WORKFLOW_CAPABILITY_NAME,
      }),
    ).toBe(false);
  });

  it("returns false for the auto-seeded default agent", () => {
    expect(
      isUserCreatedCapability({
        type: CapabilityType.AGENT,
        name: DEFAULT_AGENT_CAPABILITY_NAME,
      }),
    ).toBe(false);
  });

  it("returns true for a custom workflow or agent", () => {
    expect(
      isUserCreatedCapability({
        type: CapabilityType.WORKFLOW,
        name: "Weekly report",
      }),
    ).toBe(true);
    expect(
      isUserCreatedCapability({
        type: CapabilityType.AGENT,
        name: "Research assistant",
      }),
    ).toBe(true);
  });
});
