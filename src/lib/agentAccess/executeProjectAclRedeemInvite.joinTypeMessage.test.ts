import { describe, expect, it, vi } from "vitest";

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

const pendingResult = {
  ok: true as const,
  projectId: "proj-1",
  status: "pending" as const,
  namingRequired: true as const,
  suggestedProjectDisplayName: null,
  request: { id: "req-1" },
};
const activeResult = (deliveryMode: "poll" | "webhook") => ({
  ok: true as const,
  projectId: "proj-1",
  status: "active" as const,
  request: { id: "req-1" },
  membership: { id: "m-1", projectDisplayName: "Coder", deliveryMode },
  projectApiKey: null,
  suggestedProjectDisplayName: "Coder",
});
const messageOf = async (
  joinType: string | undefined,
  result: unknown,
): Promise<string> => {
  redeemMock.mockResolvedValueOnce(result as never);
  const out = await redeemWith(joinType ? { joinType } : {});
  return String(JSON.parse(out?.text ?? "{}").message);
};

describe("redeem_project_invite response message by joinType", () => {
  it.each(["claude", "chatgpt", "copilot_studio", "other"])(
    "%s pending → poll guidance, no Grok routine",
    async (joinType) => {
      const msg = await messageOf(joinType, pendingResult);
      expect(msg).toContain("Check the inbox when your human asks.");
      expect(msg).toContain("call set_my_project_delivery_mode.");
      expect(msg).not.toContain("Grok");
    },
  );

  it("claude active in poll → poll guidance", async () => {
    const msg = await messageOf("claude", activeResult("poll"));
    expect(msg).toContain("Check the inbox when your human asks.");
    expect(msg).not.toContain("Grok");
  });

  it.each([
    ["no joinType", undefined],
    ["grok-bot", "grok-bot"],
  ])("%s → existing Grok wake-routine text", async (_label, joinType) => {
    expect(await messageOf(joinType, pendingResult)).toContain(
      "create your Grok webhook-triggered routine",
    );
    expect(await messageOf(joinType, activeResult("webhook"))).toContain(
      "Immediately create your Grok webhook-triggered routine",
    );
  });
});
