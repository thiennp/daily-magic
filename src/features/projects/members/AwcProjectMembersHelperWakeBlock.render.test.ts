import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcProjectMembersHelperWakeBlock from "@/features/projects/members/AwcProjectMembersHelperWakeBlock";
import type { RailAssistantWakeStatus } from "@/features/projects/members/utils/resolveRailAssistantWakeStatus";

const render = (status: RailAssistantWakeStatus, pasteOpen = false): string =>
  renderToStaticMarkup(
    createElement(AwcProjectMembersHelperWakeBlock, {
      projectId: "p1",
      member: { id: "m1", projectDisplayName: "NRG Lead" },
      status,
      health: undefined,
      pasteOpen,
      onOpenPaste: () => undefined,
      onRetry: () => undefined,
      onWakeSaved: () => undefined,
    }),
  ).replace(/&#x27;/g, "'");

describe("DF-036 F3 / Q2: the Wake link block in the row detail", () => {
  it("not connected: title, detail line and the paste box right away (no second click)", () => {
    const html = render("not_connected");
    expect(html).toContain(">Wake link</h4>");
    expect(html).toContain("Not connected");
    expect(html).toContain("Let AgentWitch wake NRG Lead when there's work.");
    expect(html).toContain('name="grok-wake-url"');
  });

  it("checks in only when asked: detail line + secondary Add wake link", () => {
    const html = render("checks_on_demand");
    expect(html).toContain("Checks in only when asked.");
    expect(html).toContain(">Add wake link</button>");
    expect(html).not.toContain('name="grok-wake-url"');
    expect(render("checks_on_demand", true)).toContain('name="grok-wake-url"');
  });

  it("status failed to load: Couldn't check + Retry, never Not connected", () => {
    const html = render("cant_check");
    expect(html).toContain("Couldn't check the wake link");
    expect(html).toContain(">Retry</button>");
    expect(html).not.toContain("Not connected");
    expect(html).not.toContain('name="grok-wake-url"');
  });

  it("checking shows no action and no paste box", () => {
    const html = render("checking");
    expect(html).toContain("Checking…");
    expect(html).not.toContain("<button");
  });

  it("no jargon in the block", () => {
    for (const status of [
      "not_connected",
      "checks_on_demand",
      "cant_check",
    ] as const) {
      expect(render(status).toLowerCase()).not.toMatch(
        /routine|webhook|token|secret|grok wake link/,
      );
    }
  });
});
