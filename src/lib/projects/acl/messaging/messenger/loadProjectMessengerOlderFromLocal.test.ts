import { describe, expect, it } from "vitest";

import { loadProjectMessengerOlderFromLocal } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerOlderFromLocal";

describe("loadProjectMessengerOlderFromLocal (History stub)", () => {
  it("returns empty newest-first contract until History lands", async () => {
    await expect(
      loadProjectMessengerOlderFromLocal({
        projectId: "proj",
        threadKey: "whole",
        limit: 50,
      }),
    ).resolves.toEqual({
      entries: [],
      nextBeforeCursor: null,
      hasMore: false,
    });
  });
});
