import { describe, expect, it } from "vitest";

import {
  assignOrphansToProjects,
  resolveOrphanProjectTarget,
  type MigrationMembership,
  type MigrationProject,
} from "@/lib/projects/libraryReportsMigration/resolveOrphanProjectTarget";

const project = (
  id: string,
  ownerUserId: string,
  name: string,
  createdAt: string,
): MigrationProject => ({ id, ownerUserId, name, createdAt });

const member = (
  projectId: string,
  userId: string,
): MigrationMembership => ({
  projectId,
  userId,
  status: "active",
});

describe("resolveOrphanProjectTarget", () => {
  it("puts the orphan on the oldest solo project (created_at, then id)", () => {
    const target = resolveOrphanProjectTarget({
      ownerUserId: "u1",
      projects: [
        project("p-new", "u1", "New", "2026-02-01T00:00:00.000Z"),
        project("p-old", "u1", "Old", "2026-01-01T00:00:00.000Z"),
        project("p-tie-b", "u1", "TieB", "2026-01-01T00:00:00.000Z"),
      ],
      activeMemberships: [],
    });

    // Same created_at as p-old: id "p-old" < "p-tie-b"
    expect(target).toEqual({ kind: "existing", projectId: "p-old" });
  });

  it("uses Personal when the oldest project has other active members", () => {
    const target = resolveOrphanProjectTarget({
      ownerUserId: "u1",
      projects: [
        project("p-shared", "u1", "Team", "2026-01-01T00:00:00.000Z"),
        project("p-solo-newer", "u1", "Solo", "2026-06-01T00:00:00.000Z"),
      ],
      activeMemberships: [member("p-shared", "bot-1")],
    });

    expect(target).toEqual({ kind: "personal", reuseProjectId: null });
  });

  it("reuses an existing Personal project when oldest is shared", () => {
    const target = resolveOrphanProjectTarget({
      ownerUserId: "u1",
      projects: [
        project("p-shared", "u1", "Team", "2026-01-01T00:00:00.000Z"),
        project("p-personal", "u1", "Personal", "2026-03-01T00:00:00.000Z"),
      ],
      activeMemberships: [member("p-shared", "human-2")],
    });

    expect(target).toEqual({
      kind: "personal",
      reuseProjectId: "p-personal",
    });
  });

  it("uses Personal when the owner has no project", () => {
    const target = resolveOrphanProjectTarget({
      ownerUserId: "u1",
      projects: [project("other", "u2", "Other", "2026-01-01T00:00:00.000Z")],
      activeMemberships: [],
    });

    expect(target).toEqual({ kind: "personal", reuseProjectId: null });
  });

  it("skips projects the owner no longer has (deleted / absent = not active)", () => {
    const target = resolveOrphanProjectTarget({
      ownerUserId: "u1",
      // Deleted "p-archived" is simply absent from the list.
      projects: [project("p-live", "u1", "Live", "2026-05-01T00:00:00.000Z")],
      activeMemberships: [],
    });

    expect(target).toEqual({ kind: "existing", projectId: "p-live" });
  });

  it("ignores revoked memberships when deciding shared vs solo", () => {
    // Only active memberships are passed in; revoked rows are omitted by callers.
    const target = resolveOrphanProjectTarget({
      ownerUserId: "u1",
      projects: [project("p1", "u1", "Solo", "2026-01-01T00:00:00.000Z")],
      activeMemberships: [],
    });
    expect(target).toEqual({ kind: "existing", projectId: "p1" });
  });
});

describe("assignOrphansToProjects", () => {
  it("creates Personal once for an owner with no project and reuses it", () => {
    let personalSeq = 0;
    const ensure = (ownerUserId: string): string => {
      personalSeq += 1;
      return `personal-${ownerUserId}-${personalSeq}`;
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
