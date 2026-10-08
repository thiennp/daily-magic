import { describe, expect, it } from "vitest";

import { formatWakeConnectPasteHint as hint } from "@/features/projects/access/utils/formatWakeConnectPasteHint";

describe("formatWakeConnectPasteHint (DF-036 F9 brief strings)", () => {
  it("nothing to say when ready or empty", () => {
    expect(hint(null, "Nova")).toBeNull();
  });

  it("errors read as --bad text", () => {
    expect(hint("bad", "Nova")).toEqual({
      text: "That doesn't look like a wake link. Copy it again from Grok Bot.",
      bad: true,
    });
    expect(hint("https", "Nova")).toEqual({
      text: "The wake link must start with https://",
      bad: true,
    });
    expect(hint("two", "Nova")?.text).toBe(
      "That's more than one address. Paste only the wake link here.",
    );
    expect(hint("long", "Nova")?.text).toBe(
      "That key is too long. Copy it again from Grok Bot.",
    );
  });

  it("no nickname: asks for one first, whatever was pasted", () => {
    expect(hint(null, null)?.bad).toBe(true);
    expect(hint("bad", "  ")?.text).toContain(
      "a nickname first, then connect the wake link.",
    );
  });
});
