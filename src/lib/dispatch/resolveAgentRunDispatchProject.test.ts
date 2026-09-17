import { describe, expect, it, vi } from "vitest";

import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { resolveAgentRunDispatchProject } from "@/lib/dispatch/resolveAgentRunDispatchProject";

const mocks = vi.hoisted(() => ({
  getUserProjectById: vi.fn(),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: mocks.getUserProjectById,
}));

const baseBody: AgentRunDispatchBody = {
  prompt: "run tests",
};

describe("resolveAgentRunDispatchProject", () => {
  it("allows legacy dispatch with folder path only", async () => {
    const result = await resolveAgentRunDispatchProject({
      body: { ...baseBody, projectFolderPath: "~/Projects/app" },
      requesterUserId: "user-1",
      targetDeviceId: "device-1",
    });

    expect(result).toEqual({
      ok: true,
      projectId: "",
      projectFolderPath: "~/Projects/app",
    });
  });

  it("rejects unknown project id", async () => {
    mocks.getUserProjectById.mockResolvedValue(null);

    const result = await resolveAgentRunDispatchProject({
      body: { ...baseBody, projectId: "missing" },
      requesterUserId: "user-1",
      targetDeviceId: "device-1",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errorMessage).toContain("not found");
    }
  });

  it("rejects project bound to another device", async () => {
    mocks.getUserProjectById.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "user-1",
      deviceId: "other-mac",
      name: "app",
      folderPath: "/Users/me/app",
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
    mocks.getUserProjectById.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "user-1",
      deviceId: "this-mac",
      name: "app",
      folderPath: "/Users/me/app",
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
