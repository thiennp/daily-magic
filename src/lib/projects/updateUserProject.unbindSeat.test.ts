import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
const setLinked = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/setUserProjectLinkedDevice", () => ({
  setUserProjectLinkedDevice: setLinked,
}));
vi.mock("@/lib/projects/acl/syncProjectComputerMembership", () => ({
  syncProjectComputerMembership: vi.fn(async () => undefined),
}));

import { updateUserProject } from "@/lib/projects/userProjectMutations";

const existingRow = {
  id: "proj-1",
  owner_user_id: "owner-1",
  device_id: "dev-1",
  name: "infusion",
  folder_path: "/p",
  repo_urls: [],
  default_branch: null,
  last_used_at: null,
  created_at: "2026-10-05T00:00:00.000Z",
  updated_at: "2026-10-05T00:00:00.000Z",
};

describe("updateUserProject device bind/unbind via choke", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    setLinked.mockReset();
    setLinked.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
      deviceId: null,
      name: "infusion",
      folderPath: "/p",
      repoUrls: [],
      defaultBranch: null,
      lastUsedAt: null,
      createdAt: "2026-10-05T00:00:00.000Z",
      updatedAt: "2026-10-05T00:00:00.000Z",
    });
  });

  it("unbind routes deviceId null through setUserProjectLinkedDevice", async () => {
    sqlMock
      .mockResolvedValueOnce([existingRow])
      .mockResolvedValueOnce([existingRow]);

    await updateUserProject("owner-1", "proj-1", { deviceId: null });

    expect(setLinked).toHaveBeenCalledWith({
      ownerUserId: "owner-1",
      projectId: "proj-1",
      deviceId: null,
    });
  });

  it("rebind routes new deviceId through setUserProjectLinkedDevice", async () => {
    sqlMock
      .mockResolvedValueOnce([existingRow])
      .mockResolvedValueOnce([existingRow]);
    setLinked.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
      deviceId: "dev-2",
      name: "infusion",
      folderPath: "/p",
      repoUrls: [],
      defaultBranch: null,
      lastUsedAt: null,
      createdAt: "2026-10-05T00:00:00.000Z",
      updatedAt: "2026-10-05T00:00:00.000Z",
    });

    await updateUserProject("owner-1", "proj-1", { deviceId: "dev-2" });

    expect(setLinked).toHaveBeenCalledWith({
      ownerUserId: "owner-1",
      projectId: "proj-1",
      deviceId: "dev-2",
    });
  });
});
