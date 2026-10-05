import { beforeEach, describe, expect, it, vi } from "vitest";

const listInvites = vi.hoisted(() => vi.fn());
const issueInvite = vi.hoisted(() => vi.fn());
const requireAuth = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/humanInvites/listHumanProjectInvites", () => ({
  listHumanProjectInvites: listInvites,
}));
vi.mock("@/lib/projects/acl/humanInvites/issueHumanProjectInvite", () => ({
  issueHumanProjectInvite: issueInvite,
}));

import { GET, POST } from "@/app/api/projects/[projectId]/human-invites/route";

const inviteRecord = {
  id: "inv-1",
  projectId: "proj-1",
  createdByUserId: "owner-1",
  email: null as string | null,
  requireEmailMatch: false,
  role: "member" as const,
  maxUses: 1,
  usesRemaining: 1,
  expiresAt: "2026-10-20T00:00:00.000Z",
  revokedAt: null,
  redeemedAt: null,
  redeemedByUserId: null,
  createdAt: "2026-10-05T00:00:00.000Z",
};

describe("/api/projects/[projectId]/human-invites", () => {
  beforeEach(() => {
    listInvites.mockReset();
    issueInvite.mockReset();
    requireAuth.mockReset();
    requireAuth.mockResolvedValue({
      actor: { id: "owner-1", email: "o@x.com" },
      error: null,
    });
  });

  it("GET maps forbidden to 403", async () => {
    listInvites.mockResolvedValue({ ok: false, code: "forbidden" });
    const response = await GET(new Request("http://local/h"), {
      params: Promise.resolve({ projectId: "proj-1" }),
    });
    expect(response.status).toBe(403);
  });

  it("GET returns usable invites with requireEmailMatch", async () => {
    listInvites.mockResolvedValue({
      ok: true,
      invites: [{ ...inviteRecord, email: "a@b.com", requireEmailMatch: true }],
    });
    const response = await GET(new Request("http://local/h"), {
      params: Promise.resolve({ projectId: "proj-1" }),
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.invites[0].requireEmailMatch).toBe(true);
    expect(body.invites[0].token).toBeUndefined();
  });

  it("POST returns 201 with token once (mode A)", async () => {
    issueInvite.mockResolvedValue({
      ok: true,
      token: "tok",
      url: "https://x/invite/h/tok",
      invite: { ...inviteRecord, role: "viewer" },
    });
    const response = await POST(
      new Request("http://local/h", {
        method: "POST",
        body: JSON.stringify({ role: "viewer" }),
      }),
      { params: Promise.resolve({ projectId: "proj-1" }) },
    );
    expect(response.status).toBe(201);
    const body = await response.json();
    expect(body.token).toBe("tok");
    expect(body.requireEmailMatch).toBe(false);
  });

  it("POST maps non-owner to 403", async () => {
    issueInvite.mockResolvedValue({ ok: false, code: "forbidden" });
    const response = await POST(
      new Request("http://local/h", { method: "POST", body: "{}" }),
      { params: Promise.resolve({ projectId: "proj-1" }) },
    );
    expect(response.status).toBe(403);
  });
});
