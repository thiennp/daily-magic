import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import AwcProjectMembersInvitePendingList from "@/features/projects/members/AwcProjectMembersInvitePendingList";

const invite = (inviteId: string, autoApprove = false): AwcProjectAccessInvite =>
  ({
    inviteId,
    createdAt: "2026-10-07T18:00:00.000Z",
    expiresAt: "2026-10-14T12:00:00.000Z",
    revokedAt: null,
    maxUses: 1,
    usesRemaining: 1,
    teamLabel: null,
    scopes: [],
    autoApprove,
  }) as AwcProjectAccessInvite;

const render = (
  copyPromptFor?: (id: string) => string | null,
  typeLabelFor?: (id: string) => string | null,
  invites = [invite("inv-a"), invite("inv-b")],
) =>
  renderToStaticMarkup(
    createElement(AwcProjectMembersInvitePendingList, {
      invites,
      onRevoke: () => undefined,
      onTurnOffAutoApprove: () => undefined,
      copyPromptFor,
      typeLabelFor,
    }),
  ).replace(/&#x27;/g, "'");

describe("DF-036 D4 unused assistant invite rows", () => {
  it("says what the invite is: type, one use, expiry; Copy again · Cancel invite", () => {
    const html = render(
      (id) => (id === "inv-a" ? "Join my AgentWitch…" : null),
      (id) => (id === "inv-a" ? "Grok Bot" : null),
    );
    expect(html).toContain("Invite for Grok Bot");
    expect(html).toContain("Assistant invite");
    expect(html.match(/Not used yet · for 1 assistant · expires Oct 1[45]/g)).toHaveLength(2);
    expect(html).toContain('data-invite-copy="inv-a"');
    expect(html).toContain(">Copy again<");
    expect(html.match(/>Cancel invite</g)).toHaveLength(2);
    expect(html).not.toMatch(/Invite sent|Waiting for assistant|Any assistant|Approve/);
  });

  it("no way to copy: the lost-copy line instead of Copy again", () => {
    const html = render();
    expect(html).not.toContain("data-invite-copy=");
    expect(html).toContain('data-invite-copy-unavailable="inv-a"');
    expect(html).toContain("The invite was shown once. Cancel it and make a new one if you lost it.");
    expect(html).not.toContain("tok-");
  });

  it("auto-approve rows keep the chip and Turn off", () => {
    const html = render(undefined, undefined, [invite("inv-c", true)]);
    expect(html).toContain("Auto-approve on");
    expect(html).toContain(">Turn off<");
  });

  it("one note about Pending and one (i) tip under the list", () => {
    const html = render();
    expect(html).toContain("When an assistant uses an invite, it appears under Pending for you to approve.");
    expect(html).toContain("Grok Bot sets up its wake link after it joins.");
    expect(html).not.toMatch(/routine|Muse/);
    expect(render(undefined, undefined, [])).not.toContain("data-invite-note");
  });
});
