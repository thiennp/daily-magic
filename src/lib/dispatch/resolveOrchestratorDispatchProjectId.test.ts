import { beforeEach, describe, expect, it, vi } from "vitest";

import { CURSOR_CLOUD_EXECUTOR_DEVICE_ID } from "@/lib/cursorCloud/cursorCloudExecutorDeviceId.constant";
import { resolveOrchestratorDispatchProjectId } from "@/lib/dispatch/resolveOrchestratorDispatchProjectId";

const mocks = vi.hoisted(() => ({
  ensureDefaultUserProject: vi.fn(),
  getUserById: vi.fn(),
}));

vi.mock("@/lib/projects/ensureDefaultUserProject", () => ({
  ensureDefaultUserProject: mocks.ensureDefaultUserProject,
}));

vi.mock("@/lib/auth/userRepository", () => ({
  getUserById: mocks.getUserById,
}));

describe("resolveOrchestratorDispatchProjectId", () => {
  beforeEach(() => {
    mocks.ensureDefaultUserProject.mockReset();
    mocks.getUserById.mockReset();
  });

  it("prefers the first domain-bound project id", async () => {
    const id = await resolveOrchestratorDispatchProjectId({
      ownerUserId: "u1",
      boundProjectIds: [null, "  ", "proj-auto", "proj-cap"],
      deviceIds: ["mac-1"],
    });

    expect(id).toBe("proj-auto");
    expect(mocks.ensureDefaultUserProject).not.toHaveBeenCalled();
  });

  it("falls back to the owner's Default on the run computer", async () => {
    mocks.ensureDefaultUserProject.mockResolvedValue({ id: "proj-default" });

    const id = await resolveOrchestratorDispatchProjectId({
      ownerUserId: "u1",
      ownerEmail: "owner@example.com",
      boundProjectIds: [null],
      deviceIds: [CURSOR_CLOUD_EXECUTOR_DEVICE_ID, "mac-1"],
    });

    expect(id).toBe("proj-default");
    expect(mocks.ensureDefaultUserProject).toHaveBeenCalledWith(
      "u1",
      "owner@example.com",
      "mac-1",
    );
    expect(mocks.getUserById).not.toHaveBeenCalled();
  });

  it("looks up the owner email when the caller has none", async () => {
    mocks.getUserById.mockResolvedValue({ email: "db@example.com" });
    mocks.ensureDefaultUserProject.mockResolvedValue({ id: "proj-default" });

    const id = await resolveOrchestratorDispatchProjectId({
      ownerUserId: "u1",
      boundProjectIds: [],
      deviceIds: ["mac-1"],
    });

    expect(id).toBe("proj-default");
    expect(mocks.ensureDefaultUserProject).toHaveBeenCalledWith(
      "u1",
      "db@example.com",
      "mac-1",
    );
  });

  it("returns null without a real computer (Default needs a device)", async () => {
    const id = await resolveOrchestratorDispatchProjectId({
      ownerUserId: "u1",
      ownerEmail: "owner@example.com",
      boundProjectIds: [],
      deviceIds: [null, CURSOR_CLOUD_EXECUTOR_DEVICE_ID],
    });

    expect(id).toBeNull();
    expect(mocks.ensureDefaultUserProject).not.toHaveBeenCalled();
  });

  it("returns null instead of throwing when Default setup fails", async () => {
    mocks.ensureDefaultUserProject.mockRejectedValue(new Error("db down"));

    await expect(
      resolveOrchestratorDispatchProjectId({
        ownerUserId: "u1",
        ownerEmail: "owner@example.com",
        boundProjectIds: [],
        deviceIds: ["mac-1"],
      }),
    ).resolves.toBeNull();
  });
});
