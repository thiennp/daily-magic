import { describe, expect, it } from "vitest";

import {
  formatPreflightFailureFacts,
  formatPreflightFailurePresentation,
  pickPrimaryPreflightFailure,
} from "./formatPreflightFailureFacts";
import type {
  PreflightCheckResult,
  PreflightRunResult,
} from "./PreflightResult.type";
import { PREFLIGHT_FAILURE_COPY } from "./preflightFailureCopy.constant";
import { PREFLIGHT_RERUN_HINT } from "./preflightAction.constant";

const check = (
  overrides: Partial<PreflightCheckResult> &
    Pick<PreflightCheckResult, "status" | "checkId" | "name">,
): PreflightCheckResult => ({
  reason: "Something blocked the run.",
  fix: "Fix it on this Mac, then retry.",
  rerunHint: PREFLIGHT_RERUN_HINT,
  evidence: [],
  actionId: "act.deploy",
  ...overrides,
});

describe("formatPreflightFailureFacts", () => {
  it("renders name/reason/fix/rerunHint straight from the payload for unknown ids", () => {
    const facts = formatPreflightFailureFacts(
      check({
        status: "block",
        checkId: "pit.custom-unknown-trap",
        name: "Custom trap from the project",
        reason: "The custom trap fired.",
        fix: "Undo the custom mistake.",
      }),
    );
    expect(facts.checkId).toBe("pit.custom-unknown-trap");
    expect(facts.checkName).toBe("Custom trap from the project");
    expect(facts.reason).toBe("The custom trap fired.");
    expect(facts.fix).toBe("Undo the custom mistake.");
    expect(facts.fromPitfall).toBe(true);
    expect(facts.check).toBe(
      "pit.custom-unknown-trap · Custom trap from the project",
    );
  });

  it("marks pit. checks as from a project pitfall; catalog ids are not", () => {
    expect(
      formatPreflightFailureFacts(
        check({
          status: "block",
          checkId: "pf.writer-login",
          name: "Writer signed in",
        }),
      ).fromPitfall,
    ).toBe(false);
    expect(
      formatPreflightFailureFacts(
        check({
          status: "block",
          checkId: "pit.seed-stale-lockfile",
          name: "Stale lockfile",
        }),
      ).fromPitfall,
    ).toBe(true);
  });

  it("words errored checks as Couldn't check, never failed", () => {
    const facts = formatPreflightFailureFacts(
      check({
        status: "errored",
        checkId: "pf.mcp-up",
        name: "Local tools ready",
        reason: "Timed out waiting for the tools service.",
      }),
    );
    expect(facts.reason).toContain(PREFLIGHT_FAILURE_COPY.couldntCheck);
    expect(facts.reason).toContain("Local tools ready");
    expect(facts.reason.toLowerCase()).not.toContain("failed");
  });

  it("uses Couldn't check: name when errored reason is empty", () => {
    const facts = formatPreflightFailureFacts(
      check({
        status: "errored",
        checkId: "pf.smoke",
        name: "Smoke check passed",
        reason: "  ",
      }),
    );
    expect(facts.reason).toBe(
      `${PREFLIGHT_FAILURE_COPY.couldntCheck}: Smoke check passed`,
    );
    expect(facts.reason.toLowerCase()).not.toContain("failed");
  });

  it("never renders secret-looking values", () => {
    const secret = "sk_live_THIS_IS_NOT_A_REAL_SECRET_VALUE_1234567890";
    const facts = formatPreflightFailureFacts(
      check({
        status: "block",
        checkId: "pf.secrets-fingerprint-only",
        name: `Secrets ${secret}`,
        reason: `API key missing api_key=${secret}`,
        fix: `Unset token=${secret} then retry`,
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
  });
});

describe("pickPrimaryPreflightFailure / presentation", () => {
  it("leads with first block over errored and warn", () => {
    const result: PreflightRunResult = {
      status: "block",
      results: [
        check({
          status: "warn",
          checkId: "pf.mcp-up",
          name: "Local tools ready",
        }),
        check({
          status: "errored",
          checkId: "pf.smoke",
          name: "Smoke",
        }),
        check({
          status: "block",
          checkId: "pf.folder-exists",
          name: "Project folder found",
        }),
      ],
    };
    expect(pickPrimaryPreflightFailure(result)?.checkId).toBe(
      "pf.folder-exists",
    );
    const presentation = formatPreflightFailurePresentation(result);
    expect(presentation?.mode).toBe("blocked");
    expect(presentation?.primary.checkId).toBe("pf.folder-exists");
    expect(presentation?.warnNotes.map((n) => n.checkId)).toEqual([
      "pf.mcp-up",
    ]);
  });

  it("leads with first errored when there is no block; warn stays under", () => {
    const result: PreflightRunResult = {
      status: "errored",
      results: [
        check({
          status: "warn",
          checkId: "pf.mcp-up",
          name: "Local tools ready",
        }),
        check({
          status: "errored",
          checkId: "pf.arch-ci",
          name: "Architecture check",
          reason: "",
        }),
      ],
    };
    expect(pickPrimaryPreflightFailure(result)?.checkId).toBe("pf.arch-ci");
    const presentation = formatPreflightFailurePresentation(result);
    expect(presentation?.mode).toBe("errored_check");
    expect(presentation?.primary.reason).toContain(
      PREFLIGHT_FAILURE_COPY.couldntCheck,
    );
    expect(presentation?.warnNotes).toHaveLength(1);
  });

  it("warn-only runs use warned mode with continue path (warn never leads a block)", () => {
    const result: PreflightRunResult = {
      status: "warn",
      results: [
        check({
          status: "warn",
          checkId: "pf.mcp-up",
          name: "Local tools ready",
          reason: "Tools were slow to answer.",
        }),
        check({
          status: "warn",
          checkId: "pit.extra-soft",
          name: "Soft pitfall",
          reason: "A soft tip.",
        }),
      ],
    };
    expect(pickPrimaryPreflightFailure(result)).toBeNull();
    const presentation = formatPreflightFailurePresentation(result);
    expect(presentation?.mode).toBe("warned");
    expect(presentation?.primary.checkId).toBe("pf.mcp-up");
    expect(presentation?.warnNotes.map((n) => n.checkId)).toEqual([
      "pit.extra-soft",
    ]);
  });
});
