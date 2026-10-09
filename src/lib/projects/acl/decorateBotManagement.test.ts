import { describe, expect, it } from "vitest";

import type { MembershipView } from "@/lib/projects/acl/buildProjectAccessViews";
import { decorateBotManagement } from "@/lib/projects/acl/decorateBotManagement";
import { PRODUCT_CONNECT_UPDATES_CATALOG_VERSION as LATEST } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";

const member = (over: Partial<MembershipView>) =>
  ({ id: "m", memberKind: "bot", ...over }) as MembershipView;

describe("decorateBotManagement", () => {
  it("lets only the inviter edit; the owner only their own or seats with no inviter", () => {
    const bots = [
      member({ id: "a", invitedByUserId: "u2" }),
      member({ id: "b", invitedByUserId: "owner" }),
      member({ id: "c", invitedByUserId: null }),
    ];
    const edit = (userId: string, isOwner: boolean) =>
      decorateBotManagement(bots, { userId, isOwner }).map(
        (m) => m.canManageBot,
      );
    expect(edit("owner", true)).toEqual([false, true, true]);
    expect(edit("u2", false)).toEqual([true, false, false]);
  });

  it("flags assistants that have not seen the newest guidance", () => {
    const out = decorateBotManagement(
      [
        member({ id: "never", guidanceSeenVersion: null }),
        member({ id: "old", guidanceSeenVersion: LATEST - 1 }),
        member({ id: "current", guidanceSeenVersion: LATEST }),
      ],
      { userId: "owner", isOwner: true },
    );
    expect(out.map((m) => m.guidanceOutdated)).toEqual([true, true, false]);
  });

  it("never sends the inviter id, and leaves people alone otherwise", () => {
    const [bot, human] = decorateBotManagement(
      [
        member({ invitedByUserId: "u2" }),
        member({ memberKind: "human", invitedByUserId: "u2" }),
      ],
      { userId: "owner", isOwner: true },
    );
    expect(bot).not.toHaveProperty("invitedByUserId");
    expect(human).not.toHaveProperty("invitedByUserId");
    expect(human).not.toHaveProperty("canManageBot");
  });
});
