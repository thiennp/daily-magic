import { describe, expect, it } from "vitest";

import buildOverviewAttentionItems from "@/features/projects/overview/buildOverviewAttentionItems";

describe("buildOverviewAttentionItems", () => {
  it("is empty when nothing needs the owner", () => {
    expect(
      buildOverviewAttentionItems({
        pendingRunCount: 0,
        joinRequestCount: 0,
        unread: null,
      }),
    ).toEqual([]);
  });

  it("lists approvals before unread messages", () => {
    expect(
      buildOverviewAttentionItems({
        pendingRunCount: 2,
        joinRequestCount: 1,
        unread: { assistantName: "Magi", membershipId: "m1" },
      }),
    ).toEqual([
      { kind: "run", count: 2 },
      { kind: "join", count: 1 },
      { kind: "unread", assistantName: "Magi", membershipId: "m1" },
    ]);
  });

  it("lists skill questions after approvals", () => {
    expect(
      buildOverviewAttentionItems({
        pendingRunCount: 1,
        joinRequestCount: 0,
        skillQuestionCount: 2,
        unread: null,
      }),
    ).toEqual([
      { kind: "run", count: 1 },
      { kind: "skill", count: 2 },
    ]);
  });

  it("skips zero counts", () => {
    expect(
      buildOverviewAttentionItems({
        pendingRunCount: 0,
        joinRequestCount: 3,
        unread: null,
      }),
    ).toEqual([{ kind: "join", count: 3 }]);
  });
});
