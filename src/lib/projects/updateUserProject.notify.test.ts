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

import { updateUserProject } from "@/lib/projects/updateUserProject";

describe("updateUserProject notify hook", () => {
  beforeEach(() => {
    scheduleMock.mockClear();
    getProjectMock.mockReset();
    sqlMock.mockReset();
  });

  it("schedules repo_urls after a successful repo patch", async () => {
    getProjectMock.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
      name: "P",
      deviceId: "dev-1",
      repoUrls: [],
      defaultBranch: null,
    });
    sqlMock.mockResolvedValueOnce([
      {
        id: "proj-1",
        owner_user_id: "owner-1",
        name: "P",
        device_id: "dev-1",
        folder_path: "/x",
        repo_urls: ["https://example.com/a.git"],
        default_branch: "main",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    const project = await updateUserProject("owner-1", "proj-1", {
      repoUrls: ["https://example.com/a.git"],
      defaultBranch: "main",
    });
    expect(project).not.toBeNull();
    expect(scheduleMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      fields: ["repo_urls"],
      actorUserId: "owner-1",
    });
  });

  it("does not schedule when ownership check fails", async () => {
    getProjectMock.mockResolvedValue({
      id: "proj-1",
      ownerUserId: "other",
    });
    await expect(
      updateUserProject("owner-1", "proj-1", { name: "N" }),
    ).resolves.toBeNull();
    expect(scheduleMock).not.toHaveBeenCalled();
    expect(sqlMock).not.toHaveBeenCalled();
  });
});
