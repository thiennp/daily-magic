import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcPendingResolvedRow from "@/features/projects/access/approvalCard/AwcPendingResolvedRow";
import AwcProjectAccessPendingList from "@/features/projects/access/AwcProjectAccessPendingList";
import AwcProjectAccessPendingRow from "@/features/projects/access/AwcProjectAccessPendingRow";
import AwcProjectMembersJoinRequestsSection from "@/features/projects/members/AwcProjectMembersJoinRequestsSection";

const text = (html: string): string =>
  html
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"')
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
const row = (over: Partial<Parameters<typeof AwcProjectAccessPendingRow>[0]> = {}) =>
  renderToStaticMarkup(
    createElement(AwcProjectAccessPendingRow, {
      req,
      nameValue: "Scout",
      error: null,
      available: [],
      onNameChange: noop,
      onApprove: noop,
      onDeny: noop,
      ...over,
    }),
  );

describe("pending join card (DF-017)", () => {
  it("stacked: who → chips → name → actions; plain copy", () => {
    const html = row();
    const t = text(html);
    const order = [
      "Scout",
      "Assistant",
      "Claude",
      "Belongs to Thien",
      "If you approve, it can",
      "Read project info",
      "Name in this project",
      "This is the name it asked for. You can change it.",
      "You can remove it any time from Members.",
      "Deny",
      "Approve",
    ].map((s) => t.indexOf(s));
    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    expect(t).toContain("+2 more");
    expect(t).not.toContain("Checks on demand (no wake link)");
    expect(html).toMatch(/>Approve<\/button>/);
    expect(html).toMatch(/>Deny<\/button>/);
    expect(html).toContain('maxLength="32"');
    expect(t.toLowerCase()).not.toMatch(/\bbots?\b|not claimed|team member/);
    expect(t).not.toMatch(/can.t change settings|run workflows|Undo/);
  });

  it("not linked: plain badge + tooltip; Pine tokens, no off-lock hex", () => {
    const html = row({
      req: {
        ...req,
        approvalCard: { ...req.approvalCard, ownerClaimed: false, ownerPersonName: null, connectVia: null },
      },
    });
    const t = text(html);
    expect(t).toContain("Not linked to a person yet");
    expect(t).toContain(
      "Nobody has said this assistant is theirs yet. You can still let it in. Someone can link it to themselves later.",
    );
    expect(t).toContain("Asked with an invite link");
    expect(html).toContain('role="tooltip"');
    expect(html).toContain("bg-awc-primary");
    expect(html).toContain("hover:bg-awc-blue-700");
    expect(html).not.toMatch(/#18523f|#174d41|#2150d6|#d5e2dd/i);
  });

  it("taken / invalid name: inline error, Approve disabled only for format issues", () => {
    const taken = row({
      error: "Another assistant here is already called “Scout”. Pick a different name.",
    });
    expect(text(taken)).toContain(
      "Another assistant here is already called “Scout”. Pick a different name.",
    );
    expect(taken).toContain('aria-invalid="true"');
    expect(taken).not.toMatch(/disabled=""[^>]*>Approve</);
    const invalid = row({ nameValue: "A" });
    expect(text(invalid)).toContain("Use 2–32 letters.");
    expect(invalid).toMatch(/disabled=""[^>]*>Approve</);
  });

  it("busy state shows working labels", () => {
    expect(text(row({ busy: "approving" }))).toContain("Approving…");
    expect(text(row({ busy: "denying" }))).toContain("Denying…");
  });

  it("list prefills the requested name (requesterLabel) over the preset", () => {
    const html = renderToStaticMarkup(
      createElement(AwcProjectAccessPendingList, {
        projectId: "p1",
        pending: [{ ...req, requesterLabel: "NRG Lead" }],
        onApprove: async () => ({ ok: true }),
        onDeny: async () => true,
      }),
    );
    expect(html).toContain('value="NRG Lead"');
    expect(text(html)).toContain("This is the name it asked for.");
  });

  it("resolved rows: approved / denied, no Undo", () => {
    const ok = text(
      renderToStaticMarkup(
        createElement(AwcPendingResolvedRow, {
          decision: "approved",
          nickname: "NRG Lead",
          requester: "NRG Lead",
        }),
      ),
    );
    expect(ok).toContain("NRG Lead joined the project");
    expect(ok).toContain("It now appears under Assistants.");
    const no = renderToStaticMarkup(
      createElement(AwcPendingResolvedRow, {
        decision: "denied",
        nickname: "x",
        requester: "NRG Lead",
      }),
    );
    expect(text(no)).toContain("Request from NRG Lead denied It has no access.");
    expect(no).not.toContain("<button");
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
