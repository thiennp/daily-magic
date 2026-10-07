import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import AwcProjectMembersInvitePendingList from "@/features/projects/members/AwcProjectMembersInvitePendingList";

const invite = (inviteId: string): AwcProjectAccessInvite =>
  ({
    inviteId,
    createdAt: "2026-10-07T18:00:00.000Z",
    expiresAt: "2026-10-14T18:00:00.000Z",
    revokedAt: null,
    maxUses: 1,
    usesRemaining: 1,
    teamLabel: null,
    scopes: [],
    autoApprove: false,
  }) as AwcProjectAccessInvite;

const render = (copyPromptFor?: (id: string) => string | null) =>
  renderToStaticMarkup(
    createElement(AwcProjectMembersInvitePendingList, {
      invites: [invite("inv-a"), invite("inv-b")],
      onRevoke: () => undefined,
      copyPromptFor,
    }),
  );

describe("DF-014 pending Invite sent row: Copy again", () => {
  it("shows Copy on rows this tab can rebuild a prompt for", () => {
    const html = render((id) =>
      id === "inv-a" ? "Join my AgentWitch…" : null,
    );
    expect(html).toContain('data-invite-copy="inv-a"');
    expect(html).not.toContain('data-invite-copy="inv-b"');
    expect(html).toContain('aria-label="Copy prompt"');
    expect(html).toContain(">Copy<");
    expect(html.match(/Invite sent/g)).toHaveLength(2);
    expect(html.match(/>Cancel</g)).toHaveLength(2);
    // State 1 stays Cancel-only for approval: never an Approve button here.
    expect(html).not.toContain("Approve");
  });

  it("without a prompt source the row stays Invite sent + Cancel", () => {
    const html = render();
    expect(html).not.toContain("data-invite-copy");
    expect(html).toContain("Invite sent");
    expect(html).not.toContain("tok-");
  });
});
