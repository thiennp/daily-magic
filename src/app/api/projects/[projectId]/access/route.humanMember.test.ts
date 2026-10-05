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
vi.mock("@/app/api/projects/[projectId]/access/patchAccessAction", () => ({
  handleProjectAccessPatch: vi.fn(),
}));

import { GET } from "@/app/api/projects/[projectId]/access/route";

describe("GET /api/projects/:projectId/access for human seats", () => {
  beforeEach(() => {
    requireAuth.mockReset();
    resolveSeat.mockReset();
    listMemberships.mockReset();
    buildViews.mockReset();
    listPending.mockReset();
    buildPending.mockReset();
    enrichComputers.mockReset();
    liveDeviceIds.mockReset();
    requireAuth.mockResolvedValue({ actor: { id: "user-1" }, error: null });
    listMemberships.mockResolvedValue([]);
    const members = [
      { id: "mem-1", role: "member", memberKind: "bot", isAgent: true },
    ];
    buildViews.mockResolvedValue(members);
    liveDeviceIds.mockResolvedValue(new Set());
    enrichComputers.mockImplementation(async (rows: unknown) => rows);
  });

  it("human member gets roster without pending/firstConnect admin", async () => {
    resolveSeat.mockResolvedValue({
      ok: true,
      kind: "human",
      project: { id: "proj-1", name: "P" },
      membership: { role: "member", memberKind: "human" },
    });
    const response = await GET(new Request("http://local/access"), {
      params: Promise.resolve({ projectId: "proj-1" }),
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject({
      ok: true,
      pendingRequests: [],
      firstConnect: null,
      actorRole: "member",
    });
    expect(body.members).toHaveLength(1);
    expect(listPending).not.toHaveBeenCalled();
    expect(enrichComputers).toHaveBeenCalled();
  });

  it("viewer gets read roster (actorRole viewer)", async () => {
    resolveSeat.mockResolvedValue({
      ok: true,
      kind: "human",
      project: { id: "proj-1", name: "P" },
      membership: { role: "viewer", memberKind: "human" },
    });
    const response = await GET(new Request("http://local/access"), {
      params: Promise.resolve({ projectId: "proj-1" }),
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      ok: true,
      actorRole: "viewer",
      firstConnect: null,
    });
  });

  it("stranger gets 403", async () => {
    resolveSeat.mockResolvedValue({ ok: false, code: "forbidden" });
    const response = await GET(new Request("http://local/access"), {
      params: Promise.resolve({ projectId: "proj-1" }),
    });
    expect(response.status).toBe(403);
  });
});
