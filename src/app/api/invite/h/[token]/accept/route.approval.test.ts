import { beforeEach, describe, expect, it, vi } from "vitest";

const redeem = vi.hoisted(() => vi.fn());
const requireAuth = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/humanInvites/redeemHumanProjectInvite", () => ({
  redeemHumanProjectInvite: redeem,
}));

import { POST } from "@/app/api/invite/h/[token]/accept/route";

const accept = () =>
  POST(new Request("http://local/a", { method: "POST", body: "{}" }), {
    params: Promise.resolve({ token: "t".repeat(22) }),
  });

describe("POST /api/invite/h/[token]/accept — 108 approval", () => {
  beforeEach(() => {
    redeem.mockReset();
    requireAuth.mockReset();
    requireAuth.mockResolvedValue({
      actor: { id: "user-2", email: "a@x.com" },
      error: null,
    });
  });

  it("requires sign-in", async () => {
    requireAuth.mockResolvedValue({
      actor: null,
      error: Response.json({ ok: false }, { status: 401 }),
    });
    expect((await accept()).status).toBe(401);
    expect(redeem).not.toHaveBeenCalled();
  });

  it("approval-required accept → 200 awaitingApproval, no membership id", async () => {
    redeem.mockResolvedValue({
      ok: true,
      awaitingApproval: true,
      inviteId: "inv-1",
      projectId: "proj-1",
      role: "member",
      projectDisplayName: "Ada",
    });
    const response = await accept();
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toMatchObject({
      ok: true,
      awaitingApproval: true,
      status: "awaiting_approval",
      projectId: "proj-1",
    });
    expect(body.membershipId).toBeUndefined();
  });

  it.each(["already_redeemed", "revoked", "expired"])(
    "%s → 410",
    async (code) => {
      redeem.mockResolvedValue({ ok: false, code });
      expect((await accept()).status).toBe(410);
    },
  );

  it("second request from the same person → 409", async () => {
    redeem.mockResolvedValue({
      ok: false,
      code: "already_requested",
      projectId: "proj-1",
    });
    expect((await accept()).status).toBe(409);
  });
});
