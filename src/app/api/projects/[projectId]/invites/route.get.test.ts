import { beforeEach, describe, expect, it, vi } from "vitest";

const listInvites = vi.hoisted(() => vi.fn());
const requireAuth = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/invites/listProjectInvites", () => ({
  listProjectInvites: listInvites,
}));
vi.mock("@/lib/projects/acl/invites/createProjectInvite", () => ({
  createProjectInvite: vi.fn(),
}));

import { GET } from "@/app/api/projects/[projectId]/invites/route";

describe("GET /api/projects/[projectId]/invites", () => {
  beforeEach(() => {
    listInvites.mockReset();
    requireAuth.mockReset();
    requireAuth.mockResolvedValue({
      actor: { id: "owner-1" },
      error: null,
    });
  });

  it("returns only the usable invites from listProjectInvites", async () => {
    listInvites.mockResolvedValue({
      ok: true,
      invites: [
        {
          id: "inv-usable",
          projectId: "proj-1",
          createdByUserId: "owner-1",
          teamLabel: null,
          scopes: [],
          maxUses: 1,
          usesRemaining: 1,
          expiresAt: "2026-10-20T00:00:00.000Z",
          revokedAt: null,
          createdAt: "2026-10-05T00:00:00.000Z",
        },
      ],
    });
    const response = await GET(new Request("http://local/invites"), {
      params: Promise.resolve({ projectId: "proj-1" }),
    });
    expect(response.status).toBe(200);
    const body = (await response.json()) as {
      invites: readonly { inviteId: string; usesRemaining: number }[];
    };
    expect(body.invites).toEqual([
      expect.objectContaining({
        inviteId: "inv-usable",
        usesRemaining: 1,
        revokedAt: null,
      }),
    ]);
    expect(listInvites).toHaveBeenCalledWith({
      projectId: "proj-1",
      ownerUserId: "owner-1",
    });
  });

  it("maps forbidden from the orchestrator", async () => {
    listInvites.mockResolvedValue({ ok: false, code: "forbidden" });
    const response = await GET(new Request("http://local/invites"), {
      params: Promise.resolve({ projectId: "proj-1" }),
    });
    expect(response.status).toBe(403);
  });
});
