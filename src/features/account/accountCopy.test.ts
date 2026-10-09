import { describe, expect, it } from "vitest";

import {
  ACCOUNT_COPY,
  ACCOUNT_TABS,
} from "@/features/account/accountCopy.constant";

const FORBIDDEN =
  /\bLane A\b|\bLane B\b|\bMCP\b|\bOAuth\b|\btoken\b|\bCLI\b|\bbot\b/i;

function collectStrings(value: unknown, out: string[]): void {
  if (typeof value === "string") {
    out.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, out);
    return;
  }
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) collectStrings(child, out);
  }
}

describe("ACCOUNT_COPY (LOCK + COPY.md)", () => {
  it("keeps the tabs that do something and the chrome strings", () => {
    // Sign-in/security and Privacy/data are hidden until they are wired up.
    expect(ACCOUNT_TABS.map((t) => t.id)).toEqual(["profile", "notify"]);
    expect(ACCOUNT_TABS.map((t) => t.label)).toEqual([
      "Profile",
      "Notifications",
    ]);
    expect(ACCOUNT_COPY.h1).toBe("Account");
    expect(ACCOUNT_COPY.menuItem).toBe("Account");
    expect(ACCOUNT_COPY.tip).toContain("Pricing page");
  });

  it("matches locked Profile / Security / Notify / Privacy EN", () => {
    expect(ACCOUNT_COPY.profile.saveName).toBe("Save name");
    expect(ACCOUNT_COPY.profile.ctaStart).toBe("Start your free month");
    expect(ACCOUNT_COPY.security.h2SignIn).toBe("How you sign in");
    expect(ACCOUNT_COPY.security.thisBrowser).toBe("This browser");
    expect(ACCOUNT_COPY.notify.billingLocked).toBe(
      "Billing emails cannot be turned off.",
    );
    expect(ACCOUNT_COPY.privacy.historyH2).toBe(
      "Your history stays on your computers",
    );
    expect(ACCOUNT_COPY.privacy.requestExport).toBe("Request export");
    expect(ACCOUNT_COPY.signedOut.signIn).toBe("Sign in");
    expect(ACCOUNT_COPY.offline).toContain("No internet");
  });

  it("uses AgentWitch one word and assistant (no forbidden jargon)", () => {
    const strings: string[] = [];
    collectStrings(ACCOUNT_COPY, strings);
    expect(strings.some((s) => s.includes("AgentWitch"))).toBe(true);
    expect(strings.some((s) => s.includes("Agent Witch"))).toBe(false);
    for (const s of strings) {
      expect(s, s).not.toMatch(FORBIDDEN);
    }
  });
});
