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

vi.mock("@/lib/capabilities/bindPublishedCapabilityToProjectOrCompensate", () => ({
  default: vi.fn(),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  listUserProjectsForOwner: vi.fn(),
}));

import {
  listPublishedCapabilitiesForOwner,
  ownerHasArchivedCapabilityNamed,
} from "@/lib/capabilities/capabilityQueries";
import bindPublishedCapabilityToProjectOrCompensate from "@/lib/capabilities/bindPublishedCapabilityToProjectOrCompensate";
import { createPublishedCapability } from "@/lib/capabilities/createPublishedCapability";
import ensureSampleWorkflowCapability from "@/lib/capabilities/ensureSampleWorkflowCapability";
import { publishCapabilityVersion } from "@/lib/capabilities/publishCapabilityVersion";
import { SAMPLE_WORKFLOW_CAPABILITY_NAME } from "@/lib/capabilities/sampleWorkflowCapability.constant";
import { listUserProjectsForOwner } from "@/lib/projects/userProjectQueries";

describe("ensureSampleWorkflowCapability", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("HOME-022 seeds Sample: Weekly status when the library is empty", async () => {
    vi.mocked(listPublishedCapabilitiesForOwner).mockResolvedValue([]);
    vi.mocked(ownerHasArchivedCapabilityNamed).mockResolvedValue(false);
    vi.mocked(listUserProjectsForOwner).mockResolvedValue([
      { id: "proj-1", name: "Default" },
    ] as never);
    vi.mocked(createPublishedCapability).mockResolvedValue({
      capability: { id: "cap-1", name: SAMPLE_WORKFLOW_CAPABILITY_NAME },
      componentId: "comp-1",
    } as never);
    vi.mocked(publishCapabilityVersion).mockResolvedValue({
      capability: { id: "cap-1", name: SAMPLE_WORKFLOW_CAPABILITY_NAME },
      componentId: "comp-1",
      capabilityVersionId: "cver-1",
      componentVersionId: null,
    } as never);
    vi.mocked(bindPublishedCapabilityToProjectOrCompensate).mockResolvedValue({
      ok: true,
    });

    const result = await ensureSampleWorkflowCapability("user-1");

    expect(createPublishedCapability).toHaveBeenCalledWith(
      expect.objectContaining({
        ownerUserId: "user-1",
        projectId: "proj-1",
        name: SAMPLE_WORKFLOW_CAPABILITY_NAME,
      }),
    );
    expect(publishCapabilityVersion).toHaveBeenCalledWith(
      "cap-1",
      "user-1",
      "Sample workflow",
      "comp-1",
    );
    expect(bindPublishedCapabilityToProjectOrCompensate).toHaveBeenCalled();
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

  it("skips seeding when the owner has no project (069 requires project_id)", async () => {
    vi.mocked(listPublishedCapabilitiesForOwner).mockResolvedValue([]);
    vi.mocked(ownerHasArchivedCapabilityNamed).mockResolvedValue(false);
    vi.mocked(listUserProjectsForOwner).mockResolvedValue([]);

    const result = await ensureSampleWorkflowCapability("user-1");

    expect(result).toBeNull();
    expect(createPublishedCapability).not.toHaveBeenCalled();
  });
});
