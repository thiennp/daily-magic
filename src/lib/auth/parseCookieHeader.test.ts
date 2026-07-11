import { describe, expect, it } from "vitest";

import parseCookieHeader from "./parseCookieHeader";

describe("parseCookieHeader", () => {
  it("parses cookie header values", () => {
    expect(
      parseCookieHeader("authjs.session-token=abc123; other=value"),
    ).toEqual({
      "authjs.session-token": "abc123",
      other: "value",
    });
  });
});
