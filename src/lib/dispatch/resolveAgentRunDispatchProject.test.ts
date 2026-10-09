import { describe, expect, it, vi } from "vitest";

import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { resolveAgentRunDispatchProject } from "@/lib/dispatch/resolveAgentRunDispatchProject";

const mocks = vi.hoisted(() => ({
  getUserProjectById: vi.fn(),
  checkProjectMembershipStatus: vi.fn(),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: mocks.getUserProjectById,
}));

vi.mock("@/lib/projects/acl/findDeviceProjectFolderPath", () => ({
  findDeviceProjectFolderPath: async () => null,
}));

vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({
  checkProjectMembershipStatus: mocks.checkProjectMembershipStatus,
}));

const baseBody: AgentRunDispatchBody = {
  prompt: "run tests",
};

describe("resolveAgentRunDispatchProject", () => {
  it("rejects dispatch without project_id", async () => {
    const result = await resolveAgentRunDispatchProject({
      body: { ...baseBody, projectFolderPath: "~/Projects/app" },
      requesterUserId: "user-1",
      targetDeviceId: "device-1",
    });

    expect(result).toEqual({
      ok: false,
      errorMessage: "project_id is required.",
      code: "project_required",
      status: 400,
    });
  });

  it("rejects unknown project id", async () => {
    mocks.checkProjectMembershipStatus.mockResolvedValue("none");
    mocks.getUserProjectById.mockResolvedValue(null);

    const result = await resolveAgentRunDispatchProject({
      body: { ...baseBody, projectId: "missing" },
      requesterUserId: "user-1",
      targetDeviceId: "device-1",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("not_found");
      expect(result.errorMessage).toContain("not found");
    }
  });

  it("rejects project bound to another device", async () => {
    mocks.checkProjectMembershipStatus.mockResolvedValue("owner");
    mocks.getUserProjectById.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "user-1",
      deviceId: "other-mac",
      name: "app",
      folderPath: "/Users/me/app",
      repoUrls: [],
      defaultBranch: null,
      lastUsedAt: null,
      createdAt: "",
      updatedAt: "",
    });

    const result = await resolveAgentRunDispatchProject({
      body: { ...baseBody, projectId: "proj-1" },
      requesterUserId: "user-1",
      targetDeviceId: "this-mac",
    });

    expect(result.ok).toBe(false);
  });

  it("resolves folder from cloud project record", async () => {
    mocks.checkProjectMembershipStatus.mockResolvedValue("active");
    mocks.getUserProjectById.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
      deviceId: "this-mac",
      name: "app",
      folderPath: "/Users/me/app",
      repoUrls: [],
      defaultBranch: null,
      lastUsedAt: null,
      createdAt: "",
      updatedAt: "",
    });

    const result = await resolveAgentRunDispatchProject({
      body: {
        ...baseBody,
        projectId: "proj-1",
        projectFolderPath: "/stale/path",
      },
      requesterUserId: "user-1",
      targetDeviceId: "this-mac",
    });

    expect(result).toEqual({
      ok: true,
      projectId: "proj-1",
      projectFolderPath: "/Users/me/app",
    });
  });
});
