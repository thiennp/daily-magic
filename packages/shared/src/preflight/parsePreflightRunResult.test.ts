import { describe, expect, it } from "vitest";

import { parsePreflightRunResult } from "./parsePreflightRunResult";

describe("parsePreflightRunResult", () => {
  it("parses a valid Mac payload and sanitizes evidence", () => {
    const parsed = parsePreflightRunResult({
      status: "block",
      results: [
        {
          status: "block",
          checkId: "pf.writer-login",
          name: "Writer signed in",
          reason: "Cursor CLI is not signed in on this Mac.",
          fix: "Sign in, then retry.",
          rerunHint: "agentwitch setup_project --rerun-preflight",
          actionId: "act.deploy",
          evidence: [
            {
              kind: "secret",
              summary: "token=super-secret-fake-token-value-here-ok",
            },
          ],
        },
      ],
    });
    expect(parsed?.status).toBe("block");
    expect(parsed?.results).toHaveLength(1);
    expect(parsed?.results[0]?.checkId).toBe("pf.writer-login");
    expect(parsed?.results[0]?.evidence[0]?.summary).toContain("[redacted]");
    expect(parsed?.results[0]?.evidence[0]?.summary).not.toContain(
      "super-secret-fake-token-value-here-ok",
    );
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
      results: [{ status: "pass" }, { status: "pass", checkId: "pf.smoke", actionId: "act.deploy", name: "Smoke" }],
    });
    expect(partial?.results).toHaveLength(1);
  });
});
