import { describe, expect, it } from "vitest";

import {
  encodeProjectMessengerCursor,
} from "@/lib/projects/acl/messaging/messenger/projectMessengerCursor";
import { loadProjectMessengerOlderFromLocal } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerOlderFromLocal";

describe("loadProjectMessengerOlderFromLocal (History public-api)", () => {
  it("returns empty newest-first page when local history has no rows", async () => {
    await expect(
      loadProjectMessengerOlderFromLocal({
        projectId: "proj-no-local-history",
        threadKey: "whole",
        limit: 50,
      }),
    ).resolves.toEqual({
      entries: [],
      nextBeforeCursor: null,
      hasMore: false,
    });
  });

  it("returns empty for invalid beforeCursor (History contract)", async () => {
    await expect(
      loadProjectMessengerOlderFromLocal({
        projectId: "proj-no-local-history",
        threadKey: "whole",
        beforeCursor: "not-a-cursor",
        limit: 10,
      }),
    ).resolves.toEqual({
      entries: [],
      nextBeforeCursor: null,
      hasMore: false,
    });
  });

  it("accepts a valid opaque cursor without throwing", async () => {
    const beforeCursor = encodeProjectMessengerCursor({
      t: "2026-10-07T08:00:00.123456Z",
      id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    });
    await expect(
      loadProjectMessengerOlderFromLocal({
        projectId: "proj-no-local-history",
        threadKey: "whole",
        beforeCursor,
        limit: 10,
      }),
    ).resolves.toEqual({
      entries: [],
      nextBeforeCursor: null,
      hasMore: false,
    });
  });
});
