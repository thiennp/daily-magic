import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/projects/[projectId]/activity/route";
import { requireAuth } from "@/lib/auth/requireAuth";

const sqlMock = vi.fn();

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth: vi.fn() }));
vi.mock("@/lib/db", () => ({
  getSql: () => Object.assign(sqlMock, { unsafe: (s: string) => s }),
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async (id: string) =>
    id === "proj-1" ? { id: "proj-1", ownerUserId: "owner-1" } : null,
  ),
}));

const asUser = (id: string) =>
  vi.mocked(requireAuth).mockResolvedValue({
    error: null,
    actor: { id, email: `${id}@test.local`, globalRole: "user" },
  } as never);

const call = (projectId: string, query = "") =>
  GET(new Request(`http://local/api/projects/${projectId}/activity${query}`), {
    params: Promise.resolve({ projectId }),
  });

const row = {
  id: "evt-1",
  event_type: "member.delivery_mode_changed",
  actor_kind: "member",
  actor_user_id: "bot-1",
  actor_label: "Buni",
  target_membership_id: "mem-1",
  target_user_id: "bot-1",
  target_label: "Buni",
  detail: { membershipId: "mem-1", deliveryMode: "poll", activity: "Buni switched" },
  created_at: new Date("2026-10-06T09:12:00.000Z"),
  cursor_at: "2026-10-06T09:12:00.000000Z",
};

describe("GET /api/projects/[id]/activity (Access log, owner only)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) =>
      String(strings).includes("FROM project_activity_events e") ? [row] : [],
    );
  });

  it("403 owner_only for a member (and reads nothing)", async () => {
    asUser("member-1");
    const response = await call("proj-1");
    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({ ok: false, error: "owner_only" });
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("404 not_found for a missing project; 400 for a bad category", async () => {
    asUser("owner-1");
    expect((await call("missing")).status).toBe(404);
    const bad = await call("proj-1", "?category=messages");
    expect(bad.status).toBe(400);
    expect(await bad.json()).toEqual({ ok: false, error: "invalid_query" });
  });

  it("owner gets structured events, retention, and no English", async () => {
    asUser("owner-1");
    const response = await call("proj-1", "?category=wake&limit=10");
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject({
      ok: true,
      projectId: "proj-1",
      nextCursor: null,
      retention: { maxEvents: 500, maxAgeDays: 180 },
    });
    expect(body.events[0]).toEqual({
      id: "evt-1",
      type: "member.delivery_mode_changed",
      category: "wake",
      at: "2026-10-06T09:12:00.000Z",
      actor: { kind: "member", userId: "bot-1", displayName: "Buni" },
      target: { membershipId: "mem-1", userId: "bot-1", displayName: "Buni" },
      detail: { membershipId: "mem-1", deliveryMode: "poll", trigger: "member_switch" },
    });
  });
});
