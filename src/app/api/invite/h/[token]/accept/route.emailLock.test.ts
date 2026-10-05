import { beforeEach, describe, expect, it, vi } from "vitest";

const redeem = vi.hoisted(() => vi.fn());
const requireAuth = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/humanInvites/redeemHumanProjectInvite", () => ({
  redeemHumanProjectInvite: redeem,
}));

import { POST } from "@/app/api/invite/h/[token]/accept/route";

describe("POST /api/invite/h/[token]/accept email lock", () => {
  beforeEach(() => {
    redeem.mockReset();
    requireAuth.mockReset();
    requireAuth.mockResolvedValue({
      actor: { id: "user-1", email: "other@x.com" },
      error: null,
    });
  });

  it("passes claimantEmail and returns 403 INVITE_EMAIL_MISMATCH + mask", async () => {
    redeem.mockResolvedValue({
      ok: false,
      code: "invite_email_mismatch",
      invitedEmailMasked: "t***@g***.com",
      projectId: "proj-1",
    });
    const response = await POST(
      new Request("http://local/a", {
        method: "POST",
        body: JSON.stringify({ suggestedProjectDisplayName: "Soft Vale" }),
      }),
      { params: Promise.resolve({ token: "t".repeat(22) }) },
    );
    expect(response.status).toBe(403);
    const body = await response.json();
    expect(body.code).toBe("INVITE_EMAIL_MISMATCH");
    expect(body.invitedEmailMasked).toBe("t***@g***.com");
    expect(redeem).toHaveBeenCalledWith(
      expect.objectContaining({
        claimantUserId: "user-1",
        claimantEmail: "other@x.com",
      }),
    );
  });

  it("returns 403 INVITE_EMAIL_UNVERIFIED", async () => {
    redeem.mockResolvedValue({
      ok: false,
      code: "invite_email_unverified",
      invitedEmailMasked: "a***@e***.com",
    });
    const response = await POST(
      new Request("http://local/a", {
        method: "POST",
        body: "{}",
      }),
      { params: Promise.resolve({ token: "t".repeat(22) }) },
    );
    expect(response.status).toBe(403);
    const body = await response.json();
    expect(body.code).toBe("INVITE_EMAIL_UNVERIFIED");
  });
});
