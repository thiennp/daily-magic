import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcProjectAccessPendingRow from "@/features/projects/access/AwcProjectAccessPendingRow";
import AwcProjectMembersJoinRequestsSection from "@/features/projects/members/AwcProjectMembersJoinRequestsSection";

const text = (html: string): string =>
  html
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&#x27;", "'")
    .replace(/\s+/g, " ");

const req = {
  id: "r1",
  requesterUserId: "bot-1",
  reason: null,
  createdAt: "2026-10-06T09:00:00.000Z",
  requesterIsAgent: true,
  requesterLabel: "Scout",
  suggestedProjectDisplayName: null,
  approvalCard: {
    assistantKind: "Claude",
    ownerClaimed: true,
    ownerPersonName: "Thien",
    connectVia: "device_code" as const,
    expectedDeliveryMode: "poll" as const,
    modeKnown: true,
    isExpired: false,
  },
};
const noop = () => undefined;

describe("owner approval card (S3)", () => {
  it("pending row shows who / what / mode and Approve + Deny", () => {
    const html = renderToStaticMarkup(
      createElement(AwcProjectAccessPendingRow, {
        req,
        nameValue: "Scout",
        error: null,
        available: [],
        onNameChange: noop,
        onApprove: noop,
        onDeny: noop,
      }),
    );
    const t = text(html);
    expect(t).toContain("Asked to join · waiting for your approval");
    expect(t).toContain("Who is asking Scout · Claude · belongs to Thien");
    expect(t).toContain("What it can do Read project info and peers.");
    expect(t).toContain("Checks on demand (no wake link)");
    expect(html).toMatch(/>Approve<\/button>/);
    expect(html).toMatch(/>Deny<\/button>/);
    expect(t).toContain("Assistant nickname");
    expect(t.toLowerCase()).not.toMatch(/\bbots?\b/);
  });

  it("rail section: nothing when empty; expired card has no actions", () => {
    const base = {
      projectId: "p1",
      onApprove: async () => ({ ok: true }),
      onDeny: async () => true,
    };
    expect(
      renderToStaticMarkup(
        createElement(AwcProjectMembersJoinRequestsSection, {
          ...base,
          pending: [],
          expired: [],
        }),
      ),
    ).toBe("");
    const html = renderToStaticMarkup(
      createElement(AwcProjectMembersJoinRequestsSection, {
        ...base,
        pending: [],
        expired: [
          { ...req, approvalCard: { ...req.approvalCard, isExpired: true } },
        ],
      }),
    );
    const t = text(html);
    expect(t).toContain("This join request expired");
    expect(t).toContain("The assistant must start again with a new code.");
    expect(html.match(/<button/g)).toBeNull();
  });
});
