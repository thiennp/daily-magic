import { describe, expect, it } from "vitest";

import { isCodingToolsPauseOriginAllowed } from "./tryHandleCodingToolsPauseLocalRequest";

describe("isCodingToolsPauseOriginAllowed (H6 discovered port)", () => {
  it("allows no Origin (curl) and the AWL page on its discovered port", () => {
    expect(isCodingToolsPauseOriginAllowed(undefined)).toBe(true);
    expect(
      isCodingToolsPauseOriginAllowed(
        "http://127.0.0.1:65376",
        "127.0.0.1:65376",
      ),
    ).toBe(true);
    expect(
      isCodingToolsPauseOriginAllowed(
        "http://localhost:65380",
        "localhost:65380",
      ),
    ).toBe(true);
  });

  it("rejects other sites and cross-port loopback pages", () => {
    expect(
      isCodingToolsPauseOriginAllowed(
        "https://evil.example",
        "127.0.0.1:65376",
      ),
    ).toBe(false);
    expect(
      isCodingToolsPauseOriginAllowed(
        "http://127.0.0.1:3000",
        "127.0.0.1:65376",
      ),
    ).toBe(false);
    expect(
      isCodingToolsPauseOriginAllowed(
        "http://evil.example:80",
        "evil.example:80",
      ),
    ).toBe(false);
  });
});
