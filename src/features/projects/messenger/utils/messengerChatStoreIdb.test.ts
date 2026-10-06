import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { messengerChatStoreIdb } from "@/features/projects/messenger/utils/messengerChatStoreIdb";

describe("messengerChatStoreIdb", () => {
  it("no wipe: read/write only — no delete / clear path", () => {
    expect(Object.keys(messengerChatStoreIdb).sort()).toEqual([
      "readChat",
      "readKept",
      "writeChat",
      "writeKept",
    ]);
    const src = readFileSync(
      path.join(
        process.cwd(),
        "src/features/projects/messenger/utils/messengerChatStoreIdb.ts",
      ),
      "utf8",
    );
    expect(src).not.toMatch(
      /\.delete\(|\.clear\(|deleteDatabase|deleteObjectStore/,
    );
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
  });
});
