import { beforeEach, describe, expect, it, vi } from "vitest";

const scheduleMock = vi.hoisted(() =>
  vi.fn(async (_input: unknown) => ({ scheduled: true })),
);
const getProjectMock = vi.hoisted(() => vi.fn());
const sqlMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: (id: unknown) => getProjectMock(id),
}));
vi.mock("@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify", () => ({
  scheduleProjectUpdatedNotify: (input: unknown) => scheduleMock(input),
}));

import { updateUserProjectFolderPath } from "@/lib/projects/updateUserProjectFolderPath";

describe("updateUserProjectFolderPath notify hook", () => {
  beforeEach(() => {
    scheduleMock.mockClear();
    getProjectMock.mockReset();
    sqlMock.mockReset();
  });

  it("schedules project_info after success when path changes", async () => {
    getProjectMock.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
      folderPath: "/old",
    });
    sqlMock.mockResolvedValueOnce([
      {
        id: "proj-1",
        owner_user_id: "owner-1",
        name: "P",
        device_id: "dev-1",
        folder_path: "/new",
        repo_urls: [],
        default_branch: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    await expect(
      updateUserProjectFolderPath("owner-1", "proj-1", "/new", "dev-1"),
    ).resolves.not.toBeNull();
    expect(sqlMock).toHaveBeenCalledTimes(1);
    expect(scheduleMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      fields: ["project_info"],
      actorUserId: "owner-1",
    });
  });

  it("skips write and schedule when folder path is unchanged", async () => {
    getProjectMock.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
      folderPath: "/same",
      deviceId: "dev-old",
    });
    const result = await updateUserProjectFolderPath(
      "owner-1",
      "proj-1",
      "/same",
      "dev-new",
    );
    expect(result).toEqual(
      expect.objectContaining({ id: "proj-1", folderPath: "/same" }),
    );
    expect(sqlMock).not.toHaveBeenCalled();
    expect(scheduleMock).not.toHaveBeenCalled();
  });

  it("does not schedule before a failed ownership check", async () => {
    getProjectMock.mockResolvedValue(null);
    await expect(
      updateUserProjectFolderPath("owner-1", "proj-1", "/new", "dev-1"),
    ).resolves.toBeNull();
    expect(scheduleMock).not.toHaveBeenCalled();
  });
});
