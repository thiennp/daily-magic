import { beforeEach, describe, expect, it, vi } from "vitest";

const approve = vi.hoisted(() => vi.fn());
const deny = vi.hoisted(() => vi.fn());
const requireAuth = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/humanInvites/approveHumanInviteRequest", () => ({
  approveHumanInviteRequest: approve,
}));
vi.mock("@/lib/projects/acl/humanInvites/denyHumanInviteRequest", () => ({
  denyHumanInviteRequest: deny,
}));

import { POST as APPROVE } from "@/app/api/projects/[projectId]/human-invites/[inviteId]/approve/route";
import { POST as DENY } from "@/app/api/projects/[projectId]/human-invites/[inviteId]/deny/route";

const ctx = {
  params: Promise.resolve({ projectId: "proj-1", inviteId: "inv-1" }),
};
const req = () => new Request("http://local/x", { method: "POST" });

describe("human invite Approve / Deny routes (108)", () => {
  beforeEach(() => {
    approve.mockReset();
    deny.mockReset();
    requireAuth.mockReset();
    requireAuth.mockResolvedValue({
      actor: { id: "owner-1", email: "o@x.com" },
      error: null,
    });
  });

  it("Approve → 200 with membershipId", async () => {
    approve.mockResolvedValue({
      ok: true,
      invite: { id: "inv-1" },
      membership: { id: "mem-1" },
    });
    const response = await APPROVE(req(), ctx);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: true,
      inviteId: "inv-1",
      membershipId: "mem-1",
      status: "approved",
    });
    expect(approve).toHaveBeenCalledWith({
      projectId: "proj-1",
      inviteId: "inv-1",
      ownerUserId: "owner-1",
    });
  });

  it("non-owner → 403; already handled → 409; unknown → 404", async () => {
    approve.mockResolvedValueOnce({ ok: false, code: "forbidden" });
    expect((await APPROVE(req(), ctx)).status).toBe(403);
    approve.mockResolvedValueOnce({ ok: false, code: "not_awaiting_approval" });
    expect((await APPROVE(req(), ctx)).status).toBe(409);
    approve.mockResolvedValueOnce({ ok: false, code: "not_found" });
    expect((await APPROVE(req(), ctx)).status).toBe(404);
  });

  it("Deny → 200 revoked; non-owner → 403", async () => {
    deny.mockResolvedValueOnce({ ok: true, invite: { id: "inv-1" } });
    const response = await DENY(req(), ctx);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: true,
      inviteId: "inv-1",
      status: "revoked",
    });
    deny.mockResolvedValueOnce({ ok: false, code: "forbidden" });
    expect((await DENY(req(), ctx)).status).toBe(403);
  });

  it("requires sign-in", async () => {
    requireAuth.mockResolvedValue({
      actor: null,
      error: Response.json({ ok: false }, { status: 401 }),
    });
    expect((await APPROVE(req(), ctx)).status).toBe(401);
    expect(approve).not.toHaveBeenCalled();
  });
});
