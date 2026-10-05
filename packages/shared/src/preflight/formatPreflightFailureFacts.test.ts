import { describe, expect, it } from "vitest";

import {
  formatPreflightFailureFacts,
  formatPreflightFailureFactsFromRun,
  pickPrimaryPreflightFailure,
} from "./formatPreflightFailureFacts";
import type {
  PreflightCheckResult,
  PreflightRunResult,
} from "./PreflightResult.type";
import { PREFLIGHT_FAILURE_COPY } from "./preflightFailureCopy.constant";
import { PREFLIGHT_RERUN_HINT } from "./preflightAction.constant";

const blockCheck = (
  overrides: Partial<PreflightCheckResult> = {},
): PreflightCheckResult => ({
  status: "block",
  checkId: "pf.writer-login",
  name: "Writer signed in",
  reason: "Cursor CLI is not signed in on this Mac.",
  fix: "Run `agent login` (or open Cursor and sign in), then retry.",
  rerunHint: PREFLIGHT_RERUN_HINT,
  evidence: [],
  actionId: "act.deploy",
  ...overrides,
});

describe("formatPreflightFailureFacts", () => {
  it("formats the four facts in order for a blocked check", () => {
    const facts = formatPreflightFailureFacts(blockCheck());
    expect(facts.reason).toBe("Cursor CLI is not signed in on this Mac.");
    expect(facts.check).toBe("pf.writer-login · Writer signed in");
    expect(facts.fix).toContain("agent login");
    expect(facts.rerunHint).toBe(PREFLIGHT_RERUN_HINT);
  });

  it("prefers the first block over warn and errored", () => {
    const result: PreflightRunResult = {
      status: "block",
      results: [
        blockCheck({
          status: "warn",
          checkId: "pf.mcp-up",
          name: "Local tools ready",
        }),
        blockCheck({
          checkId: "pf.folder-exists",
          name: "Project folder found",
        }),
        blockCheck({ status: "errored", checkId: "pf.smoke", name: "Smoke" }),
      ],
    };
    expect(pickPrimaryPreflightFailure(result)?.checkId).toBe(
      "pf.folder-exists",
    );
    expect(formatPreflightFailureFactsFromRun(result)?.checkId).toBe(
      "pf.folder-exists",
    );
  });

  it("never renders secret-looking values in reason, fix, or evidence", () => {
    const secret = "sk_live_THIS_IS_NOT_A_REAL_SECRET_VALUE_1234567890";
    const facts = formatPreflightFailureFacts(
      blockCheck({
        reason: `API key missing api_key=${secret}`,
        fix: `Unset token=${secret} then retry`,
        name: `Writer ${secret}`,
        evidence: [
          {
            kind: "secret",
            summary: `password=${secret}`,
            fingerprint: "Bearer FAKESECRET_a2b3c4d5e6f7g8h9i0j1",
          },
        ],
      }),
    );
    const blob = [facts.reason, facts.check, facts.fix, facts.rerunHint]
      .concat(facts.evidenceLines)
      .join("\n");
    expect(blob).not.toContain(secret);
    expect(blob).not.toContain("sk_live_");
    expect(blob).toMatch(/\[redacted\]|missing|fingerprint|secret/i);
    expect(facts.reason.length).toBeGreaterThan(0);
  });

  it("uses the secret-safe fallback when reason is empty", () => {
    const facts = formatPreflightFailureFacts(blockCheck({ reason: "  " }));
    expect(facts.reason).toBe(PREFLIGHT_FAILURE_COPY.secretSafeFallback);
  });
});
