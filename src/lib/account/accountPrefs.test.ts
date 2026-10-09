import { describe, expect, it } from "vitest";

import {
  DEFAULT_ACCOUNT_PREFS,
  parseAccountName,
  sanitizeAccountPrefs,
} from "@/lib/account/accountPrefs";

describe("sanitizeAccountPrefs", () => {
  it("falls back to the defaults for junk", () => {
    expect(sanitizeAccountPrefs(null)).toEqual(DEFAULT_ACCOUNT_PREFS);
    expect(sanitizeAccountPrefs("x")).toEqual(DEFAULT_ACCOUNT_PREFS);
  });

  it("keeps valid toggles, drops unknown keys and non-booleans", () => {
    const prefs = sanitizeAccountPrefs({
      emailOn: { task: false, digest: "yes", extra: true },
      appOn: { digest: true },
    });
    expect(prefs.emailOn.task).toBe(false);
    expect(prefs.emailOn.digest).toBe(true);
    expect(Object.keys(prefs.emailOn)).not.toContain("extra");
    expect(prefs.appOn.digest).toBe(true);
  });

  it("accepts valid quiet hours and rejects bad or equal ones", () => {
    expect(
      sanitizeAccountPrefs({ quiet: { on: true, from: "21:30", to: "06:00" } })
        .quiet,
    ).toEqual({ on: true, from: "21:30", to: "06:00" });
    expect(
      sanitizeAccountPrefs({ quiet: { on: true, from: "25:00", to: "06:00" } })
        .quiet,
    ).toEqual({ on: true, from: "22:00", to: "07:00" });
    expect(
      sanitizeAccountPrefs({ quiet: { on: true, from: "08:00", to: "08:00" } })
        .quiet.from,
    ).toBe("22:00");
  });

  it("only accepts a plain avatar colour id", () => {
    expect(sanitizeAccountPrefs({ avatarColor: "rose" }).avatarColor).toBe(
      "rose",
    );
    expect(sanitizeAccountPrefs({ avatarColor: "<b>x</b>" }).avatarColor).toBe(
      null,
    );
  });
});

describe("parseAccountName", () => {
  it("trims, collapses spaces and enforces 2 to 80 characters", () => {
    expect(parseAccountName("  Thien   Nguyen ")).toBe("Thien Nguyen");
    expect(parseAccountName("a")).toBeNull();
    expect(parseAccountName("x".repeat(81))).toBeNull();
    expect(parseAccountName(42)).toBeNull();
  });
});
