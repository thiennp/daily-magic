import { describe, expect, it } from "vitest";

import { HOME_RECENT_PROJECTS_LIMIT } from "@/features/home/constants/homeRecentProjectsLimit.constant";
import selectHomeRecentProjects from "@/features/home/utils/selectHomeRecentProjects";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const buildProject = (
  id: string,
  overrides: Partial<UserProjectRecord> = {},
): UserProjectRecord => ({
  id,
  ownerUserId: "user-1",
  deviceId: null,
  name: `Project ${id}`,
  folderPath: `/repos/${id}`,
  repoUrls: [],
  defaultBranch: null,
  lastUsedAt: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  ...overrides,
});

const ids = (projects: readonly UserProjectRecord[]): string[] =>
  projects.map((project) => project.id);

describe("selectHomeRecentProjects", () => {
  it("uses a home limit of 4", () => {
    expect(HOME_RECENT_PROJECTS_LIMIT).toBe(4);
  });

  it("returns the 4 projects with the newest lastUsedAt, newest first", () => {
    const projects = [
      buildProject("a", { lastUsedAt: "2026-09-01T10:00:00.000Z" }),
      buildProject("b", { lastUsedAt: "2026-10-04T10:00:00.000Z" }),
      buildProject("c", { lastUsedAt: "2026-08-01T10:00:00.000Z" }),
      buildProject("d", { lastUsedAt: "2026-10-05T07:00:00.000Z" }),
      buildProject("e", { lastUsedAt: "2026-10-01T10:00:00.000Z" }),
    ];

    expect(ids(selectHomeRecentProjects(projects))).toEqual(["d", "b", "e", "a"]);
  });

  it("ranks lastUsedAt above a newer updatedAt (activity beats edits)", () => {
    const projects = [
      buildProject("edited", {
        lastUsedAt: "2026-09-01T00:00:00.000Z",
        updatedAt: "2026-10-05T00:00:00.000Z",
      }),
      buildProject("used", {
        lastUsedAt: "2026-10-01T00:00:00.000Z",
        updatedAt: "2026-10-01T00:00:00.000Z",
      }),
    ];

    expect(ids(selectHomeRecentProjects(projects))).toEqual(["used", "edited"]);
  });

  it("breaks equal lastUsedAt ties by updatedAt, then createdAt, then id", () => {
    const same = "2026-10-01T00:00:00.000Z";
    const projects = [
      buildProject("z-old-update", {
        lastUsedAt: same,
        updatedAt: "2026-09-01T00:00:00.000Z",
      }),
      buildProject("y-new-update", {
        lastUsedAt: same,
        updatedAt: "2026-09-30T00:00:00.000Z",
      }),
      buildProject("m", {
        lastUsedAt: same,
        updatedAt: "2026-09-01T00:00:00.000Z",
        createdAt: "2026-02-01T00:00:00.000Z",
      }),
      buildProject("b-tie", {
        lastUsedAt: same,
        updatedAt: "2026-09-01T00:00:00.000Z",
      }),
    ];

    expect(ids(selectHomeRecentProjects(projects))).toEqual([
      "y-new-update",
      "m",
      "b-tie",
      "z-old-update",
    ]);
  });

  it("is deterministic regardless of input order for full ties", () => {
    const projects = ["c", "a", "b", "d"].map((id) => buildProject(id));

    expect(ids(selectHomeRecentProjects(projects))).toEqual(["a", "b", "c", "d"]);
    expect(ids(selectHomeRecentProjects([...projects].reverse()))).toEqual([
      "a",
      "b",
      "c",
      "d",
    ]);
  });
});
