import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

import {
  listUserProjectsForMember,
  listUserProjectsForOwner,
} from "@/lib/projects/userProjectQueries";

const row = (extra: Record<string, unknown> = {}) => ({
  id: "p1",
  owner_user_id: "owner",
  device_id: "d1",
  name: "Project",
  folder_path: "/Users/owner/code/project",
  repo_urls: [],
  default_branch: null,
  last_used_at: null,
  created_at: "2026-10-09T00:00:00.000Z",
  updated_at: "2026-10-09T00:00:00.000Z",
  ...extra,
});

describe("project list visibility", () => {
  beforeEach(() => sqlMock.mockReset());

  it("the owner keeps their own folder path", async () => {
    sqlMock.mockResolvedValue([row()]);
    const [project] = await listUserProjectsForOwner("owner");
    expect(project.folderPath).toBe("/Users/owner/code/project");
    expect(project.viewerRole).toBeUndefined();
  });

  it("a member gets no folder path and carries their role", async () => {
    sqlMock.mockResolvedValue([
      row({ viewer_role: "viewer" }),
      row({ id: "p2", viewer_role: "member" }),
    ]);
    const projects = await listUserProjectsForMember("someone");
    expect(projects.map((p) => p.folderPath)).toEqual(["", ""]);
    expect(projects.map((p) => p.viewerRole)).toEqual(["viewer", "member"]);
  });
});
