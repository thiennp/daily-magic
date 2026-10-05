import { beforeEach, describe, expect, it, vi } from "vitest";

const redeem = vi.hoisted(() => vi.fn());
const requireAuth = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/humanInvites/redeemHumanProjectInvite", () => ({
  redeemHumanProjectInvite: redeem,
}));

import { POST } from "@/app/api/invite/h/[token]/accept/route";

describe("POST /api/invite/h/[token]/accept", () => {
  beforeEach(() => {
    redeem.mockReset();
    requireAuth.mockReset();
    requireAuth.mockResolvedValue({
      actor: { id: "user-1", email: "u@x.com" },
      error: null,
    });
  });

  it("returns 401 without auth", async () => {
    requireAuth.mockResolvedValue({
      actor: null,
      error: Response.json({ error: "Unauthorized" }, { status: 401 }),
    });
    const response = await POST(new Request("http://local/a"), {
      params: Promise.resolve({ token: "t".repeat(22) }),
    });
    expect(response.status).toBe(401);
  });

  it("maps already_member to 409 and expired to 410", async () => {
    redeem.mockResolvedValue({ ok: false, code: "already_member" });
    expect(
      (
        await POST(new Request("http://local/a"), {
          params: Promise.resolve({ token: "t".repeat(22) }),
        })
      ).status,
    ).toBe(409);
    redeem.mockResolvedValue({ ok: false, code: "expired" });
    expect(
      (
        await POST(new Request("http://local/a"), {
          params: Promise.resolve({ token: "t".repeat(22) }),
        })
      ).status,
    ).toBe(410);
  });

  it("returns membership on success", async () => {
    redeem.mockResolvedValue({
      ok: true,
      projectId: "proj-1",
      role: "member",
      membership: {
        id: "mem-1",
        status: "active",
      },
    });
    const response = await POST(new Request("http://local/a"), {
      params: Promise.resolve({ token: "t".repeat(22) }),
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.membershipId).toBe("mem-1");
    expect(body.projectId).toBe("proj-1");
  });
});
