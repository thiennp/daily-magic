import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

import AwcPreflightFailureCard from "./AwcPreflightFailureCard";
import type { AwcPreflightFailureView } from "./buildAwcPreflightFailureView";

const blockedView = (): AwcPreflightFailureView => ({
  kind: "blocked",
  facts: {
    reason: "Cursor CLI is not signed in on this Mac.",
    check: "pf.writer-login · Writer signed in",
    checkId: "pf.writer-login",
    checkName: "Writer signed in",
    fix: "Open Cursor and sign in, then try again.",
    rerunHint: "agentwitch setup_project --rerun-preflight",
    evidenceLines: ["file present: ~/.cursor/config.json"],
  },
});

describe("AwcPreflightFailureCard", () => {
  it("renders nothing for idle and passed", () => {
    expect(
      renderToStaticMarkup(
        React.createElement(AwcPreflightFailureCard, {
          view: { kind: "idle" },
        }),
      ),
    ).toBe("");
    expect(
      renderToStaticMarkup(
        React.createElement(AwcPreflightFailureCard, {
          view: { kind: "passed" },
        }),
      ),
    ).toBe("");
  });

  it("renders four facts, Fix on Mac hint, and never claims cloud can clear", () => {
    const html = renderToStaticMarkup(
      React.createElement(AwcPreflightFailureCard, {
        view: blockedView(),
        showFixOnMacHint: true,
      }),
    );
    expect(html).toContain("Preflight blocked");
    expect(html).toContain("Reason:");
    expect(html).toContain("Check:");
    expect(html).toContain("Fix:");
    expect(html).toContain("Fix on Mac");
    expect(html).toContain("Cloud cannot clear");
    expect(html).not.toMatch(/cloud can (fix|clear)/i);
  });

  it("renders each non-quiet state", () => {
    expect(
      renderToStaticMarkup(
        React.createElement(AwcPreflightFailureCard, {
          view: { kind: "running" },
        }),
      ),
    ).toContain("Running preflight…");
    expect(
      renderToStaticMarkup(
        React.createElement(AwcPreflightFailureCard, {
          view: { kind: "skipped" },
        }),
      ),
    ).toContain("Preflight is off for this project.");
    expect(
      renderToStaticMarkup(
        React.createElement(AwcPreflightFailureCard, {
          view: { kind: "errored", safeMessage: "Timeout" },
        }),
      ),
    ).toContain("Preflight could not run:");
  });
});
