import { describe, expect, it } from "vitest";

import { inboxDispatchPeerOptions } from "@/features/projects/access/inbox/utils/inboxDispatchPeerOptions";

describe("inboxDispatchPeerOptions", () => {
  it("keeps agent members with nicknames only", () => {
    const options = inboxDispatchPeerOptions([
      {
        id: "1",
        projectDisplayName: "Bot A",
        isAgent: true,
      },
      {
        id: "2",
        projectDisplayName: null,
        isAgent: true,
      },
      {
        id: "3",
        projectDisplayName: "Human",
        isAgent: false,
      },
      {
        id: "4",
        projectDisplayName: "  ",
        isAgent: true,
      },
    ]);
    expect(options).toEqual([
      {
        membershipId: "1",
        projectDisplayName: "Bot A",
        memberKind: "bot",
      },
    ]);
  });

  it("includes assignable computers even when isAgent is false", () => {
    const options = inboxDispatchPeerOptions([
      {
        id: "comp-1",
        projectDisplayName: "This computer",
        isAgent: false,
        memberKind: "computer",
        assignable: true,
        connectVersionStatus: "ok",
      },
      {
        id: "comp-offline",
        projectDisplayName: "Office Mac",
        isAgent: false,
        memberKind: "computer",
        assignable: false,
        connectVersionStatus: "ok",
      },
      {
        id: "comp-old",
        projectDisplayName: "Old Mac",
        isAgent: false,
        memberKind: "computer",
        assignable: true,
        connectVersionStatus: "too_old",
      },
      {
        id: "bot-1",
        projectDisplayName: "Planner",
        isAgent: true,
        memberKind: "bot",
      },
    ]);
    expect(options).toEqual([
      {
        membershipId: "comp-1",
        projectDisplayName: "This computer · computer",
        memberKind: "computer",
      },
      {
        membershipId: "bot-1",
        projectDisplayName: "Planner",
        memberKind: "bot",
      },
    ]);
  });
});
