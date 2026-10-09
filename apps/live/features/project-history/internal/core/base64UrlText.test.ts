import { describe, expect, it } from "vitest";

import { decodeBase64UrlText, encodeBase64UrlText } from "./base64UrlText";

describe("base64UrlText", () => {
  const text = JSON.stringify({
    t: "2026-10-09T10:00:00.000Z",
    id: "ünï-✓/+?",
  });

  it("matches Node's base64url and round-trips non-ASCII text", () => {
    const encoded = encodeBase64UrlText(text);
    expect(encoded).toBe(Buffer.from(text, "utf8").toString("base64url"));
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(decodeBase64UrlText(encoded)).toBe(text);
  });

  it("decodes what Buffer produced and throws on garbage", () => {
    expect(decodeBase64UrlText(Buffer.from(text).toString("base64url"))).toBe(
      text,
    );
    expect(() => decodeBase64UrlText("not base64!!")).toThrow();
  });
});
