import { describe, expect, it } from "vitest";

import { toMcpTextResult } from "./toMcpTextResult";

describe("toMcpTextResult", () => {
  it("wraps text in one content block without isError by default", () => {
    expect(toMcpTextResult("ok")).toEqual({
      content: [{ type: "text", text: "ok" }],
    });
    expect(toMcpTextResult("ok", false)).toEqual({
      content: [{ type: "text", text: "ok" }],
    });
  });

  it("sets isError only when true", () => {
    expect(toMcpTextResult("denied", true)).toEqual({
      content: [{ type: "text", text: "denied" }],
      isError: true,
    });
  });
});
