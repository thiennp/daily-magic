import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcHumanInvitePersonForm from "@/features/projects/access/humanInvites/AwcHumanInvitePersonForm";
import AwcHumanPendingInvitesSection from "@/features/projects/access/humanInvites/AwcHumanPendingInvitesSection";
import type { HumanInviteListItem } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

const base: HumanInviteListItem = {
  inviteId: "inv-1",
  role: "member",
  email: "ada@example.org",
  requireEmailMatch: false,
  createdAt: "2026-10-07T00:00:00.000Z",
  expiresAt: "2026-10-14T00:00:00.000Z",
  revokedAt: null,
  maxUses: 1,
  usesRemaining: 1,
  status: "pending",
  delivery: "email",
  requiresApproval: true,
  emailSentAt: "2026-10-07T00:00:01.000Z",
};

describe("DF-025 Members email invite UI", () => {
  it("Email tab: live Send invite + Approve-before-join checked by default", () => {
    const html = renderToStaticMarkup(
      createElement(AwcHumanInvitePersonForm, {
        onCreate: () => undefined,
        onSendEmails: async () => true,
      }),
    );
    expect(html).toContain("data-human-invite-send");
    expect(html).toContain(">Send invite<");
    expect(html).not.toContain(">Later<");
    // Design: descriptions live in (i) tips, no comma helper line.
    expect(html).not.toContain("What happens next");
    expect(html).not.toContain("Separate several emails");
    expect(html).toContain('placeholder="Email"');
    expect(html).toContain('role="tooltip"');
    expect(html).toMatch(
      /<input type="checkbox"[^>]*checked=""[^>]*\/><span>Approve before they join/,
    );
    // F1: Only this email can join is ON by default (owner can untick).
    expect(html).toMatch(
      /<input type="checkbox"[^>]*checked=""[^>]*\/><span>Only this email can join/,
    );
  });

  it("without a send handler the legacy disabled Send invite · Later stays", () => {
    const html = renderToStaticMarkup(
      createElement(AwcHumanInvitePersonForm, { onCreate: () => undefined }),
    );
    expect(html).not.toContain("data-human-invite-send");
    expect(html).toContain(">Later<");
    expect(html).not.toContain("Approve before they join");
  });

  it("pending email row: Invite sent to <email> + Cancel, no Approve", () => {
    const html = renderToStaticMarkup(
      createElement(AwcHumanPendingInvitesSection, {
        pendingInvites: [base],
        onRevokeInvite: () => undefined,
      }),
    );
    expect(html).toContain("Invite sent to ada@example.org");
    expect(html).toContain(">Cancel<");
    expect(html).not.toContain(">Approve<");
  });

  it("accepted row: Wants to join + Deny / Approve (never auto)", () => {
    const html = renderToStaticMarkup(
      createElement(AwcHumanPendingInvitesSection, {
        pendingInvites: [
          {
            ...base,
            inviteId: "inv-2",
            status: "accepted",
            acceptedDisplayName: "Ada",
          },
          base,
        ],
        onRevokeInvite: () => undefined,
        onApproveRequest: () => undefined,
        onDenyRequest: () => undefined,
      }),
    );
    expect(html).toContain("data-human-invite-awaiting");
    expect(html).toContain("Wants to join");
    expect(html).toContain(">Approve<");
    expect(html).toContain(">Deny<");
    expect(html.indexOf("Wants to join")).toBeLessThan(
      html.indexOf("Invite sent to"),
    );
  });
});
