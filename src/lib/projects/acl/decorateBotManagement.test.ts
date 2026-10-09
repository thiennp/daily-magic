import { describe, expect, it } from "vitest";

import type { MembershipView } from "@/lib/projects/acl/buildProjectAccessViews";
import { decorateBotManagement } from "@/lib/projects/acl/decorateBotManagement";
import { PRODUCT_CONNECT_UPDATES_CATALOG_VERSION as LATEST } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";

const member = (over: Partial<MembershipView>) =>
  ({ id: "m", memberKind: "bot", ...over }) as MembershipView;

describe("decorateBotManagement", () => {
  it("lets the owner manage every assistant, an inviter only their own", () => {
    const bots = [
      member({ id: "a", invitedByUserId: "u2" }),
      member({ id: "b", invitedByUserId: "u3" }),
    ];
    expect(
      decorateBotManagement(bots, { userId: "owner", isOwner: true }).map(
        (m) => m.canManageBot,
      ),
    ).toEqual([true, true]);
    expect(
      decorateBotManagement(bots, { userId: "u2", isOwner: false }).map(
        (m) => m.canManageBot,
      ),
    ).toEqual([true, false]);
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
