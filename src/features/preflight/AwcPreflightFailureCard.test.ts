import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

import AwcPreflightFailureCard from "./AwcPreflightFailureCard";
import type { AwcPreflightFailureView } from "./buildAwcPreflightFailureView";
import { PREFLIGHT_FAILURE_COPY } from "@agent-witch/shared/preflight";

const blockedView = (): AwcPreflightFailureView => ({
  kind: "blocked",
  presentation: {
    mode: "blocked",
    primary: {
      reason: "Cursor CLI is not signed in on this Mac.",
      check: "pf.writer-login · Writer signed in",
      checkId: "pf.writer-login",
      checkName: "Writer signed in",
      fix: "Open Cursor and sign in, then try again.",
      rerunHint: "agentwitch setup_project --rerun-preflight",
      evidenceLines: [],
      fromPitfall: false,
      status: "block",
    },
    warnNotes: [],
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
  });

  it("renders blocked with Fix on Mac", () => {
    const html = renderToStaticMarkup(
      React.createElement(AwcPreflightFailureCard, {
        view: blockedView(),
        showFixOnMacHint: true,
      }),
    );
    expect(html).toContain("Preflight blocked");
    expect(html).toContain("Fix on Mac");
    expect(html).toContain("border-red-200");
  });

  it("renders warn-only with soft amber styling and continue path", () => {
    const html = renderToStaticMarkup(
      React.createElement(AwcPreflightFailureCard, {
        view: {
          kind: "warned",
          presentation: {
            mode: "warned",
            primary: {
              reason: "Tools were slow.",
              check: "pf.mcp-up · Local tools ready",
              checkId: "pf.mcp-up",
              checkName: "Local tools ready",
              fix: "Restart Local.",
              rerunHint: "agentwitch setup_project --rerun-preflight",
              evidenceLines: [],
              fromPitfall: false,
              status: "warn",
            },
            warnNotes: [],
          },
        },
      }),
    );
    expect(html).toContain("Preflight warning");
    expect(html).toContain(PREFLIGHT_FAILURE_COPY.continueHint);
    expect(html).toContain("border-amber-200");
    expect(html).not.toContain("border-red-200");
    expect(html).not.toContain("Fix on Mac");
  });

  it("renders Couldn't check for errored_check primary", () => {
    const html = renderToStaticMarkup(
      React.createElement(AwcPreflightFailureCard, {
        view: {
          kind: "blocked",
          presentation: {
            mode: "errored_check",
            primary: {
              reason: `${PREFLIGHT_FAILURE_COPY.couldntCheck}: Smoke check passed`,
              check: "pf.smoke · Smoke check passed",
              checkId: "pf.smoke",
              checkName: "Smoke check passed",
              fix: "Install smoke.",
              rerunHint: "agentwitch setup_project --rerun-preflight",
              evidenceLines: [],
              fromPitfall: false,
              status: "errored",
            },
            warnNotes: [],
          },
        },
      }),
    );
    expect(html).toMatch(/Couldn(?:'|&[#a-z0-9]+;)t check/);
    expect(html.toLowerCase()).not.toContain("failed");
  });
});
