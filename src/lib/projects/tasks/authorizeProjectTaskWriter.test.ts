import { beforeEach, describe, expect, it, vi } from "vitest";

import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { authorizeProjectTaskWriter } from "@/lib/projects/tasks/authorizeProjectTaskWriter";
import { projectTaskSeat } from "@/lib/projects/tasks/projectTask.fixtures";

const seat = { current: null as ProjectMembershipRecord | null };

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async (id: string) =>
    id === "p1" ? { id: "p1", ownerUserId: "owner-1" } : null,
  ),
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: vi.fn(async () => seat.current),
}));

const run = (actorUserId: string, projectId = "p1") =>
  authorizeProjectTaskWriter({ projectId, actorUserId });

describe("authorizeProjectTaskWriter (DF-024 auth matrix)", () => {
  beforeEach(() => {
    seat.current = null;
  });

  it("owner → ok with no seat", async () => {
    expect(await run("owner-1")).toEqual({
      ok: true,
      ownerUserId: "owner-1",
      membership: null,
    });
  });

  it("assistant with msg:dispatch and human member → ok", async () => {
    seat.current = projectTaskSeat();
    expect((await run("bot-user")).ok).toBe(true);
    seat.current = projectTaskSeat({
      memberKind: "human",
      scopes: [],
      userId: "h1",
    });
    expect((await run("h1")).ok).toBe(true);
  });

  it("viewer → viewer_read_only; non-member → forbidden; unknown → not_found", async () => {
    seat.current = projectTaskSeat({
      role: "viewer",
      memberKind: "human",
      scopes: [],
    });
    expect(await run("viewer-1")).toEqual({
      ok: false,
      code: "viewer_read_only",
    });
    seat.current = null;
    expect(await run("stranger")).toEqual({ ok: false, code: "forbidden" });
    expect(await run("owner-1", "nope")).toEqual({
      ok: false,
      code: "not_found",
    });
  });

  it("assistant without msg:dispatch → missing_scope", async () => {
    seat.current = projectTaskSeat({ scopes: [] });
    expect(await run("bot-user")).toEqual({ ok: false, code: "missing_scope" });
  });
});
