import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuth = vi.hoisted(() => vi.fn());
const resolveSeat = vi.hoisted(() => vi.fn());
const listMemberships = vi.hoisted(() => vi.fn());
const buildViews = vi.hoisted(() => vi.fn());
const listPending = vi.hoisted(() => vi.fn());
const buildPending = vi.hoisted(() => vi.fn());
const enrichComputers = vi.hoisted(() => vi.fn());
const liveDeviceIds = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/resolveOwnerOrActiveHumanSeat", () => ({
  resolveOwnerOrActiveHumanSeat: resolveSeat,
}));
vi.mock("@/lib/projects/acl/listProjectMembershipsForProject", () => ({
  listProjectMembershipsForProject: listMemberships,
}));
vi.mock("@/lib/projects/acl/buildProjectAccessViews", () => ({
  buildMembershipViews: buildViews,
  buildPendingRequestViews: buildPending,
}));
vi.mock("@/lib/projects/acl/listPendingProjectAccessRequests", () => ({
  listPendingProjectAccessRequests: listPending,
}));
vi.mock("@/lib/projects/acl/enrichProjectAccessComputerMembers", () => ({
  enrichProjectAccessComputerMembers: enrichComputers,
}));
vi.mock("@/lib/projects/acl/resolveAccessComputerLiveDeviceIds", () => ({
  resolveAccessComputerLiveDeviceIds: liveDeviceIds,
}));
vi.mock("@/lib/projects/acl/ensureProjectLinkedComputerSeat", () => ({
  ensureProjectLinkedComputerSeat: vi.fn(async () => false),
}));
vi.mock("@/lib/projects/acl/enrichProjectAccessBotWakeLinks", () => ({
  enrichProjectAccessBotWakeLinks: async (_id: string, rows: unknown) => rows,
}));
vi.mock("@/app/api/projects/[projectId]/access/patchAccessAction", () => ({
  handleProjectAccessPatch: vi.fn(),
}));

import { GET } from "@/app/api/projects/[projectId]/access/route";

const get = () =>
  GET(new Request("http://local/access"), {
    params: Promise.resolve({ projectId: "proj-1" }),
  });

const humanSeat = (role: "member" | "viewer") => ({
  ok: true as const,
  kind: "human" as const,
  project: { id: "proj-1", name: "P", ownerUserId: "owner-1", deviceId: null },
  membership: { role, memberKind: "human" },
});

describe("GET /api/projects/:projectId/access for human seats", () => {
  beforeEach(() => {
    for (const m of [
      requireAuth,
      resolveSeat,
      listMemberships,
      buildViews,
      listPending,
      buildPending,
      enrichComputers,
      liveDeviceIds,
    ])
      m.mockReset();
    requireAuth.mockResolvedValue({ actor: { id: "user-1" }, error: null });
    listMemberships.mockResolvedValue([]);
    buildViews.mockResolvedValue([
      { id: "mem-1", role: "member", memberKind: "bot", isAgent: true },
    ]);
    liveDeviceIds.mockResolvedValue(new Set());
    enrichComputers.mockImplementation(async (rows: unknown) => rows);
  });

  it("human member gets roster without pending/firstConnect admin", async () => {
    resolveSeat.mockResolvedValue(humanSeat("member"));
    const response = await get();
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject({
      ok: true,
      pendingRequests: [],
      firstConnect: null,
      actorRole: "member",
    });
    expect(body.members).toHaveLength(1);
    expect(body.members[0]).not.toHaveProperty("wakeLinkSet");
    expect(listPending).not.toHaveBeenCalled();
    expect(enrichComputers).toHaveBeenCalled();
  });

  it("viewer gets read roster (actorRole viewer)", async () => {
    resolveSeat.mockResolvedValue(humanSeat("viewer"));
    const response = await get();
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      ok: true,
      actorRole: "viewer",
      firstConnect: null,
    });
  });

  it("stranger gets 403", async () => {
    resolveSeat.mockResolvedValue({ ok: false, code: "forbidden" });
    expect((await get()).status).toBe(403);
  });
});
