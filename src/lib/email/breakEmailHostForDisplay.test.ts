import { describe, expect, it } from "vitest";

import breakEmailHostForDisplay from "./breakEmailHostForDisplay";

describe("breakEmailHostForDisplay", () => {
  it("inserts zero-width spaces between host label dots", () => {
    expect(breakEmailHostForDisplay("www.agentwitch.com")).toBe(
      "www&#8203;.agentwitch&#8203;.com",
    );
  });
});
