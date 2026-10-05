import { describe, expect, it } from "vitest";

import { resolveSaveToProjectDefault } from "@/features/capabilities/utils/resolveSaveToProjectDefault";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const project = (id: string, name: string): UserProjectRecord => ({
  id,
  ownerUserId: "user-1",
  deviceId: null,
  name,
  folderPath: `~/projects/${id}`,
  repoUrls: [],
  defaultBranch: null,
  lastUsedAt: null,
  createdAt: "2026-10-01T00:00:00.000Z",
  updatedAt: "2026-10-01T00:00:00.000Z",
});

const projects = [
  project("launch", "Launch"),
  project("personal", "Personal"),
  project("default", "Default"),
];

describe("resolveSaveToProjectDefault", () => {
  it("prefers the current project context", () => {
    expect(
      resolveSaveToProjectDefault({
        projects,
        contextProjectId: "launch",
        lastUsedProjectId: "personal",
      }),
    ).toBe("launch");
  });

  it("falls back to the last-used project when it still exists", () => {
    expect(
      resolveSaveToProjectDefault({ projects, lastUsedProjectId: "personal" }),
    ).toBe("personal");
  });

  it("ignores a stale last-used project and picks Default", () => {
    expect(
      resolveSaveToProjectDefault({ projects, lastUsedProjectId: "gone" }),
    ).toBe("default");
  });

  it("picks Personal when there is no Default project", () => {
    expect(
      resolveSaveToProjectDefault({
        projects: [
          project("launch", "Launch"),
          project("personal", "Personal"),
        ],
      }),
    ).toBe("personal");
  });

  it("returns empty when the user has no projects", () => {
    expect(resolveSaveToProjectDefault({ projects: [] })).toBe("");
  });
});
