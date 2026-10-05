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

import { POST } from "@/app/api/projects/[projectId]/human-invites/route";

describe("/api/projects/[projectId]/human-invites email lock", () => {
  beforeEach(() => {
    listInvites.mockReset();
    issueInvite.mockReset();
    requireAuth.mockReset();
    requireAuth.mockResolvedValue({
      actor: { id: "owner-1", email: "o@x.com" },
      error: null,
    });
  });

  it("POST mode B without email → 400 EMAIL_REQUIRED_FOR_LOCK", async () => {
    issueInvite.mockResolvedValue({
      ok: false,
      code: "email_required_for_lock",
    });
    const response = await POST(
      new Request("http://local/h", {
        method: "POST",
        body: JSON.stringify({ requireEmailMatch: true }),
      }),
      { params: Promise.resolve({ projectId: "proj-1" }) },
    );
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.code).toBe("EMAIL_REQUIRED_FOR_LOCK");
    expect(issueInvite).toHaveBeenCalledWith(
      expect.objectContaining({ requireEmailMatch: true }),
    );
  });
});
