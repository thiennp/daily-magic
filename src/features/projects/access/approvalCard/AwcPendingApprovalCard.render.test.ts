import { describe, expect, it } from "vitest";

import {
  req,
  row,
  text,
} from "@/features/projects/access/approvalCard/AwcPendingApprovalCard.fixtures";

describe("pending join card (DF-017)", () => {
  it("stacked: who → chips → name → actions; plain copy", () => {
    const html = row();
    const t = text(html);
    const order = [
      "Scout",
      "Assistant",
      "Claude",
      "Belongs to Thien",
      "Read project info",
      "Name in this project",
      "This is the name it asked for. You can change it.",
      "Deny",
      "Approve",
    ].map((s) => t.indexOf(s));
    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    expect(t).not.toContain("more");
    expect(t).toContain("See who’s here");
    expect(t).toContain("Show details");
    expect(html).toMatch(
      /<p[^>]*hidden=""[^>]*>Read project info and see who is in the project\. Send and receive short project messages\. Use shared skills the owner publishes\.<\/p>/,
    );
    expect(t).not.toMatch(/\bpeers\b/);
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
        approvalCard: {
          ...req.approvalCard,
          ownerClaimed: false,
          ownerPersonName: null,
          connectVia: null,
        },
      },
    });
    const t = text(html);
    expect(t).toContain("Not linked to a person yet");
    expect(t).toContain(
      "Nobody has said this assistant is theirs yet. You can still allow it in. Someone can link it to themselves later.",
    );
    expect(t).toContain("Asked with an invite link");
    expect(html).toContain('role="tooltip"');
    expect(html).toContain("bg-awc-primary");
    expect(html).toContain("hover:bg-awc-blue-700");
    expect(html).not.toMatch(/#18523f|#174d41|#2150d6|#d5e2dd/i);
  });

  it("taken / invalid name: inline error, Approve disabled only for format issues", () => {
    const taken = row({
      error:
        "Another assistant here is already called “Scout”. Pick a different name.",
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
});
