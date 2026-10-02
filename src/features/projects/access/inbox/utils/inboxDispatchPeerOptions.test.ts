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
      { membershipId: "1", projectDisplayName: "Bot A" },
    ]);
  });
});
