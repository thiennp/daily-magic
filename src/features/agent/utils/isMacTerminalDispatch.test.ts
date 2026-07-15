import { describe, expect, it } from "vitest";

import { isMacTerminalDispatch } from "@/features/agent/utils/isMacTerminalDispatch";

describe("isMacTerminalDispatch", () => {
  it("returns true for local Mac sends", () => {
    expect(isMacTerminalDispatch({})).toBe(true);
    expect(isMacTerminalDispatch({ targetDeviceId: "device-1" })).toBe(true);
  });

  it("returns false for teammate dispatch", () => {
    expect(
      isMacTerminalDispatch({
        targetUserId: "user-1",
        groupId: "group-1",
      }),
    ).toBe(false);
  });
});
