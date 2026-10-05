import { describe, expect, it } from "vitest";

import {
  checkHumanAcceptNickname,
  initialHumanAcceptNickname,
  isHumanAcceptNamingError,
} from "@/features/projects/access/humanInvites/utils/resolveHumanAcceptNickname";

describe("resolveHumanAcceptNickname", () => {
  it("detects public naming codes and internal aliases", () => {
    expect(isHumanAcceptNamingError("DISPLAY_NAME_TAKEN")).toBe(true);
    expect(isHumanAcceptNamingError("INVALID_DISPLAY_NAME")).toBe(true);
    expect(isHumanAcceptNamingError("DISPLAY_NAME_RESERVED")).toBe(true);
    expect(isHumanAcceptNamingError("DISPLAY_NAME_REQUIRED")).toBe(true);
    expect(isHumanAcceptNamingError("display_name_taken")).toBe(true);
    expect(isHumanAcceptNamingError("expired")).toBe(false);
    expect(isHumanAcceptNamingError(undefined)).toBe(false);
  });

  it("accepts a valid nickname and trims it", () => {
    expect(checkHumanAcceptNickname("  Ben Lee ")).toEqual({
      ok: true,
      name: "Ben Lee",
    });
  });

  it("rejects blank, invalid, and reserved nicknames with copy", () => {
    const blank = checkHumanAcceptNickname("   ");
    expect(blank.ok).toBe(false);
    if (!blank.ok) expect(blank.errorMessage).toBe("Enter a project nickname.");
    const invalid = checkHumanAcceptNickname("ben@x");
    expect(invalid.ok).toBe(false);
    if (!invalid.ok) expect(invalid.errorMessage).toMatch(/2–32 letters/);
    const reserved = checkHumanAcceptNickname("Owner");
    expect(reserved.ok).toBe(false);
    if (!reserved.ok) expect(reserved.errorMessage).toBe("That name is reserved.");
  });

  it("prefills from account name", () => {
    expect(initialHumanAcceptNickname("  Ben  ")).toBe("Ben");
    expect(initialHumanAcceptNickname(null)).toBe("");
  });
});
