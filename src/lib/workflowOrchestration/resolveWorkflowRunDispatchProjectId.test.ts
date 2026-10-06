import { beforeEach, describe, expect, it, vi } from "vitest";

import type WorkflowRunRecord from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";
import { resolveWorkflowRunDispatchProjectId } from "@/lib/workflowOrchestration/resolveWorkflowRunDispatchProjectId";

const mocks = vi.hoisted(() => ({
  getPublishedCapabilityById: vi.fn(),
  ensureDefaultUserProject: vi.fn(),
}));

vi.mock("@/lib/capabilities/capabilityQueries", () => ({
  getPublishedCapabilityById: mocks.getPublishedCapabilityById,
}));
vi.mock("@/lib/projects/ensureDefaultUserProject", () => ({
  ensureDefaultUserProject: mocks.ensureDefaultUserProject,
}));
vi.mock("@/lib/auth/userRepository", () => ({ getUserById: vi.fn() }));

const run = {
  id: "wr-1",
  requesterUserId: "u1",
  capabilityId: "cap-1",
  deviceId: "mac-run",
} as unknown as WorkflowRunRecord;

const resolve = (dispatchBodyBase: Record<string, string>) =>
  resolveWorkflowRunDispatchProjectId({
    run,
    requesterUserId: "u1",
    requesterEmail: "owner@example.com",
    dispatchBodyBase,
  });

describe("resolveWorkflowRunDispatchProjectId", () => {
  beforeEach(() => {
    mocks.getPublishedCapabilityById.mockReset();
    mocks.ensureDefaultUserProject.mockReset();
  });

  it("keeps an explicit projectId from the start body", async () => {
    await expect(resolve({ projectId: "proj-body" })).resolves.toBe(
      "proj-body",
    );
    expect(mocks.getPublishedCapabilityById).not.toHaveBeenCalled();
  });

  it("uses the workflow capability's project", async () => {
    mocks.getPublishedCapabilityById.mockResolvedValue({
      projectId: "proj-cap",
    });
    await expect(resolve({})).resolves.toBe("proj-cap");
  });

  it("falls back to Default on the step computer, then the run computer", async () => {
    mocks.getPublishedCapabilityById.mockRejectedValue(new Error("db"));
    mocks.ensureDefaultUserProject.mockResolvedValue({ id: "proj-default" });
    await expect(resolve({ targetDeviceId: "mac-step" })).resolves.toBe(
      "proj-default",
    );
    expect(mocks.ensureDefaultUserProject).toHaveBeenCalledWith(
      "u1",
      "owner@example.com",
      "mac-step",
    );

    await resolve({});
    expect(mocks.ensureDefaultUserProject).toHaveBeenLastCalledWith(
      "u1",
      "owner@example.com",
      "mac-run",
    );
  });
});
