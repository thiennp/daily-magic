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

const existing = (folderPath: string, deviceId: string) => ({
  id: "proj-1",
  ownerUserId: "owner-1",
  folderPath,
  deviceId,
});

const updatedRow = (folderPath: string, deviceId: string) => [
  {
    id: "proj-1",
    owner_user_id: "owner-1",
    name: "P",
    device_id: deviceId,
    folder_path: folderPath,
    repo_urls: [],
    default_branch: null,
    created_at: "2026-10-05T08:00:00.000Z",
    updated_at: "2026-10-05T08:00:00.000Z",
  },
];

describe("updateUserProjectFolderPath notify hook", () => {
  beforeEach(() => {
    scheduleMock.mockClear();
    getProjectMock.mockReset();
    sqlMock.mockReset();
  });

  it("schedules project_info after success when path changes", async () => {
    getProjectMock.mockResolvedValue(existing("/old", "dev-1"));
    sqlMock.mockResolvedValueOnce(updatedRow("/new", "dev-1"));
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

  it("skips write and schedule when folder path and deviceId are unchanged", async () => {
    getProjectMock.mockResolvedValue(existing("/same", "dev-old"));
    const result = await updateUserProjectFolderPath(
      "owner-1",
      "proj-1",
      "/same",
      "dev-old",
    );
    expect(result).toEqual(
      expect.objectContaining({ id: "proj-1", folderPath: "/same" }),
    );
    expect(sqlMock).not.toHaveBeenCalled();
    expect(scheduleMock).not.toHaveBeenCalled();
  });

  it("writes deviceId and skips schedule when path is same but device is new", async () => {
    getProjectMock.mockResolvedValue(existing("/same", "dev-old"));
    sqlMock.mockResolvedValueOnce(updatedRow("/same", "dev-new"));
    const result = await updateUserProjectFolderPath(
      "owner-1",
      "proj-1",
      "/same",
      "dev-new",
    );
    expect(result).toEqual(
      expect.objectContaining({
        id: "proj-1",
        folderPath: "/same",
        deviceId: "dev-new",
      }),
    );
    expect(sqlMock).toHaveBeenCalledTimes(1);
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
