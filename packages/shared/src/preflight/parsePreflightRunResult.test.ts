import { describe, expect, it } from "vitest";

import { parsePreflightRunResult } from "./parsePreflightRunResult";

describe("parsePreflightRunResult", () => {
  it("sanitizes reason/fix/name/rerunHint and evidence summary", () => {
    const fake = "api_key=sk_test_fake_payload_secret_value";
    const parsed = parsePreflightRunResult({
      status: "block",
      results: [
        {
          status: "block",
          checkId: "pf.writer-login",
          name: `Writer ${fake}`,
          reason: `Blocked because ${fake}`,
          fix: `Remove ${fake} then retry`,
          rerunHint: `rerun with ${fake}`,
          actionId: "act.deploy",
          evidence: [
            {
              kind: "secret",
              summary: `token=${fake}`,
              fingerprint: "Bearer FAKESECRET_a2b3c4d5e6f7g8h9i0j1",
            },
          ],
        },
      ],
    });
    expect(parsed?.results).toHaveLength(1);
    const row = parsed?.results[0];
    expect(row?.name).not.toContain("sk_test_fake");
    expect(row?.reason).not.toContain("sk_test_fake");
    expect(row?.fix).not.toContain("sk_test_fake");
    expect(row?.rerunHint).not.toContain("sk_test_fake");
    expect(row?.evidence[0]?.summary).toContain("[redacted]");
    expect(row?.evidence[0]?.fingerprint).toBeUndefined();
  });

  it("keeps hash fingerprints and drops PEM-like fingerprints", () => {
    const sha = "d65e2888e3fdd0c0ec7bf4f2dac5953ca38ca307";
    const parsed = parsePreflightRunResult({
      status: "pass",
      results: [
        {
          status: "pass",
          checkId: "pf.health-matches-main",
          name: "Live site matches main",
          reason: `commitSha=${sha} matches main`,
          fix: "None",
          rerunHint: "agentwitch setup_project --rerun-preflight",
          actionId: "act.deploy",
          evidence: [
            { kind: "health", summary: `commitSha=${sha}`, fingerprint: sha },
            {
              kind: "secret",
              summary: "ignored",
              fingerprint:
                "-----BEGIN PRIVATE KEY-----FAKE-----END PRIVATE KEY-----",
            },
          ],
        },
      ],
    });
    expect(parsed?.results[0]?.reason).toContain(sha);
    expect(parsed?.results[0]?.evidence[0]?.fingerprint).toBe(sha);
    expect(parsed?.results[0]?.evidence[1]?.fingerprint).toBeUndefined();
  });

  it("returns null for shape errors and drops bad rows", () => {
    expect(parsePreflightRunResult(null)).toBeNull();
    expect(parsePreflightRunResult({ status: "pass" })).toBeNull();
    expect(
      parsePreflightRunResult({
        status: "weird",
        results: [],
      }),
    ).toBeNull();
    const partial = parsePreflightRunResult({
      status: "pass",
      results: [
        { status: "pass" },
        {
          status: "pass",
          checkId: "pf.smoke",
          actionId: "act.deploy",
          name: "Smoke",
        },
      ],
    });
    expect(partial?.results).toHaveLength(1);
  });
});
