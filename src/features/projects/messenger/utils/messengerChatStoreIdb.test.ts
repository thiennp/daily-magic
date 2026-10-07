import { describe, expect, it } from "vitest";

import { messengerChatStoreIdb } from "@/features/projects/messenger/utils/messengerChatStoreIdb";

describe("messengerChatStoreIdb", () => {
  it("read/write + privacy clear (sign-out / leave) — S5", () => {
    expect(Object.keys(messengerChatStoreIdb).sort()).toEqual([
      "clearAll",
      "clearProject",
      "readChat",
      "readKept",
      "writeChat",
      "writeKept",
    ]);
  });

  it("is a quiet no-op when IndexedDB is missing (SSR)", async () => {
    expect(await messengerChatStoreIdb.readChat("p1:whole")).toBeNull();
    expect(
      await messengerChatStoreIdb.writeKept({
        keptKey: "p1:m1",
        projectId: "p1",
        memberKey: "m1",
        recipient: null,
        updatedAt: "2026-10-06T12:00:00.000Z",
        schemaVersion: 1,
      }),
    ).toBe(false);
    expect(await messengerChatStoreIdb.clearProject("p1")).toBe(false);
    expect(await messengerChatStoreIdb.clearAll()).toBe(false);
  });
});
