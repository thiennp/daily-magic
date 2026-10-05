import { describe, expect, it } from "vitest";

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
    const fakeHex = "a".repeat(40);
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

  it("keeps path/fingerprint evidence and truncates long fingerprints", () => {
    const safe = toSafePreflightEvidence([
      {
        kind: "path",
        summary: "file present: /tmp/config.json",
        fingerprint: "b".repeat(80),
      },
    ]);
    expect(safe[0]?.summary).toContain("/tmp/config.json");
    expect(safe[0]?.fingerprint).toHaveLength(64);
  });
});
