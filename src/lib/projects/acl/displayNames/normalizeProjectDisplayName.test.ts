import { describe, expect, it } from "vitest";

import {
  normalizeProjectDisplayNameKey,
  validateProjectDisplayName,
} from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";

describe("validateProjectDisplayName", () => {
  it('allows "Soft Vale" (single internal space)', () => {
    const result = validateProjectDisplayName("Soft Vale");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.name).toBe("Soft Vale");
      expect(result.key).toBe("soft vale");
    }
  });

  it("allows multi-word nicknames with single spaces", () => {
    const result = validateProjectDisplayName("Grok Bot Grey C");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.name).toBe("Grok Bot Grey C");
    }
  });

  it('rejects empty string and whitespace-only', () => {
    expect(validateProjectDisplayName("").ok).toBe(false);
    expect(validateProjectDisplayName("   ").ok).toBe(false);
    const empty = validateProjectDisplayName("");
    const spaces = validateProjectDisplayName("   ");
    if (!empty.ok) expect(empty.code).toBe("missing");
    if (!spaces.ok) expect(spaces.code).toBe("missing");
  });

  it("trims leading and trailing spaces before validate/store", () => {
    const result = validateProjectDisplayName("  Soft Vale  ");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.name).toBe("Soft Vale");
      expect(result.key).toBe("soft vale");
    }
  });

  it("rejects double / multi spaces (Product rejects; no collapse)", () => {
    expect(validateProjectDisplayName("Soft  Vale").ok).toBe(false);
    expect(validateProjectDisplayName("Grok  Bot").ok).toBe(false);
  });

  it("uniqueness key is case-insensitive (collision still same key)", () => {
    expect(normalizeProjectDisplayNameKey("Soft Vale")).toBe(
      normalizeProjectDisplayNameKey("soft vale"),
    );
    expect(normalizeProjectDisplayNameKey("Soft Vale")).toBe(
      normalizeProjectDisplayNameKey("SOFT VALE"),
    );
  });

  it("rejects reserved names", () => {
    const result = validateProjectDisplayName("owner");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("reserved");
    }
  });

  it("rejects @ / and controls", () => {
    expect(validateProjectDisplayName("bad/name").ok).toBe(false);
    expect(validateProjectDisplayName("has@at").ok).toBe(false);
  });

  it("accepts hyphenated and apostrophe letter tokens", () => {
    expect(validateProjectDisplayName("Jean-Luc").ok).toBe(true);
    expect(validateProjectDisplayName("O'Brien").ok).toBe(true);
    expect(validateProjectDisplayName("Buni").ok).toBe(true);
  });
});
