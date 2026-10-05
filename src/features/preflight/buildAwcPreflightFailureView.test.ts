import { describe, expect, it } from "vitest";

import { PREFLIGHT_RERUN_HINT } from "@agent-witch/shared/preflight";

import {
  resolvePreflightUiStateFromText,
  toAwcPreflightFailureView,
} from "./buildAwcPreflightFailureView";

describe("toAwcPreflightFailureView", () => {
  it("maps blocked runs to presentation with primary facts", () => {
    const view = toAwcPreflightFailureView({
      kind: "blocked",
      result: {
        status: "block",
        results: [
          {
            status: "block",
            checkId: "pit.custom",
            name: "Custom",
            reason: "Hit.",
            fix: "Fix.",
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
    expect(view.presentation.primary.checkId).toBe("pit.custom");
    expect(view.presentation.primary.fromPitfall).toBe(true);
  });

  it("maps warn-only to warned", () => {
    const view = toAwcPreflightFailureView({
      kind: "warned",
      result: {
        status: "warn",
        results: [
          {
            status: "warn",
            checkId: "pf.mcp-up",
            name: "Local tools ready",
            reason: "Slow.",
            fix: "Restart.",
            rerunHint: PREFLIGHT_RERUN_HINT,
            evidence: [],
            actionId: "act.deploy",
          },
        ],
      },
    });
    expect(view.kind).toBe("warned");
  });
});

describe("resolvePreflightUiStateFromText", () => {
  it("parses block → blocked and warn → warned", () => {
    expect(
      resolvePreflightUiStateFromText(
        JSON.stringify({
          status: "block",
          results: [
            {
              status: "block",
              checkId: "pf.folder-exists",
              name: "Project folder found",
              reason: "Missing.",
              fix: "Reconnect.",
              rerunHint: PREFLIGHT_RERUN_HINT,
              actionId: "act.delete",
              evidence: [],
            },
          ],
        }),
      )?.kind,
    ).toBe("blocked");
    expect(
      resolvePreflightUiStateFromText(
        JSON.stringify({
          status: "warn",
          results: [
            {
              status: "warn",
              checkId: "pf.mcp-up",
              name: "Local tools ready",
              reason: "Slow.",
              fix: "Restart.",
              rerunHint: PREFLIGHT_RERUN_HINT,
              actionId: "act.deploy",
              evidence: [],
            },
          ],
        }),
      )?.kind,
    ).toBe("warned");
  });

  it("ignores ordinary run output", () => {
    expect(resolvePreflightUiStateFromText("Build failed")).toBeNull();
  });
});
