import { describe, expect, it } from "vitest";

import { sanitizeProfileEmailForDir } from "./resolveAgentWitchLocalLayout";

describe("sanitizeProfileEmailForDir", () => {
  it("keeps an ordinary address as one lowercase folder name", () => {
    expect(sanitizeProfileEmailForDir("  Owner@Example.com ")).toBe(
      "owner@example.com",
    );
  });

  it("refuses anything that could leave profiles/", () => {
    for (const evil of ["../../../x", "a/b", "a\\b", "..", ".", "a\u0000b"]) {
      expect(() => sanitizeProfileEmailForDir(evil)).toThrow();
    }
  });
});
