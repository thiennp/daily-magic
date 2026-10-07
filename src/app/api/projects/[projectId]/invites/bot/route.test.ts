import { beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/projects/[projectId]/invites/bot/route";
import { resolveAgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import { createBotProjectInvite } from "@/lib/projects/acl/invites/botInvites/createBotProjectInvite";
import { BOT_MADE_INVITE_ROW } from "@/lib/projects/acl/invites/botInvites/botProjectInvite.fixtures";
import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";

vi.mock("@/lib/agentAccess/guardAgentAccessPost", () => ({
  guardAgentAccessPost: vi.fn(async () => null),
  agentAccessTooLargeResponse: () => new Response(null, { status: 413 }),
}));
vi.mock("@/lib/agentAccess/resolveAgentAccessActor", () => ({ resolveAgentAccessActor: vi.fn() }));
vi.mock("@/lib/projects/acl/invites/botInvites/createBotProjectInvite", () => ({ createBotProjectInvite: vi.fn() }));

const ctx = { params: Promise.resolve({ projectId: "proj-1" }) };
const post = (headers: Record<string, string>, body: unknown = { role: "member" }) =>
  POST(new Request("https://x/api/projects/proj-1/invites/bot", { method: "POST", headers, body: JSON.stringify(body) }), ctx);
const bearer = { authorization: `Bearer aw_${"a".repeat(40)}`, "content-type": "application/json" };

describe("POST /api/projects/[projectId]/invites/bot", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(resolveAgentAccessActor).mockResolvedValue({
      id: "bot-inviter", email: "b@agents.invalid", name: null, globalRole: "user", registrationMethod: "none",
    } as never);
  });

  it("401 without an agent-access bearer (session cookies and awc_proj_ keys do not count)", async () => {
    expect((await post({ cookie: "session=1" })).status).toBe(401);
    expect((await post({ authorization: "Bearer awc_proj_abc" })).status).toBe(401);
    expect(vi.mocked(createBotProjectInvite)).not.toHaveBeenCalled();
  });

  it("403 with a clear reason when the bot is not same-owner / role is elevated", async () => {
    vi.mocked(createBotProjectInvite).mockResolvedValue({ ok: false, code: "role_not_allowed" });
    const res = await post(bearer, { role: "admin" });
    expect(res.status).toBe(403);
    expect(await res.json()).toMatchObject({ ok: false, code: "forbidden", reason: "role_not_allowed" });
    expect(vi.mocked(createBotProjectInvite)).toHaveBeenCalledWith(
      expect.objectContaining({ projectId: "proj-1", actorUserId: "bot-inviter", role: "admin" }),
    );
  });

  it("429 with Retry-After on rate limit", async () => {
    vi.mocked(createBotProjectInvite).mockResolvedValue({ ok: false, code: "rate_limited", scope: "inviter", retryAfterSeconds: 120 });
    const res = await post(bearer);
    expect(res.status).toBe(429);
    expect(res.headers.get("retry-after")).toBe("120");
  });

  it("201 with the one-time token", async () => {
    vi.mocked(createBotProjectInvite).mockResolvedValue({
      ok: true, invite: mapProjectInviteRow({ ...BOT_MADE_INVITE_ROW, uses_remaining: 1 }), token: "tok".repeat(8), url: "https://x/invite/p/t",
    });
    const res = await post(bearer);
    expect(res.status).toBe(201);
    expect(await res.json()).toMatchObject({ ok: true, inviteId: "inv-bot-1", role: "member", maxUses: 1 });
  });
});
