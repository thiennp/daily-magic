import { beforeEach, describe, expect, it, vi } from "vitest";

const scheduleMock = vi.hoisted(() =>
  vi.fn(async (_input: unknown) => ({ scheduled: true })),
);
const getProjectMock = vi.hoisted(() => vi.fn());
const setLinked = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: (id: unknown) => getProjectMock(id),
}));
vi.mock("@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify", () => ({
  scheduleProjectUpdatedNotify: (input: unknown) => scheduleMock(input),
}));

vi.mock("@/lib/projects/setUserProjectLinkedDevice", () => ({
  setUserProjectLinkedDevice: (input: unknown) => setLinked(input),
}));

import { updateUserProjectFolderPath } from "@/lib/projects/updateUserProjectFolderPath";

const existing = (folderPath: string, deviceId: string) => ({
  id: "proj-1",
  ownerUserId: "owner-1",
  folderPath,
  deviceId,
});

const mapped = (folderPath: string, deviceId: string) => ({
  id: "proj-1",
  ownerUserId: "owner-1",
  deviceId,
  folderPath,
});

describe("updateUserProjectFolderPath notify hook", () => {
  beforeEach(() => {
    scheduleMock.mockClear();
    getProjectMock.mockReset();
    setLinked.mockReset();
  });

  it("schedules project_info after success when path changes", async () => {
    getProjectMock.mockResolvedValue(existing("/old", "dev-1"));
    setLinked.mockResolvedValueOnce(mapped("/new", "dev-1"));
    await expect(
      updateUserProjectFolderPath("owner-1", "proj-1", "/new", "dev-1"),
    ).resolves.not.toBeNull();
    expect(setLinked).toHaveBeenCalledTimes(1);
    expect(setLinked).toHaveBeenCalledWith({
      ownerUserId: "owner-1",
      projectId: "proj-1",
      deviceId: "dev-1",
      folderPath: "/new",
    });
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
    expect(setLinked).not.toHaveBeenCalled();
    expect(scheduleMock).not.toHaveBeenCalled();
  });

  it("writes deviceId and skips schedule when path is same but device is new", async () => {
    getProjectMock.mockResolvedValue(existing("/same", "dev-old"));
    setLinked.mockResolvedValueOnce(mapped("/same", "dev-new"));
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
    expect(setLinked).toHaveBeenCalledWith({
      ownerUserId: "owner-1",
      projectId: "proj-1",
      deviceId: "dev-new",
      folderPath: "/same",
    });
    expect(scheduleMock).not.toHaveBeenCalled();
  });

  it("does not schedule before a failed ownership check", async () => {
    getProjectMock.mockResolvedValue(null);
    await expect(
      updateUserProjectFolderPath("owner-1", "proj-1", "/new", "dev-1"),
    ).resolves.toBeNull();
    expect(setLinked).not.toHaveBeenCalled();
    expect(scheduleMock).not.toHaveBeenCalled();
  });
});
