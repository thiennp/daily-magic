import { describe, expect, it } from "vitest";

import { normalizeProjectHistoryPitfallText } from "./normalizeProjectHistoryPitfallText";

describe("normalizeProjectHistoryPitfallText", () => {
  it("trims, lowercases, collapses whitespace, strips trailing punctuation", () => {
    expect(normalizeProjectHistoryPitfallText("  Foo   BAR. ")).toBe("foo bar");
    expect(normalizeProjectHistoryPitfallText("done!!")).toBe("done");
  });
});
