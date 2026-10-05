import { describe, expect, it } from "vitest";

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

describe("selectHomeRecentProjects missing data and small lists", () => {
  it("sorts missing or unparseable lastUsedAt after real activity", () => {
    const projects = [
      buildProject("never-used", { updatedAt: "2026-10-05T00:00:00.000Z" }),
      buildProject("garbage", {
        lastUsedAt: "not-a-date",
        updatedAt: "2026-10-04T00:00:00.000Z",
      }),
      buildProject("used-long-ago", { lastUsedAt: "2025-01-01T00:00:00.000Z" }),
      buildProject("empty", { lastUsedAt: "" }),
    ];

    expect(ids(selectHomeRecentProjects(projects))).toEqual([
      "used-long-ago",
      "never-used",
      "garbage",
    ]);
  });

  it("returns every project when there are fewer than 3", () => {
    const projects = [
      buildProject("a", { lastUsedAt: "2026-01-01T00:00:00.000Z" }),
      buildProject("b", { lastUsedAt: "2026-02-01T00:00:00.000Z" }),
    ];

    expect(ids(selectHomeRecentProjects(projects))).toEqual(["b", "a"]);
    expect(selectHomeRecentProjects([])).toEqual([]);
  });

  it("does not mutate the input list", () => {
    const projects = [
      buildProject("a", { lastUsedAt: "2026-01-01T00:00:00.000Z" }),
      buildProject("b", { lastUsedAt: "2026-02-01T00:00:00.000Z" }),
    ];
    const snapshot = ids(projects);

    selectHomeRecentProjects(projects);

    expect(ids(projects)).toEqual(snapshot);
  });
});
