import { describe, expect, it } from "vitest";

import { resolveLocalHarnessGroupNameFromCursorDir } from "./resolveLocalHarnessGroupNameFromCursorDir";

describe("resolveLocalHarnessGroupNameFromCursorDir", () => {
  it("uses repo folder when .cursor is at repo root", () => {
    expect(
      resolveLocalHarnessGroupNameFromCursorDir(
        "/Users/me/daily-magic/.cursor",
      ),
    ).toBe("daily-magic");
  });

  it("uses parent of agents when .cursor is under agents/", () => {
    expect(
      resolveLocalHarnessGroupNameFromCursorDir(
        "/Users/me/thiennp.github.io/agents/.cursor",
      ),
    ).toBe("thiennp.github.io");
  });
});
