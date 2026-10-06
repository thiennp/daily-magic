import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAuth = vi.hoisted(() => vi.fn());
const authorize = vi.hoisted(() => vi.fn());
const listCaps = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/humanInvites/authorizeProjectPageActor", () => ({
  authorizeProjectPageActor: authorize,
}));
vi.mock("@/lib/capabilities/listPublishedCapabilitiesForProject", () => ({
  listPublishedCapabilitiesForProject: listCaps,
}));

import { GET } from "@/app/api/projects/[projectId]/library/route";

const project = {
  id: "proj-1",
  ownerUserId: "owner-1",
  name: "Team",
};

const draft = {
  id: "c-draft",
  status: "draft",
  projectId: "proj-1",
  name: "Draft",
};
const published = {
  id: "c-pub",
  status: "published",
  projectId: "proj-1",
  name: "Pub",
};

describe("GET /api/projects/[projectId]/library", () => {
  beforeEach(() => {
    requireAuth.mockReset();
    authorize.mockReset();
    listCaps.mockReset();
    requireAuth.mockResolvedValue({
      actor: { id: "actor-1", email: "a@x.com" },
      error: null,
    });
    listCaps.mockResolvedValue([draft, published]);
  });

  it("404 for non-member", async () => {
    authorize.mockResolvedValue({ ok: false, reason: "forbidden" });
    const response = await GET(new Request("http://local/lib"), {
      params: Promise.resolve({ projectId: "proj-1" }),
    });
    expect(response.status).toBe(404);
  });

  it("owner sees drafts + published", async () => {
    authorize.mockResolvedValue({
      ok: true,
      project,
      role: "owner",
      membership: null,
    });
    const response = await GET(new Request("http://local/lib"), {
      params: Promise.resolve({ projectId: "proj-1" }),
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.capabilities).toHaveLength(2);
    expect(body.role).toBe("owner");
  });

  it("member and viewer see published only", async () => {
    for (const role of ["member", "viewer"] as const) {
      authorize.mockResolvedValue({
        ok: true,
        project,
        role,
        membership: { role },
      });
      const response = await GET(new Request("http://local/lib"), {
        params: Promise.resolve({ projectId: "proj-1" }),
      });
      const body = await response.json();
      expect(body.capabilities).toEqual([published]);
      expect(body.role).toBe(role);
    }
  });
});
