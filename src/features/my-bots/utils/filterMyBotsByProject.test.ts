import { describe, expect, it } from "vitest";

import {
  countMyBotsByProject,
  filterMyBotsByProject,
} from "@/features/my-bots/utils/filterMyBotsByProject";
import type { OwnedBotView } from "@/lib/agentAccess/claimBot/listOwnedBots";

const bot = (id: string, projects: number): OwnedBotView => ({
  tokenId: id,
  botUserId: id,
  displayName: id,
  tokenPrefix: id,
  claimedAt: null,
  memberships: Array.from({ length: projects }, (_, i) => ({
    membershipId: `${id}-${i}`,
    projectId: `p${i}`,
    projectName: `P${i}`,
    projectDisplayName: null,
    teamLabel: null,
    grokWebhookRegistered: false,
  })),
});

const bots = [bot("a", 2), bot("b", 0), bot("c", 1)];

describe("filterMyBotsByProject", () => {
  it("splits bots by project membership", () => {
    expect(filterMyBotsByProject(bots, "all")).toHaveLength(3);
    expect(
      filterMyBotsByProject(bots, "in_project").map((b) => b.tokenId),
    ).toEqual(["a", "c"]);
    expect(
      filterMyBotsByProject(bots, "not_in_project").map((b) => b.tokenId),
    ).toEqual(["b"]);
  });

  it("counts each filter", () => {
    expect(countMyBotsByProject(bots)).toEqual({
      all: 3,
      in_project: 2,
      not_in_project: 1,
    });
  });
});
