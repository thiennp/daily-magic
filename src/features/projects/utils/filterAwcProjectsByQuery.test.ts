import { describe, expect, it } from "vitest";

import { filterAwcProjectsByQuery } from "@/features/projects/utils/filterAwcProjectsByQuery";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const buildProject = (name: string, folderPath: string): UserProjectRecord => ({
  id: name,
  ownerUserId: "user-1",
  deviceId: null,
  name,
  folderPath,
  repoUrls: [],
  defaultBranch: null,
  lastUsedAt: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
});

describe("filterAwcProjectsByQuery", () => {
  const projects = [
    buildProject("Weekly Notes", "/Users/study/weekly-notes"),
    buildProject("AgentWitch", "/tmp/agent-witch"),
  ];

  it("returns all projects when the query is blank", () => {
    expect(filterAwcProjectsByQuery(projects, "  ")).toEqual(projects);
  });

  it("matches project name or folder path case-insensitively", () => {
    expect(filterAwcProjectsByQuery(projects, "WITCH")).toEqual([projects[1]]);
    expect(filterAwcProjectsByQuery(projects, "weekly-notes")).toEqual([
      projects[0],
    ]);
  });
});
