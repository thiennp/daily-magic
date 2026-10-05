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

  it("prints the four-line blocked block matching the design example shape", () => {
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
    expect(lines[2]).toMatch(/^Fix:/);
    expect(lines[3]).toBe(`Rerun: ${PREFLIGHT_RERUN_HINT}`);
  });

  it("prints errored with safe message and rerun hint", () => {
    const text = formatPreflightFailureCliText({
      kind: "errored",
      safeMessage: "Disk full",
    });
    expect(text).toContain("Preflight could not run: Disk full");
    expect(text).toContain(PREFLIGHT_RERUN_HINT);
  });
});
