import { describe, expect, it } from "vitest";

import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import shouldSeedSampleWorkflow from "@/lib/capabilities/shouldSeedSampleWorkflow";

describe("shouldSeedSampleWorkflow", () => {
  it("seeds when the owner has no active workflows and never deleted the sample", () => {
    expect(
      shouldSeedSampleWorkflow({
        capabilities: [
          { type: CapabilityType.AGENT, status: CapabilityStatus.PUBLISHED },
        ],
        archivedSampleExists: false,
      }),
    ).toBe(true);
  });

  it("does not seed when a workflow already exists", () => {
    expect(
      shouldSeedSampleWorkflow({
        capabilities: [
          { type: CapabilityType.WORKFLOW, status: CapabilityStatus.PUBLISHED },
        ],
        archivedSampleExists: false,
      }),
    ).toBe(false);
  });

  it("does not seed after the sample was archived", () => {
    expect(
      shouldSeedSampleWorkflow({
        capabilities: [],
        archivedSampleExists: true,
      }),
    ).toBe(false);
  });
});
