import { describe, expect, it } from "vitest";

import { assignOrphansToProjects } from "@/lib/projects/libraryReportsMigration/assignOrphansToProjects";
import {
  member,
  project,
} from "@/lib/projects/libraryReportsMigration/migrationTestFixtures";

describe("assignOrphansToProjects", () => {
  it("creates Personal once for an owner with no project and reuses it", () => {
    const ids: string[] = [];
    const ensure = (ownerUserId: string): string => {
      const id = `personal-${ownerUserId}-${ids.length + 1}`;
      ids.push(id);
      return id;
    };

    const first = assignOrphansToProjects({
      orphans: [
        { id: "cap-1", ownerUserId: "u1", projectId: null },
        { id: "run-1", ownerUserId: "u1", projectId: null },
      ],
      projects: [],
      activeMemberships: [],
      ensurePersonalProjectId: ensure,
    });

    expect(first.createdPersonalOwnerIds).toEqual(["u1"]);
    expect(first.assignments.get("cap-1")).toBe("personal-u1-1");
    expect(first.assignments.get("run-1")).toBe("personal-u1-1");

    const second = assignOrphansToProjects({
      orphans: [
        { id: "cap-1", ownerUserId: "u1", projectId: "personal-u1-1" },
        { id: "cap-2", ownerUserId: "u1", projectId: null },
      ],
      projects: [
        project("personal-u1-1", "u1", "Personal", "2026-01-01T00:00:00.000Z"),
      ],
      activeMemberships: [],
      ensurePersonalProjectId: ensure,
    });

    expect(second.createdPersonalOwnerIds).toEqual([]);
    expect(second.assignments.has("cap-1")).toBe(false);
    expect(second.assignments.get("cap-2")).toBe("personal-u1-1");
  });

  it("re-run is a no-op when every orphan already has a project_id", () => {
    const result = assignOrphansToProjects({
      orphans: [{ id: "cap-1", ownerUserId: "u1", projectId: "p1" }],
      projects: [project("p1", "u1", "Solo", "2026-01-01T00:00:00.000Z")],
      activeMemberships: [],
      ensurePersonalProjectId: () => "should-not-run",
    });

    expect(result.assignments.size).toBe(0);
    expect(result.createdPersonalOwnerIds).toEqual([]);
  });

  it("shared oldest sends orphans to Personal; solo oldest keeps them", () => {
    const result = assignOrphansToProjects({
      orphans: [
        { id: "cap-shared-owner", ownerUserId: "u-shared", projectId: null },
        { id: "cap-solo-owner", ownerUserId: "u-solo", projectId: null },
      ],
      projects: [
        project("shared", "u-shared", "Team", "2026-01-01T00:00:00.000Z"),
        project("solo", "u-solo", "Mine", "2026-01-01T00:00:00.000Z"),
      ],
      activeMemberships: [member("shared", "other-bot")],
      ensurePersonalProjectId: (owner) => `personal-${owner}`,
    });

    expect(result.assignments.get("cap-shared-owner")).toBe(
      "personal-u-shared",
    );
    expect(result.assignments.get("cap-solo-owner")).toBe("solo");
    expect(result.createdPersonalOwnerIds).toEqual(["u-shared"]);
  });
});
