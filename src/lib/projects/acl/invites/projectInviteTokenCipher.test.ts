import { afterEach, describe, expect, it, vi } from "vitest";

import {
  decryptProjectInviteToken,
  encryptProjectInviteToken,
  tryEncryptProjectInviteToken,
} from "@/lib/projects/acl/invites/projectInviteTokenCipher";
import { decryptProjectConnectionToken } from "@/lib/projects/connections/decryptProjectConnectionToken";

describe("project invite token cipher (107)", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("round-trips with AUTH_SECRET and never stores the raw token", () => {
    const stored = encryptProjectInviteToken("tok-abcdefghijklmnop", "s-1");
    expect(stored.ciphertext).not.toContain("tok-abcdefghijklmnop");
    expect(decryptProjectInviteToken(stored, "s-1")).toBe(
      "tok-abcdefghijklmnop",
    );
  });

  it("fails closed with a wrong secret or another purpose key", () => {
    const stored = encryptProjectInviteToken("tok-abcdefghijklmnop", "s-1");
    expect(() => decryptProjectInviteToken(stored, "s-2")).toThrow();
    expect(() =>
      decryptProjectConnectionToken(stored.ciphertext, stored.iv, "s-1"),
    ).toThrow();
  });

  it("stores nothing when AUTH_SECRET is missing", () => {
    vi.stubEnv("AUTH_SECRET", "");
    expect(tryEncryptProjectInviteToken("tok-abcdefghijklmnop")).toBeNull();
    vi.stubEnv("AUTH_SECRET", "s-env");
    const stored = tryEncryptProjectInviteToken("tok-abcdefghijklmnop");
    expect(stored).not.toBeNull();
    if (stored === null) return;
    expect(decryptProjectInviteToken(stored, "s-env")).toBe(
      "tok-abcdefghijklmnop",
    );
  });
});
