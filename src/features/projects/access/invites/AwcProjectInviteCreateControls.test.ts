import { createElement, isValidElement, type ReactNode } from "react";
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

type Props = { children?: ReactNode; onClick?: () => void; type?: string };

const findButtons = (node: ReactNode): Props[] => {
  if (Array.isArray(node)) return node.flatMap(findButtons);
  if (!isValidElement<Props>(node)) return [];
  const self = node.type === "button" ? [node.props] : [];
  return [...self, ...findButtons(node.props.children)];
};

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

describe("Create invite: Grok / Muse choice", () => {
  it("panel shows both labelled create buttons and the support list", () => {
    const html = panelHtml();
    expect(html).toContain("Invite a Grok Bot");
    expect(html).toContain("Invite a Muse bot");
    expect(html).not.toContain(">Create invite<");
    expect(html).toContain(AWC_BOT_TO_BOT_SUPPORT_HEADING);
  });

  it("each button creates an invite for its own platform", () => {
    const onCreate = vi.fn();
    const buttons = findButtons(AwcProjectInviteCreateControls({ onCreate }));
    expect(buttons.map((b) => b.children)).toEqual([
      "Invite a Grok Bot",
      "Invite a Muse bot",
    ]);
    buttons.forEach((b) => b.onClick?.());
    expect(onCreate.mock.calls).toEqual([["grok"], ["muse"]]);
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
      "Grok Bot — tested end to end via routine webhook",
      "Any agent that can call the agent-access API and receive an HMAC-signed webhook (for example Muse) — supported via HMAC webhook, not yet tested end to end",
    ]);
    const html = renderToStaticMarkup(createElement(AwcBotToBotSupportList));
    expect(html).toContain("Bot-to-bot works with");
    for (const row of AWC_BOT_TO_BOT_SUPPORT_ROWS) {
      expect(html).toContain(row.label);
    }
  });

  it("styles the tested and HMAC-supported entries differently", () => {
    const html = renderToStaticMarkup(createElement(AwcBotToBotSupportList));
    const classOf = (level: string) =>
      new RegExp(`data-support-level="${level}" class="([^"]+)"`).exec(
        html,
      )?.[1];
    expect(classOf("tested")).toContain("text-emerald-800");
    expect(classOf("hmac")).toContain("italic");
    expect(classOf("tested")).not.toBe(classOf("hmac"));
    expect(html).toContain("✓");
    expect(html).toContain("○");
  });
});
