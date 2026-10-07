import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcHumanAwaitingApprovalRow from "@/features/projects/access/humanInvites/AwcHumanAwaitingApprovalRow";
import type { HumanInviteListItem } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

const accepted: HumanInviteListItem = {
  inviteId: "inv-2",
  role: "member",
  email: "ada@example.org",
  requireEmailMatch: false,
  createdAt: "2026-10-07T00:00:00.000Z",
  expiresAt: "2026-10-14T00:00:00.000Z",
  revokedAt: null,
  maxUses: 1,
  usesRemaining: 0,
  status: "accepted",
  delivery: "email",
  requiresApproval: true,
  acceptedDisplayName: "Ada",
};

function renderRow(invite: HumanInviteListItem): string {
  return renderToStaticMarkup(
    createElement(AwcHumanAwaitingApprovalRow, { invite }),
  );
}

describe("DF-025 F1 Wants to join row identity", () => {
  it("lock OFF: shows the accepter's verified email, never the invited one", () => {
    const html = renderRow({ ...accepted, acceptedByEmail: "bob@example.org" });
    expect(html).toContain("Wants to join");
    expect(html).toContain(">Ada<");
    expect(html).toContain(" · bob@example.org");
    expect(html).not.toContain("ada@example.org");
  });

  it("lock OFF + no verified accepter email: neither address, Someone fallback", () => {
    expect(renderRow(accepted)).not.toContain("ada@example.org");
    const html = renderRow({ ...accepted, acceptedDisplayName: null });
    expect(html).toContain(">Someone<");
    expect(html).not.toContain("ada@example.org");
  });

  it("lock ON: shows the server-verified email (accepter = invited)", () => {
    for (const acceptedByEmail of [null, "ada@example.org"]) {
      const html = renderRow({
        ...accepted,
        requireEmailMatch: true,
        acceptedByEmail,
      });
      expect(html).toContain(">Ada<");
      expect(html.match(/ada@example\.org/g)).toHaveLength(1);
    }
  });

  it("no nickname: the verified email is the name, not repeated", () => {
    const html = renderRow({
      ...accepted,
      acceptedDisplayName: null,
      acceptedByEmail: "bob@example.org",
    });
    expect(html).toContain(">bob@example.org<");
    expect(html.match(/bob@example\.org/g)).toHaveLength(1);
  });
});
