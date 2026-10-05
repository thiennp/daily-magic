import { describe, expect, it } from "vitest";

import { resolveOrphanProjectTarget } from "@/lib/projects/libraryReportsMigration/resolveOrphanProjectTarget";
import {
  member,
  project,
} from "@/lib/projects/libraryReportsMigration/migrationTestFixtures";

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

  it("skips projects the owner no longer has (deleted / absent)", () => {
    const target = resolveOrphanProjectTarget({
      ownerUserId: "u1",
      projects: [project("p-live", "u1", "Live", "2026-05-01T00:00:00.000Z")],
      activeMemberships: [],
    });

    expect(target).toEqual({ kind: "existing", projectId: "p-live" });
  });

  it("treats a project with only active memberships omitted as solo", () => {
    const target = resolveOrphanProjectTarget({
      ownerUserId: "u1",
      projects: [project("p1", "u1", "Solo", "2026-01-01T00:00:00.000Z")],
      activeMemberships: [],
    });
    expect(target).toEqual({ kind: "existing", projectId: "p1" });
  });
});
