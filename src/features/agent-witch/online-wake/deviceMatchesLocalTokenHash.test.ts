import { describe, expect, it } from "vitest";

import { deviceMatchesLocalTokenHash } from "./deviceMatchesLocalTokenHash";

describe("deviceMatchesLocalTokenHash (HOME-029)", () => {
  it("matches equal token hashes case-insensitively", () => {
    expect(deviceMatchesLocalTokenHash("abc123def456", "ABC123DEF456")).toBe(
      true,
    );
  });

  it("rejects hostname-only identity (null device token hash)", () => {
    expect(deviceMatchesLocalTokenHash(null, "abc123")).toBe(false);
  });

  it("rejects mismatched token hashes", () => {
    expect(deviceMatchesLocalTokenHash("token-a", "token-b")).toBe(false);
  });
});
