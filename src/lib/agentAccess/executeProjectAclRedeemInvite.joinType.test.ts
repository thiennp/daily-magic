import { beforeEach, describe, expect, it, vi } from "vitest";

import { AGENT_ACCESS_REDEEM_PROJECT_INVITE_TOOL } from "@/lib/agentAccess/agentAccessRedeemProjectInviteTool.constant";
import { executeProjectAclRedeemInviteTool } from "@/lib/agentAccess/executeProjectAclRedeemInviteTool";
import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";

vi.mock("@/lib/projects/acl/invites/redeemProjectInvite", () => ({
  redeemProjectInvite: vi.fn(async () => ({ ok: false, code: "owner" })),
}));

const redeemMock = vi.mocked(redeemProjectInvite);

const actor = {
  id: "bot-1",
  email: "agt@agents.agentwitch.com",
  name: "Bot",
  globalRole: "user" as const,
  registrationMethod: "none" as const,
};

const redeemWith = (args: Record<string, unknown>) =>
  executeProjectAclRedeemInviteTool({
    actor,
    name: "redeem_project_invite",
    args: { token: "tok", ...args },
  });

describe("redeem_project_invite joinType → join platform", () => {
  beforeEach(() => redeemMock.mockClear());

  it.each([
    ["claude", "claude"],
    ["chatgpt", "chatgpt"],
    ["copilot_studio", "copilot_studio"],
    ["other", "other"],
    ["grok-bot", "grok"],
  ])("joinType %s → joinPlatform %s", async (joinType, joinPlatform) => {
    await redeemWith({ joinType });
    expect(redeemMock).toHaveBeenCalledWith(
      expect.objectContaining({ joinPlatform }),
    );
  });

  it("missing or unknown joinType → null (invite platform applies)", async () => {
    await redeemWith({});
    await redeemWith({ joinType: "made-up" });
    for (const call of redeemMock.mock.calls) {
      expect(call[0].joinPlatform).toBeNull();
    }
  });

  it("schema accepts joinType (additionalProperties stays false)", () => {
    const schema = AGENT_ACCESS_REDEEM_PROJECT_INVITE_TOOL.inputSchema;
    expect(schema.properties).toHaveProperty("joinType");
    expect(
      (schema.properties as Record<string, { description?: string }>).joinType
        ?.description,
    ).toBe(
      "Optional. Your assistant type id from types[] in GET /join/{inviteToken} (for example claude, chatgpt, copilot, muse, other; Copilot Studio agents may pass copilot_studio). Types without a wake link start in poll mode (Checks on demand); muse switches to webhook once register_project_webhook saves its wake link. grok-bot starts in webhook mode. On an invite with no type set, if you omit it or send an unknown value, you start in poll mode (Checks on demand).",
    );
    expect(schema.additionalProperties).toBe(false);
  });
});
