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

  it("passes suggestedProjectDisplayName from body", async () => {
    redeem.mockResolvedValue({
      ok: true,
      projectId: "proj-1",
      role: "member",
      projectDisplayName: "Soft Vale",
      membership: { id: "mem-1", status: "active" },
    });
    const response = await POST(
      new Request("http://local/a", {
        method: "POST",
        body: JSON.stringify({ suggestedProjectDisplayName: "Soft Vale" }),
      }),
      { params: Promise.resolve({ token: "t".repeat(22) }) },
    );
    expect(response.status).toBe(200);
    expect(redeem).toHaveBeenCalledWith({
      token: "t".repeat(22),
      claimantUserId: "user-1",
      suggestedProjectDisplayName: "Soft Vale",
    });
    const body = await response.json();
    expect(body.projectDisplayName).toBe("Soft Vale");
  });

  it("returns DISPLAY_NAME_TAKEN with prefill (409)", async () => {
    redeem.mockResolvedValue({
      ok: false,
      code: "display_name_taken",
      suggestedProjectDisplayName: "Taken",
    });
    const response = await POST(
      new Request("http://local/a", {
        method: "POST",
        body: JSON.stringify({ suggestedProjectDisplayName: "Taken" }),
      }),
      { params: Promise.resolve({ token: "t".repeat(22) }) },
    );
    expect(response.status).toBe(409);
    const body = await response.json();
    expect(body.code).toBe("DISPLAY_NAME_TAKEN");
    expect(body.suggestedProjectDisplayName).toBe("Taken");
  });

  it("returns INVALID_DISPLAY_NAME (400)", async () => {
    redeem.mockResolvedValue({
      ok: false,
      code: "display_name_invalid",
      suggestedProjectDisplayName: "bad@x",
    });
    const response = await POST(
      new Request("http://local/a", {
        method: "POST",
        body: JSON.stringify({ suggestedProjectDisplayName: "bad@x" }),
      }),
      { params: Promise.resolve({ token: "t".repeat(22) }) },
    );
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.code).toBe("INVALID_DISPLAY_NAME");
  });
});
