import { beforeEach, describe, expect, it, vi } from "vitest";

import { executeProjectAclRedeemInviteTool } from "@/lib/agentAccess/executeProjectAclRedeemInviteTool";
import { redeemProjectInvite } from "@/lib/projects/acl/invites/redeemProjectInvite";

vi.mock("@/lib/projects/acl/invites/redeemProjectInvite", () => ({
  redeemProjectInvite: vi.fn(),
}));

const redeemMock = vi.mocked(redeemProjectInvite);

const actor = {
  id: "bot-1",
  email: "agt@agents.agentwitch.com",
  name: "Bot",
  globalRole: "user" as const,
  registrationMethod: "none" as const,
};

describe("executeProjectAclRedeemInviteTool suggested name", () => {
  beforeEach(() => {
    redeemMock.mockReset();
  });

  it("passes suggestedProjectDisplayName through", async () => {
    redeemMock.mockResolvedValue({
      ok: true,
      projectId: "proj-1",
      status: "pending",
      namingRequired: true,
      suggestedProjectDisplayName: "Soft Vale",
      request: {
        id: "req-1",
        projectId: "proj-1",
        requesterUserId: "bot-1",
        invitedByUserId: "owner-1",
        reason: "invite_redeem",
        requestedScopes: [],
        status: "pending",
        decidedByUserId: null,
        decidedAt: null,
        createdAt: "2026-10-02T00:00:00.000Z",
        expiresAt: "2026-10-16T00:00:00.000Z",
        inviteId: "inv-1",
        teamLabel: null,
        suggestedProjectDisplayName: "Soft Vale",
      },
    });
    const result = await executeProjectAclRedeemInviteTool({
      actor,
      name: "redeem_project_invite",
      args: { token: "tok", suggestedProjectDisplayName: "Soft Vale" },
    });
    expect(result).not.toBeNull();
    expect(redeemMock).toHaveBeenCalledWith(
      expect.objectContaining({
        suggestedProjectDisplayName: "Soft Vale",
      }),
    );
    expect(result?.text).toContain("Soft Vale");
  });

  it("accepts projectDisplayName alias", async () => {
    redeemMock.mockResolvedValue({
      ok: false,
      code: "display_name_taken",
    });
    const result = await executeProjectAclRedeemInviteTool({
      actor,
      name: "redeem_project_invite",
      args: { token: "tok", projectDisplayName: "Buni" },
    });
    expect(redeemMock).toHaveBeenCalledWith(
      expect.objectContaining({
        suggestedProjectDisplayName: "Buni",
      }),
    );
    expect(result?.isError).toBe(true);
    expect(result?.text).toContain("DISPLAY_NAME_TAKEN");
  });
});
