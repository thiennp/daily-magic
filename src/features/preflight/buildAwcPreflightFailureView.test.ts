import { describe, expect, it } from "vitest";

import { PREFLIGHT_RERUN_HINT } from "@agent-witch/shared/preflight";

import {
  resolvePreflightUiStateFromText,
  toAwcPreflightFailureView,
} from "./buildAwcPreflightFailureView";

describe("toAwcPreflightFailureView", () => {
  it("maps each UI state", () => {
    expect(toAwcPreflightFailureView({ kind: "idle" })).toEqual({
      kind: "idle",
    });
    expect(toAwcPreflightFailureView({ kind: "running" })).toEqual({
      kind: "running",
    });
    expect(toAwcPreflightFailureView({ kind: "passed" })).toEqual({
      kind: "passed",
    });
    expect(toAwcPreflightFailureView({ kind: "skipped" })).toEqual({
      kind: "skipped",
    });
    expect(
      toAwcPreflightFailureView({
        kind: "errored",
        safeMessage: "boom",
      }),
    ).toEqual({ kind: "errored", safeMessage: "boom" });
  });

  it("maps blocked runs to four facts", () => {
    const view = toAwcPreflightFailureView({
      kind: "blocked",
      result: {
        status: "block",
        results: [
          {
            status: "block",
            checkId: "pf.writer-login",
            name: "Writer signed in",
            reason: "Not signed in.",
            fix: "Sign in.",
            rerunHint: PREFLIGHT_RERUN_HINT,
            evidence: [],
            actionId: "act.deploy",
          },
        ],
      },
    });
    expect(view.kind).toBe("blocked");
    if (view.kind !== "blocked") {
      return;
    }
    expect(view.facts.checkId).toBe("pf.writer-login");
    expect(view.facts.reason).toBe("Not signed in.");
  });
});

describe("resolvePreflightUiStateFromText", () => {
  it("parses a Mac-posted JSON preflight payload", () => {
    const raw = JSON.stringify({
      status: "block",
      results: [
        {
          status: "block",
          checkId: "pf.folder-exists",
          name: "Project folder found",
          reason: "Folder missing.",
          fix: "Reconnect the folder.",
          rerunHint: PREFLIGHT_RERUN_HINT,
          actionId: "act.delete",
          evidence: [],
        },
      ],
    });
    const state = resolvePreflightUiStateFromText(raw);
    expect(state?.kind).toBe("blocked");
  });

  it("ignores ordinary run output", () => {
    expect(resolvePreflightUiStateFromText("Build failed")).toBeNull();
    expect(resolvePreflightUiStateFromText(null)).toBeNull();
  });
});
