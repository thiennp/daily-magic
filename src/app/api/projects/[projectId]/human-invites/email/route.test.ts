import { beforeEach, describe, expect, it, vi } from "vitest";

const sendInvite = vi.hoisted(() => vi.fn());
const requireAuth = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/humanInvites/sendHumanProjectEmailInvite", () => ({
  sendHumanProjectEmailInvite: sendInvite,
}));

import { POST } from "@/app/api/projects/[projectId]/human-invites/email/route";

const invite = {
  id: "inv-1",
  projectId: "proj-1",
  createdByUserId: "owner-1",
  email: "ada@example.org",
  requireEmailMatch: false,
  role: "member",
  maxUses: 1,
  usesRemaining: 1,
  expiresAt: "2026-10-14T00:00:00.000Z",
  revokedAt: null,
  redeemedAt: null,
  redeemedByUserId: null,
  createdAt: "2026-10-07T00:00:00.000Z",
  status: "pending",
  delivery: "email",
  requiresApproval: true,
  emailSentAt: "2026-10-07T00:00:01.000Z",
  acceptedAt: null,
  acceptedByUserId: null,
  acceptedDisplayName: null,
  decidedAt: null,
};

const post = (body: unknown) =>
  POST(
    new Request("http://local/e", {
      method: "POST",
      body: JSON.stringify(body),
    }),
    {
      params: Promise.resolve({ projectId: "proj-1" }),
    },
  );

describe("POST /api/projects/[projectId]/human-invites/email", () => {
  beforeEach(() => {
    sendInvite.mockReset();
    requireAuth.mockReset();
    requireAuth.mockResolvedValue({
      actor: { id: "owner-1", email: "o@x.com" },
      error: null,
    });
  });

  it("201 with list item; no token or link in the response", async () => {
    sendInvite.mockResolvedValue({ ok: true, invite });
    const response = await post({ email: "ada@example.org", role: "member" });
    expect(response.status).toBe(201);
    const body = await response.json();
    expect(body.invite).toMatchObject({
      inviteId: "inv-1",
      email: "ada@example.org",
      delivery: "email",
      status: "pending",
      requiresApproval: true,
    });
    const raw = JSON.stringify(body);
    expect(raw).not.toMatch(/token|invite\/h\//);
    expect(sendInvite).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: "proj-1",
        ownerUserId: "owner-1",
        email: "ada@example.org",
      }),
    );
  });

  it.each([
    ["forbidden", 403],
    ["not_found", 404],
    ["invalid_email", 400],
    ["already_invited", 409],
    ["rate_limited", 429],
    ["email_not_configured", 503],
    ["email_send_failed", 502],
  ])("%s → %i with plain errorMessage", async (code, status) => {
    sendInvite.mockResolvedValue({ ok: false, code });
    const response = await post({ email: "x@y.com" });
    expect(response.status).toBe(status);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(typeof body.errorMessage).toBe("string");
    expect(body.errorMessage).not.toMatch(/_/);
  });
});
