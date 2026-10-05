import { beforeEach, describe, expect, it, vi } from "vitest";

const redeem = vi.hoisted(() => vi.fn());
const requireAuth = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/humanInvites/redeemHumanProjectInvite", () => ({
  redeemHumanProjectInvite: redeem,
}));

import { POST } from "@/app/api/invite/h/[token]/accept/route";

describe("POST /api/invite/h/[token]/accept naming retry", () => {
  beforeEach(() => {
    redeem.mockReset();
    requireAuth.mockReset();
    requireAuth.mockResolvedValue({
      actor: { id: "user-1", email: "u@x.com" },
      error: null,
    });
  });

  it("409 DISPLAY_NAME_TAKEN then 200 on naming retry", async () => {
    redeem
      .mockResolvedValueOnce({
        ok: false,
        code: "display_name_taken",
        suggestedProjectDisplayName: "Taken",
      })
      .mockResolvedValueOnce({
        ok: true,
        projectId: "proj-1",
        role: "member",
        projectDisplayName: "Free Name",
        membership: { id: "mem-1", status: "active" },
      });
    const token = "t".repeat(22);
    const first = await POST(
      new Request("http://local/a", {
        method: "POST",
        body: JSON.stringify({ suggestedProjectDisplayName: "Taken" }),
      }),
      { params: Promise.resolve({ token }) },
    );
    expect(first.status).toBe(409);
    expect((await first.json()).code).toBe("DISPLAY_NAME_TAKEN");

    const second = await POST(
      new Request("http://local/a", {
        method: "POST",
        body: JSON.stringify({ suggestedProjectDisplayName: "Free Name" }),
      }),
      { params: Promise.resolve({ token }) },
    );
    expect(second.status).toBe(200);
    expect((await second.json()).projectDisplayName).toBe("Free Name");
    expect(redeem).toHaveBeenCalledTimes(2);
  });
});
