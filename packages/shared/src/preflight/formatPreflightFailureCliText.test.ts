import { describe, expect, it } from "vitest";

import { formatPreflightFailureCliText } from "./formatPreflightFailureCliText";
import { PREFLIGHT_FAILURE_COPY } from "./preflightFailureCopy.constant";
import { PREFLIGHT_RERUN_HINT } from "./preflightAction.constant";
import type { PreflightRunResult } from "./PreflightResult.type";

const blockedResult = (): PreflightRunResult => ({
  status: "block",
  results: [
    {
      status: "block",
      checkId: "pf.writer-login",
      name: "Writer signed in",
      reason: "Cursor CLI is not signed in on this Mac.",
      fix: "Run `agent login` (or open Cursor and sign in), then retry.",
      rerunHint: PREFLIGHT_RERUN_HINT,
      evidence: [],
      actionId: "act.deploy",
    },
  ],
});

describe("formatPreflightFailureCliText", () => {
  it("is quiet for idle and passed", () => {
    expect(formatPreflightFailureCliText({ kind: "idle" })).toBe("");
    expect(formatPreflightFailureCliText({ kind: "passed" })).toBe("");
  });

  it("prints running and skipped copy", () => {
    expect(formatPreflightFailureCliText({ kind: "running" })).toBe(
      PREFLIGHT_FAILURE_COPY.running,
    );
    expect(formatPreflightFailureCliText({ kind: "skipped" })).toBe(
      PREFLIGHT_FAILURE_COPY.skipped,
    );
  });

  it("prints the blocked block with rerun", () => {
    const text = formatPreflightFailureCliText({
      kind: "blocked",
      result: blockedResult(),
    });
    const lines = text.split("\n");
    expect(lines.length).toBeLessThanOrEqual(6);
    expect(lines[0]).toBe(
      "Preflight blocked · pf.writer-login (Writer signed in)",
    );
    expect(lines[1]).toMatch(/^Reason:/);
    expect(text).toContain(`Rerun: ${PREFLIGHT_RERUN_HINT}`);
    expect(text).not.toContain(PREFLIGHT_FAILURE_COPY.continueLabel);
  });

  it("prints warn-only with continue path and soft title", () => {
    const text = formatPreflightFailureCliText({
      kind: "warned",
      result: {
        status: "warn",
        results: [
          {
            status: "warn",
            checkId: "pf.mcp-up",
            name: "Local tools ready",
            reason: "Tools were slow.",
            fix: "Restart Agent Witch Local.",
            rerunHint: PREFLIGHT_RERUN_HINT,
            evidence: [],
            actionId: "act.deploy",
          },
        ],
      },
    });
    expect(text).toContain(PREFLIGHT_FAILURE_COPY.warnTitle);
    expect(text).toContain(PREFLIGHT_FAILURE_COPY.continueLabel);
    expect(text).not.toContain("Run preflight again");
    expect(text.split("\n").length).toBeLessThanOrEqual(6);
  });

  it("prints errored check as Couldn't check via blocked presentation", () => {
    const text = formatPreflightFailureCliText({
      kind: "blocked",
      result: {
        status: "errored",
        results: [
          {
            status: "errored",
            checkId: "pf.smoke",
            name: "Smoke check passed",
            reason: "Command exited 127.",
            fix: "Install the smoke script.",
            rerunHint: PREFLIGHT_RERUN_HINT,
            evidence: [],
            actionId: "act.deploy",
          },
        ],
      },
    });
    expect(text).toContain(PREFLIGHT_FAILURE_COPY.couldntCheck);
    expect(text.toLowerCase()).not.toContain("failed");
  });

  it("prints engine-level errored with safe message and rerun hint", () => {
    const text = formatPreflightFailureCliText({
      kind: "errored",
      safeMessage: "Disk full",
    });
    expect(text).toContain("Preflight could not run: Disk full");
    expect(text).toContain(PREFLIGHT_RERUN_HINT);
  });
});
