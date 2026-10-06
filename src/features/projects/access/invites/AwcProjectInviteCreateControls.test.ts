import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import AwcBotToBotSupportList from "@/features/projects/access/invites/AwcBotToBotSupportList";
import AwcProjectInviteCreateControls from "@/features/projects/access/invites/AwcProjectInviteCreateControls";
import AwcProjectInviteCreatedBanner from "@/features/projects/access/invites/AwcProjectInviteCreatedBanner";
import AwcProjectInvitesPanel from "@/features/projects/access/invites/AwcProjectInvitesPanel";
import {
  AWC_BOT_TO_BOT_SUPPORT_HEADING,
  AWC_BOT_TO_BOT_SUPPORT_ROWS,
} from "@/features/projects/access/invites/awcBotToBotSupportCopy.constant";

const panelHtml = () =>
  renderToStaticMarkup(
    createElement(AwcProjectInvitesPanel, {
      invites: [],
      createdInviteUrl: null,
      projectId: "p1",
      onCreate: () => undefined,
      onRevoke: () => undefined,
      onClearCreatedUrl: () => undefined,
    }),
  );

describe("Create invite: Grok choice", () => {
  it("panel shows the Grok create button and the support list", () => {
    const html = panelHtml();
    expect(html).toContain("Invite a Grok Bot");
    expect(html).toContain("Auto-approve assistants that use this invite");
    expect(html).not.toContain("Invite a Muse bot");
    expect(html).not.toContain(">Create invite<");
    expect(html).toContain(AWC_BOT_TO_BOT_SUPPORT_HEADING);
  });

  it("the Grok button creates a grok invite", () => {
    const onCreate = vi.fn();
    const html = renderToStaticMarkup(
      createElement(AwcProjectInviteCreateControls, { onCreate }),
    );
    expect(html).toContain("Invite a Grok Bot");
    expect(html).toContain("data-invite-platform=\"grok\"");
    expect(html).toContain("data-invite-auto-approve=\"\"");
    // Default: auto-approve checkbox off (no checked attr).
    expect(html).not.toMatch(/data-invite-auto-approve=""[^>]*checked/);
    expect(onCreate).not.toHaveBeenCalled();
  });

  it("banner names the chosen platform for its Copy prompt", () => {
    const render = (platform?: "grok" | "muse") =>
      renderToStaticMarkup(
        createElement(AwcProjectInviteCreatedBanner, {
          createdInviteUrl: "https://example.com/invite/p/tok",
          createdInviteToken: "tok",
          projectId: "p1",
          projectName: null,
          platform,
          onClearCreatedUrl: () => undefined,
        }),
      );
    expect(render("muse")).toContain("this Copy prompt is for a Muse bot");
    expect(render("grok")).toContain("this Copy prompt is for a Grok Bot");
    expect(render()).toContain('data-invite-platform="grok"');
    expect(render("muse")).toContain("Copy prompt");
  });
});

describe("Bot-to-bot works with", () => {
  it("renders the exact product strings from the constant", () => {
    expect(AWC_BOT_TO_BOT_SUPPORT_ROWS.map((r) => r.label)).toEqual([
      "Grok Bot: works out of the box",
    ]);
    const html = renderToStaticMarkup(createElement(AwcBotToBotSupportList));
    expect(html).toContain("Bot-to-bot works with");
    for (const row of AWC_BOT_TO_BOT_SUPPORT_ROWS) {
      expect(html).toContain(row.label);
    }
    expect(html).not.toMatch(/HMAC|agent-access|not yet tested|Muse/i);
  });

  it("styles the Grok entry as ready (not italic caveat)", () => {
    const html = renderToStaticMarkup(createElement(AwcBotToBotSupportList));
    const classOf = (level: string) =>
      new RegExp(`data-support-level="${level}" class="([^"]+)"`).exec(
        html,
      )?.[1];
    expect(classOf("routine")).toContain("font-medium");
    expect(classOf("routine")).not.toContain("italic");
    expect(html).toContain("●");
    expect(html).not.toContain("✓");
    expect(html).not.toContain("○");
  });
});
