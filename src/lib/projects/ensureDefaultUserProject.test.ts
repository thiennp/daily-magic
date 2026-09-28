import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
  getSql: () => sqlMock,
}));

import { ensureDefaultUserProject } from "@/lib/projects/ensureDefaultUserProject";
import { createUserProject } from "@/lib/projects/userProjectMutations";

const projectRow = {
  id: "project-1",
  owner_user_id: "user-1",
  device_id: "device-1",
  name: "Default",
  folder_path: "/tmp/default",
  last_used_at: null,
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
};

describe("ensureDefaultUserProject", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("does not create a default project when no Mac is linked", async () => {
    const project = await ensureDefaultUserProject(
      "user-1",
      "owner@example.com",
      null,
    );

    expect(project).toBeNull();
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("returns the default project already linked to that Mac", async () => {
    sqlMock.mockResolvedValueOnce([projectRow]);

    const project = await ensureDefaultUserProject(
      "user-1",
      "owner@example.com",
      "device-1",
    );

    expect(project?.id).toBe("project-1");
    expect(sqlMock).toHaveBeenCalledTimes(1);
  });

  it("creates a default project linked to the Mac", async () => {
    sqlMock.mockResolvedValueOnce([]).mockResolvedValueOnce([projectRow]);

    const project = await ensureDefaultUserProject(
      "user-1",
      "owner@example.com",
      " device-1 ",
    );

    expect(project?.deviceId).toBe("device-1");
    expect(sqlMock).toHaveBeenCalledTimes(2);
  });

  it("fails when the linked default project cannot be saved", async () => {
    sqlMock.mockResolvedValueOnce([]).mockResolvedValueOnce([]);

    await expect(
      ensureDefaultUserProject("user-1", "owner@example.com", "device-1"),
    ).rejects.toThrow("Could not create the default project.");
  });
});

describe("createUserProject without a Mac", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("does not insert a project that has no Mac", async () => {
    const project = await createUserProject("user-1", {
      name: "Default",
      folderPath: "/tmp/default",
      deviceId: "  ",
    });

    expect(project).toBeNull();
    expect(sqlMock).not.toHaveBeenCalled();
  });
});
