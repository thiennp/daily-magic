import { describe, expect, it } from "vitest";

import {
  isBotIsolationBlocked,
  type IsolationSeat,
} from "@/lib/projects/acl/messaging/decideBotIsolation";

const bot = (
  invitedByUserId: string | null,
  isolated = false,
): IsolationSeat => ({
  memberKind: "bot",
  invitedByUserId,
  isolated,
});
const human: IsolationSeat = {
  memberKind: "human",
  invitedByUserId: null,
  isolated: false,
};

describe("isBotIsolationBlocked", () => {
  it("never blocks when neither bot is isolated", () => {
    expect(isBotIsolationBlocked(bot("a"), bot("b"))).toBe(false);
  });
  it("blocks an isolated bot from another person's bot, both directions", () => {
    expect(isBotIsolationBlocked(bot("a", true), bot("b"))).toBe(true);
    expect(isBotIsolationBlocked(bot("b"), bot("a", true))).toBe(true);
  });
  it("allows bots invited by the same person", () => {
    expect(isBotIsolationBlocked(bot("a", true), bot("a"))).toBe(false);
  });
  it("blocks an isolated bot from a bot with an unknown inviter", () => {
    expect(isBotIsolationBlocked(bot("a", true), bot(null))).toBe(true);
    expect(isBotIsolationBlocked(bot(null, true), bot(null))).toBe(true);
  });
  it("never restricts messages with people, owner or computers", () => {
    expect(isBotIsolationBlocked(bot("a", true), human)).toBe(false);
    expect(isBotIsolationBlocked(human, bot("a", true))).toBe(false);
  });
});
