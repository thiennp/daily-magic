import { describe, expect, it, vi } from "vitest";

import { shouldAutoApproveAgentAccessRequest } from "@/lib/projects/acl/shouldAutoApproveAgentAccessRequest";

vi.mock("@/lib/projects/acl/isAgentUser", () => ({
  isAgentUserId: vi.fn(async () => true),
}));
vi.mock("@/lib/agentAccess/resolveAgentLinkedOwnerUserId", () => ({
  isAgentSameProjectOwner: vi.fn(async () => true),
  resolveAgentLinkedOwnerUserId: vi.fn(async () => "owner-1"),
}));
vi.mock("@/lib/projects/acl/getActiveHumanMembershipRole", () => ({
  getActiveHumanMembershipRole: vi.fn(async () => "member"),
}));
vi.mock("@/lib/projects/acl/canAutoApproveBotForOwnerMembership", () => ({
  MEMBER_OWNER_BOT_AUTO_APPROVE_REASON: "member_owner_bot_auto_approve",
  canAutoApproveBotForOwnerMembership: vi.fn(() => true),
}));

describe("shouldAutoApproveAgentAccessRequest (silent paths removed)", () => {
  it("same-owner request stays not auto-approved", async () => {
    const decision = await shouldAutoApproveAgentAccessRequest({
      projectId: "proj-1",
      agentUserId: "bot-1",
      projectOwnerUserId: "owner-1",
      suggestedDisplayName: "Soft Vale",
    });
    expect(decision).toEqual({ autoApprove: false });
  });

  it("member-owner bot stays not auto-approved", async () => {
    const decision = await shouldAutoApproveAgentAccessRequest({
      projectId: "proj-1",
      agentUserId: "bot-1",
      projectOwnerUserId: "other-owner",
      suggestedDisplayName: "Soft Vale",
    });
    expect(decision).toEqual({ autoApprove: false });
  });
});
