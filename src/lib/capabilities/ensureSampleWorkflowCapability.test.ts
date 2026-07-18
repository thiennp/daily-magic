import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/capabilities/capabilityQueries", () => ({
  listPublishedCapabilitiesForOwner: vi.fn(),
  ownerHasArchivedCapabilityNamed: vi.fn(),
}));

vi.mock("@/lib/capabilities/createPublishedCapability", () => ({
  createPublishedCapability: vi.fn(),
}));

vi.mock("@/lib/capabilities/publishCapabilityVersion", () => ({
  publishCapabilityVersion: vi.fn(),
}));

import {
  listPublishedCapabilitiesForOwner,
  ownerHasArchivedCapabilityNamed,
} from "@/lib/capabilities/capabilityQueries";
import { createPublishedCapability } from "@/lib/capabilities/createPublishedCapability";
import ensureSampleWorkflowCapability from "@/lib/capabilities/ensureSampleWorkflowCapability";
import { publishCapabilityVersion } from "@/lib/capabilities/publishCapabilityVersion";
import { SAMPLE_WORKFLOW_CAPABILITY_NAME } from "@/lib/capabilities/sampleWorkflowCapability.constant";

describe("ensureSampleWorkflowCapability", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("HOME-022 seeds Sample: Weekly status when the library is empty", async () => {
    vi.mocked(listPublishedCapabilitiesForOwner).mockResolvedValue([]);
    vi.mocked(ownerHasArchivedCapabilityNamed).mockResolvedValue(false);
    vi.mocked(createPublishedCapability).mockResolvedValue({
      id: "cap-1",
      name: SAMPLE_WORKFLOW_CAPABILITY_NAME,
    } as never);
    vi.mocked(publishCapabilityVersion).mockResolvedValue({
      id: "cap-1",
      name: SAMPLE_WORKFLOW_CAPABILITY_NAME,
    } as never);

    const result = await ensureSampleWorkflowCapability("user-1");

    expect(createPublishedCapability).toHaveBeenCalled();
    expect(publishCapabilityVersion).toHaveBeenCalledWith(
      "cap-1",
      "user-1",
      "Sample workflow",
    );
    expect(result?.name).toBe(SAMPLE_WORKFLOW_CAPABILITY_NAME);
  });

  it("HOME-022 skips seeding when a workflow already exists", async () => {
    vi.mocked(listPublishedCapabilitiesForOwner).mockResolvedValue([
      { type: "workflow", status: "published" },
    ] as never);
    vi.mocked(ownerHasArchivedCapabilityNamed).mockResolvedValue(false);

    const result = await ensureSampleWorkflowCapability("user-1");

    expect(result).toBeNull();
    expect(createPublishedCapability).not.toHaveBeenCalled();
  });
});
