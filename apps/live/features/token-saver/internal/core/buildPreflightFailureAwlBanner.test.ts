import { describe, expect, it } from "vitest";

import { PREFLIGHT_RERUN_HINT } from "@agent-witch/shared/preflight";

import { buildPreflightFailureAwlBanner } from "./buildPreflightFailureAwlBanner";

describe("buildPreflightFailureAwlBanner", () => {
  it("returns nothing for idle and passed", () => {
    expect(buildPreflightFailureAwlBanner({ state: { kind: "idle" } })).toBe(
      "",
    );
    expect(buildPreflightFailureAwlBanner({ state: { kind: "passed" } })).toBe(
      "",
    );
  });

  it("renders running and skipped states", () => {
    expect(
      buildPreflightFailureAwlBanner({ state: { kind: "running" } }),
    ).toContain("Running preflight…");
    expect(
      buildPreflightFailureAwlBanner({ state: { kind: "skipped" } }),
    ).toContain("Preflight is off for this project.");
  });

  it("renders blocked alert-error with Run preflight again", () => {
    const html = buildPreflightFailureAwlBanner({
      state: {
        kind: "blocked",
        result: {
          status: "block",
          results: [
            {
              status: "block",
              checkId: "pit.unknown-trap",
              name: "Unknown trap",
              reason: "Trap fired.",
              fix: "Undo it.",
              rerunHint: PREFLIGHT_RERUN_HINT,
              evidence: [],
              actionId: "act.deploy",
            },
          ],
        },
      },
      rerunAction: "/project/preflight/rerun",
      projectId: "proj-1",
    });
    expect(html).toContain('class="alert-error"');
    expect(html).toContain("Preflight blocked");
    expect(html).toContain("From a project pitfall");
    expect(html).toContain("pit.unknown-trap");
    expect(html).toContain("Run preflight again");
  });

  it("renders warn-only as alert-warn with continue path, not rerun button", () => {
    const html = buildPreflightFailureAwlBanner({
      state: {
        kind: "warned",
        result: {
          status: "warn",
          results: [
            {
              status: "warn",
              checkId: "pf.mcp-up",
              name: "Local tools ready",
              reason: "Slow tools.",
              fix: "Restart Local.",
              rerunHint: PREFLIGHT_RERUN_HINT,
              evidence: [],
              actionId: "act.deploy",
            },
          ],
        },
      },
      rerunAction: "/project/preflight/rerun",
    });
    expect(html).toContain('class="alert-warn"');
    expect(html).toContain("Preflight warning");
    expect(html).toContain("You can keep going");
    expect(html).not.toContain("Run preflight again");
    expect(html).not.toContain('class="alert-error"');
  });

  it("renders errored check as Couldn't check", () => {
    const html = buildPreflightFailureAwlBanner({
      state: {
        kind: "blocked",
        result: {
          status: "errored",
          results: [
            {
              status: "errored",
              checkId: "pf.smoke",
              name: "Smoke check passed",
              reason: "Exit 127",
              fix: "Install smoke.",
              rerunHint: PREFLIGHT_RERUN_HINT,
              evidence: [],
              actionId: "act.deploy",
            },
          ],
        },
      },
    });
    expect(html).toMatch(/Couldn(?:'|&[#a-z0-9]+;)t check/);
    expect(html.toLowerCase()).not.toContain("failed");
  });
});
