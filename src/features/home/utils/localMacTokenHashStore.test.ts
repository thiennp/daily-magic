import { describe, expect, it, beforeEach } from "vitest";

import {
  getLocalMacTokenHashSnapshot,
  setLocalMacTokenHash,
  subscribeLocalMacTokenHash,
} from "@/features/home/utils/localMacTokenHashStore";

describe("localMacTokenHashStore (HOME-031)", () => {
  beforeEach(() => {
    setLocalMacTokenHash(null);
  });

  it("stores and notifies subscribers when the token hash changes", () => {
    const seen: Array<string | null> = [];
    const unsubscribe = subscribeLocalMacTokenHash(() => {
      seen.push(getLocalMacTokenHashSnapshot());
    });

    setLocalMacTokenHash("ABC123");
    expect(getLocalMacTokenHashSnapshot()).toBe("abc123");
    expect(seen).toEqual(["abc123"]);

    setLocalMacTokenHash("ABC123");
    expect(seen).toEqual(["abc123"]);

    unsubscribe();
    setLocalMacTokenHash("def456");
    expect(seen).toEqual(["abc123"]);
  });
});
