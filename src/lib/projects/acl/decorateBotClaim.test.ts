import { beforeEach, describe, expect, it, vi } from "vitest";

import type { MembershipView } from "@/lib/projects/acl/buildProjectAccessViews";

const ownedMock = vi.hoisted(() => vi.fn());
const choicesMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/projects/acl/loadViewerOwnedBotUserIds", () => ({
  loadViewerOwnedBotUserIds: ownedMock,
}));
vi.mock("@/lib/projects/acl/buildInviterChoices", () => ({
  buildInviterChoices: choicesMock,
}));

import { decorateBotClaim } from "@/lib/projects/acl/decorateBotClaim";

const bot = (userId: string, invitedByUserId: string | null) =>
  ({
    id: `m-${userId}`,
    userId,
    memberKind: "bot",
    invitedByUserId,
  }) as MembershipView;
const viewer = { userId: "me", canWrite: true, ownerUserId: "owner" };
const CHOICES = [{ userId: "me", label: "Me", isYou: true }];

describe("decorateBotClaim", () => {
  beforeEach(() => {
    ownedMock.mockReset().mockResolvedValue(new Set());
    choicesMock.mockReset().mockResolvedValue(CHOICES);
  });

  it("offers Claim on an unclaimed assistant to the person who owns it, with their choices", async () => {
    ownedMock.mockResolvedValue(new Set(["b1"]));
    const [m] = await decorateBotClaim([bot("b1", null)], viewer);
    expect(m).toMatchObject({
      canClaimBot: true,
      canChangeInviter: true,
      inviterChoices: CHOICES,
    });
  });

  it("offers Claim to the project owner, but not to a member who does not own the assistant", async () => {
    const [byOwner] = await decorateBotClaim([bot("b1", null)], {
      ...viewer,
      userId: "owner",
    });
    const [byMember] = await decorateBotClaim([bot("b1", null)], viewer);
    expect(byOwner).toMatchObject({ canClaimBot: true });
    expect(byMember).not.toHaveProperty("canClaimBot");
  });

  it("does not offer Claim to viewers or on an assistant someone already claimed", async () => {
    const [viewerSees] = await decorateBotClaim([bot("b1", null)], {
      ...viewer,
      canWrite: false,
    });
    const [claimed] = await decorateBotClaim([bot("b2", "u2")], viewer);
    expect(viewerSees).not.toHaveProperty("canClaimBot");
    expect(claimed).not.toHaveProperty("canClaimBot");
    expect(choicesMock).not.toHaveBeenCalled();
  });

  it("lets the bot's owner change the inviter even when it is claimed", async () => {
    ownedMock.mockResolvedValue(new Set(["b2"]));
    const [m] = await decorateBotClaim([bot("b2", "u2")], viewer);
    expect(m).toMatchObject({ canClaimBot: false, canChangeInviter: true });
  });
});
