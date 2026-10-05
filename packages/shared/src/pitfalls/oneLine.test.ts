import { describe, expect, it } from "vitest";

import { oneLine } from "./oneLine";

describe("oneLine", () => {
  it("collapses whitespace and newlines", () => {
    expect(oneLine("  hello\n\tworld  ")).toBe("hello world");
    expect(oneLine("a\r\nb\nc")).toBe("a b c");
  });
});
