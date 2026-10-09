import { describe, expect, it, vi } from "vitest";

import { resolveAgentRunDispatchProject } from "@/lib/dispatch/resolveAgentRunDispatchProject";

const mocks = vi.hoisted(() => ({
  getUserProjectById: vi.fn(),
  checkProjectMembershipStatus: vi.fn(),
  findDeviceProjectFolderPath: vi.fn(),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: mocks.getUserProjectById,
}));
vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({
  checkProjectMembershipStatus: mocks.checkProjectMembershipStatus,
}));
vi.mock("@/lib/projects/acl/findDeviceProjectFolderPath", () => ({
  findDeviceProjectFolderPath: mocks.findDeviceProjectFolderPath,
}));

describe("resolveAgentRunDispatchProject device folder", () => {
  it("uses the folder the target computer registered for the project", async () => {
    mocks.checkProjectMembershipStatus.mockResolvedValue("owner");
    mocks.getUserProjectById.mockResolvedValue({
      id: "p1",
      deviceId: "owner-device",
      folderPath: "/Users/owner/app",
    });
    mocks.findDeviceProjectFolderPath.mockResolvedValue("/Users/me/app");

    const result = await resolveAgentRunDispatchProject({
      body: { prompt: "run tests", projectId: "p1" },
      requesterUserId: "user-1",
      targetDeviceId: "my-device",
    });

    expect(result).toEqual({
      ok: true,
      projectId: "p1",
      projectFolderPath: "/Users/me/app",
    });
  });
});
