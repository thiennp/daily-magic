import { describe, expect, it } from "vitest";

import { assignOrphansToProjects } from "@/lib/projects/libraryReportsMigration/assignOrphansToProjects";
import {
  member,
  project,
} from "@/lib/projects/libraryReportsMigration/migrationTestFixtures";

describe("assignOrphansToProjects", () => {
  it("creates Default once for an owner with no project and reuses it", () => {
    const created: string[] = [];
    const ensure = (
      ownerUserId: string,
      name: "Default" | "Personal",
    ): string => {
      const id = `${name.toLowerCase()}-${ownerUserId}-${created.length + 1}`;
      created.push(id);
      return id;
    };

    const first = assignOrphansToProjects({
      orphans: [
        { id: "cap-1", ownerUserId: "u1", projectId: null },
        { id: "run-1", ownerUserId: "u1", projectId: null },
      ],
      projects: [],
      activeMemberships: [],
      ensurePrivateProjectId: ensure,
    });

    expect(first.createdPrivate).toEqual([
      { ownerUserId: "u1", name: "Default" },
    ]);
    expect(first.assignments.get("cap-1")).toBe("default-u1-1");
    expect(first.assignments.get("run-1")).toBe("default-u1-1");

    const second = assignOrphansToProjects({
      orphans: [
        { id: "cap-1", ownerUserId: "u1", projectId: "default-u1-1" },
        { id: "cap-2", ownerUserId: "u1", projectId: null },
      ],
      projects: [
        project("default-u1-1", "u1", "Default", "2026-01-01T00:00:00.000Z"),
      ],
      activeMemberships: [],
      ensurePrivateProjectId: ensure,
    });

    expect(second.createdPrivate).toEqual([]);
    expect(second.assignments.has("cap-1")).toBe(false);
    expect(second.assignments.get("cap-2")).toBe("default-u1-1");
  });

  it("re-run is a no-op when every orphan already has a project_id", () => {
    const result = assignOrphansToProjects({
      orphans: [{ id: "cap-1", ownerUserId: "u1", projectId: "p1" }],
      projects: [project("p1", "u1", "Solo", "2026-01-01T00:00:00.000Z")],
      activeMemberships: [],
      ensurePrivateProjectId: () => "should-not-run",
    });

    expect(result.assignments.size).toBe(0);
    expect(result.createdPrivate).toEqual([]);
  });

  it("shared oldest uses Default; shared Default uses Personal", () => {
    const result = assignOrphansToProjects({
      orphans: [
        { id: "cap-a", ownerUserId: "u-a", projectId: null },
        { id: "cap-b", ownerUserId: "u-b", projectId: null },
        { id: "cap-solo", ownerUserId: "u-solo", projectId: null },
      ],
      projects: [
        project("shared-a", "u-a", "Team", "2026-01-01T00:00:00.000Z"),
        project("shared-b", "u-b", "Team", "2026-01-01T00:00:00.000Z"),
        project("default-b", "u-b", "Default", "2026-02-01T00:00:00.000Z"),
        project("solo", "u-solo", "Mine", "2026-01-01T00:00:00.000Z"),
      ],
      activeMemberships: [
        member("shared-a", "other-bot"),
        member("shared-b", "other-bot"),
        member("default-b", "other-human"),
      ],
      ensurePrivateProjectId: (owner, name) => `${name.toLowerCase()}-${owner}`,
    });

    expect(result.assignments.get("cap-a")).toBe("default-u-a");
    expect(result.assignments.get("cap-b")).toBe("personal-u-b");
    expect(result.assignments.get("cap-solo")).toBe("solo");
    expect(result.createdPrivate).toEqual([
      { ownerUserId: "u-a", name: "Default" },
      { ownerUserId: "u-b", name: "Personal" },
    ]);
  });
});
