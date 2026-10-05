import { describe, expect, it } from "vitest";

import { isHashShapedFingerprint } from "./isHashShapedFingerprint";
import {
  sanitizePreflightText,
  toSafePreflightEvidence,
} from "./toSafePreflightEvidence";

describe("toSafePreflightEvidence", () => {
  it("redacts Bearer tokens, key assignments, PEM, long hex/base64", () => {
    const fakeBearer = "Bearer FAKESECRET_w1x2y3z4a5b6c7d8e9f0";
    const fakeKey = "api_key=sk_test_fake_not_a_real_secret_value";
    const fakePem =
      "-----BEGIN PRIVATE KEY-----\nMIIEvfakePEM\n-----END PRIVATE KEY-----";
    const fakeHex = "a".repeat(48);
    const fakeB64 = "QWJjZGVmZ2hpams=".repeat(4);

    const text = sanitizePreflightText(
      `login ${fakeBearer}; ${fakeKey}; ${fakePem}; hex=${fakeHex}; b64=${fakeB64}`,
    );
    expect(text).not.toContain("ya29.fake");
    expect(text).not.toContain("sk_test_fake");
    expect(text).not.toContain("BEGIN PRIVATE KEY");
    expect(text).not.toContain(fakeHex);
    expect(text).toContain("[redacted]");
    expect(text).toContain("Bearer [redacted]");
  });

  it("keeps short and full commit SHAs in summaries (not redacted)", () => {
    const shortSha = "d65e288";
    const fullSha = "d65e2888e3fdd0c0ec7bf4f2dac5953ca38ca307";
    const text = sanitizePreflightText(
      `commitSha=${fullSha} matches main (tip ${shortSha})`,
    );
    expect(text).toContain(fullSha);
    expect(text).toContain(shortSha);
    expect(text).not.toContain("[redacted]");
  });

  it("keeps hash-shaped fingerprints and drops secret-looking ones", () => {
    const shortSha = "d65e288";
    const fullSha = "d65e2888e3fdd0c0ec7bf4f2dac5953ca38ca307";
    expect(isHashShapedFingerprint(shortSha)).toBe(true);
    expect(isHashShapedFingerprint(`sha256:${fullSha}`)).toBe(true);
    expect(isHashShapedFingerprint("sha1:abc1234")).toBe(true);

    const safe = toSafePreflightEvidence([
      {
        kind: "health",
        summary: `commitSha=${fullSha} matches main`,
        fingerprint: fullSha,
      },
      {
        kind: "secret",
        summary: "token present",
        fingerprint: "Bearer FAKESECRET_a2b3c4d5e6f7g8h9i0j1",
      },
      {
        kind: "secret",
        summary: "key file",
        fingerprint:
          "-----BEGIN PRIVATE KEY-----FAKE_PEM_BODY-----END PRIVATE KEY-----",
      },
      {
        kind: "path",
        summary: "file present",
        fingerprint: `sha256:${"b".repeat(64)}`,
      },
    ]);
    expect(safe[0]?.fingerprint).toBe(fullSha);
    expect(safe[0]?.summary).toContain(fullSha);
    expect(safe[1]?.fingerprint).toBeUndefined();
    expect(safe[2]?.fingerprint).toBeUndefined();
    expect(safe[3]?.fingerprint).toBe(`sha256:${"b".repeat(64)}`);
  });
});
