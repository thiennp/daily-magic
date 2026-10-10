import { describe, expect, it } from "vitest";

import {
  countRailMembers,
  countRailWaiting,
} from "@/features/projects/members/utils/countRailMembers";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/public-api/types";

const seat = (id: string, x: Record<string, unknown>) => ({
  id,
  userId: `u-${id}`,
  isAgent: false,
  ...x,
});

describe("countRailMembers (DF-036 'Members · {n}')", () => {
  it("just you: 1", () => {
    expect(countRailMembers([])).toBe(1);
  });

  it("baby-care: you + Overnight + NRG Lead = 3; computer seat not counted", () => {
    const members = [
      seat("o", { isAgent: true, memberKind: "bot" }),
      seat("n", { isAgent: true }),
      seat("c", { isAgent: true, memberKind: "computer" }),
    ];
    expect(countRailMembers(members)).toBe(3);
  });

  it("joined person counts; left person and owner seat do not double count", () => {
    const members = [
      seat("p", { role: "member", memberKind: "human" }),
      seat("gone", { role: "member", status: "revoked" }),
      seat("me", { role: "owner" }),
    ];
    expect(countRailMembers(members)).toBe(2);
  });

  it("header copy reads 'Members · {n}'", () => {
    expect(C.columnLabelCount(3)).toBe("Members · 3");
  });

  it("F5 '{k} waiting' = person invites + join requests + unused assistant invites", () => {
    expect(
      countRailWaiting({
        peopleInvites: 1,
        joinRequests: 0,
        assistantInvites: 1,
      }),
    ).toBe(2);
    expect(
      countRailWaiting({
        peopleInvites: 0,
        joinRequests: 0,
        assistantInvites: 0,
      }),
    ).toBe(0);
    expect(C.waitingPill(2)).toBe("2 waiting");
  });
});
