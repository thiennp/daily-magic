import { beforeEach, describe, expect, it, vi } from "vitest";

import { AGENT_ACCESS_MUTATING_TOOLS } from "@/lib/agentAccess/agentAccess.constant";
import { AGENT_ACCESS_TOOLS } from "@/lib/agentAccess/agentAccessTools.constant";
import { executeCreateProjectAssistantInviteTool } from "@/lib/agentAccess/executeCreateProjectAssistantInviteTool";
import type { AgentAccessActor } from "@/lib/agentAccess/resolveAgentAccessActor";
import { createBotProjectInvite } from "@/lib/projects/acl/invites/botInvites/createBotProjectInvite";
import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";
import { BOT_MADE_INVITE_ROW } from "@/lib/projects/acl/invites/botInvites/botProjectInvite.fixtures";
import { isProjectApiKeyMcpTool } from "@/lib/projects/acl/projectApiKeys/projectApiKeyMcpAllowlist.constant";

vi.mock("@/lib/projects/acl/invites/botInvites/createBotProjectInvite", () => ({ createBotProjectInvite: vi.fn() }));

const actor = { id: "bot-inviter", email: "b@agents.invalid", name: null, globalRole: "user", registrationMethod: "none" } as unknown as AgentAccessActor;
const NAME = "create_project_assistant_invite";
const run = (args: unknown) => executeCreateProjectAssistantInviteTool({ actor, name: NAME, args });
const parse = (text: string | undefined) => JSON.parse(text ?? "{}") as Record<string, unknown>;

describe("create_project_assistant_invite tool", () => {
  beforeEach(() => vi.clearAllMocks());

  it("is in the MCP catalog, counted as a mutation, and not callable with awc_proj_ keys", () => {
    expect(AGENT_ACCESS_TOOLS.map((tool) => tool.name)).toContain(NAME);
    expect(AGENT_ACCESS_MUTATING_TOOLS).toContain(NAME);
    expect(isProjectApiKeyMcpTool(NAME)).toBe(false);
  });

  it("ignores other tool names and requires projectId", async () => {
    expect(await executeCreateProjectAssistantInviteTool({ actor, name: "x", args: {} })).toBeNull();
    const missing = await run({});
    expect(missing?.isError).toBe(true);
    expect(vi.mocked(createBotProjectInvite)).not.toHaveBeenCalled();
  });

  it("passes the bearer actor (never an arg) and maps rejects to code forbidden + reason", async () => {
    vi.mocked(createBotProjectInvite).mockResolvedValue({ ok: false, code: "inviter_not_same_owner" });
    const result = await run({ projectId: "proj-1", role: "owner", actorUserId: "owner-1" });
    expect(vi.mocked(createBotProjectInvite)).toHaveBeenCalledWith(expect.objectContaining({ actorUserId: "bot-inviter", role: "owner" }));
    expect(result?.isError).toBe(true);
    expect(parse(result?.text)).toMatchObject({ ok: false, code: "forbidden", reason: "inviter_not_same_owner" });
  });

  it("maps rate limits to code rate_limited with retryAfterSeconds", async () => {
    vi.mocked(createBotProjectInvite).mockResolvedValue({ ok: false, code: "rate_limited", scope: "project", retryAfterSeconds: 60 });
    expect(parse((await run({ projectId: "proj-1" }))?.text)).toMatchObject({
      code: "rate_limited", reason: "bot_invite_rate_limited_project", retryAfterSeconds: 60,
    });
  });

  it("returns the one-time token with role member and 1 use", async () => {
    vi.mocked(createBotProjectInvite).mockResolvedValue({
      ok: true, invite: mapProjectInviteRow({ ...BOT_MADE_INVITE_ROW, uses_remaining: 1 }), token: "tok".repeat(8), url: "https://x/invite/p/tok",
    });
    const body = parse((await run({ projectId: "proj-1" }))?.text);
    expect(body).toMatchObject({ ok: true, inviteId: "inv-bot-1", token: "tok".repeat(8), role: "member", maxUses: 1 });
  });
});
