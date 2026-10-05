import { describe, expect, it } from "vitest";

import { PREFLIGHT_RERUN_HINT } from "@agent-witch/shared/preflight";

import { buildPreflightFailureAwlBanner } from "./buildPreflightFailureAwlBanner";

const blocked = {
  kind: "blocked" as const,
  result: {
    status: "block" as const,
    results: [
      {
        status: "block" as const,
        checkId: "pf.writer-login",
        name: "Writer signed in",
        reason: "Cursor CLI is not signed in on this Mac.",
        fix: "Open Cursor and sign in, then try again.",
        rerunHint: PREFLIGHT_RERUN_HINT,
        evidence: [
          {
            kind: "path" as const,
            summary: "file present: ~/.cursor/config.json",
            fingerprint: "d65e2888e3fdd0c0ec7bf4f2dac5953ca38ca307",
          },
        ],
        actionId: "act.deploy" as const,
      },
    ],
  },
};

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

  it("renders the four-fact alert-error card with Run preflight again and Details", () => {
    const html = buildPreflightFailureAwlBanner({
      state: blocked,
      rerunAction: "/project/preflight/rerun",
      projectId: "proj-1",
    });
    expect(html).toContain('class="alert-error"');
    expect(html).toContain("Preflight blocked");
    expect(html).toContain("Reason:");
    expect(html).toContain("Check:");
    expect(html).toContain("Fix:");
    expect(html).toContain("Run preflight again");
    expect(html).toContain("<details>");
    expect(html).toContain("fingerprint");
    expect(html).toContain('action="/project/preflight/rerun"');
    expect(html).toContain('name="projectId" value="proj-1"');
  });

  it("does not render secret-looking values", () => {
    const html = buildPreflightFailureAwlBanner({
      state: {
        kind: "blocked",
        result: {
          status: "block",
          results: [
            {
              status: "block",
              checkId: "pf.secrets-fingerprint-only",
              name: "Secrets stay private",
              reason: "api_key=sk_live_SHOULD_NOT_APPEAR_IN_HTML_ABCDEF",
              fix: "Remove secret=sk_live_SHOULD_NOT_APPEAR_IN_HTML_ABCDEF",
              rerunHint: PREFLIGHT_RERUN_HINT,
              evidence: [
                {
                  kind: "secret",
                  summary: "token=sk_live_SHOULD_NOT_APPEAR_IN_HTML_ABCDEF",
                },
              ],
              actionId: "act.secrets",
            },
          ],
        },
      },
    });
    expect(html).not.toContain("sk_live_SHOULD_NOT_APPEAR");
    expect(html).toContain("[redacted]");
  });

  it("renders errored with retry affordance", () => {
    const html = buildPreflightFailureAwlBanner({
      state: { kind: "errored", safeMessage: "Network timeout" },
      rerunAction: "/project/preflight/rerun",
    });
    expect(html).toContain("Preflight could not run:");
    expect(html).toContain("Network timeout");
    expect(html).toContain("Run preflight again");
  });
});
