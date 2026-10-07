import { describe, expect, it } from "vitest";

import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import {
  formatPendingApprovalMode,
  formatPendingApprovalWhoLine,
  formatPendingDecisionToast,
  pendingAssistantName,
} from "@/features/projects/access/approvalCard/formatPendingApprovalCard";
import type { PendingApprovalCardMeta } from "@/lib/projects/acl/approvalCard/PendingApprovalCardMeta.type";

const card = (
  over: Partial<PendingApprovalCardMeta> = {},
): PendingApprovalCardMeta => ({
  assistantKind: "Claude",
  ownerClaimed: true,
  ownerPersonName: "Thien",
  connectVia: "device_code",
  expectedDeliveryMode: "webhook",
  modeKnown: false,
  isExpired: false,
  ...over,
});

describe("pending approval card copy (COPY.md pending_card.* verbatim)", () => {
  it("locks every COPY.md string", () => {
    expect(C.title).toBe("Wants to join");
    expect(C.whoLabel).toBe("Who is asking");
    expect(C.canDoLabel).toBe("What it can do");
    expect(C.canDoBody).toBe(
      "Read project info and peers. Send and receive short project messages. Use shared skills the owner publishes.",
    );
    expect(C.modeWake).toBe("Wakes up on its own when there is work");
    expect(C.modeNoWake).toBe("Checks on demand (no wake link)");
    expect([C.approve, C.deny]).toEqual(["Approve", "Deny"]);
    expect(C.expiredTitle).toBe("This join request expired");
    expect(C.expiredBody).toBe(
      "The assistant must start again with a new code.",
    );
    expect(C.expiredBodyInvite).toBe(
      "The assistant must ask to join again with the invite.",
    );
    const all = Object.values(C).join(" ").toLowerCase();
    expect(all).not.toMatch(
      /\bbots?\b|oauth|device_code|awc_proj_|token|its person|@/,
    );
  });

  it("who line: claimed, unclaimed, no kind, no person name", () => {
    expect(
      formatPendingApprovalWhoLine({ assistantName: "Scout", card: card() }),
    ).toBe("Scout · Claude · belongs to Thien");
    expect(
      formatPendingApprovalWhoLine({
        assistantName: "Scout",
        card: card({ ownerClaimed: false, ownerPersonName: null }),
      }),
    ).toBe("Scout · Claude · person not claimed yet");
    expect(
      formatPendingApprovalWhoLine({
        assistantName: "Scout",
        card: card({ ownerPersonName: null }),
      }),
    ).toBe("Scout · Claude · belongs to a person with no name set");
    expect(
      formatPendingApprovalWhoLine({
        assistantName: "Scout",
        card: card({ assistantKind: null, ownerPersonName: null }),
      }),
    ).toBe("Scout · belongs to a person with no name set");
    expect(
      formatPendingApprovalWhoLine({
        assistantName: "Scout",
        card: card({ assistantKind: null }),
      }),
    ).toBe("Scout · belongs to Thien");
    expect(
      formatPendingApprovalWhoLine({
        assistantName: "Scout",
        card: card({ assistantKind: null, ownerClaimed: false }),
      }),
    ).toBe("Scout · person not claimed yet");
  });

  it("mode only when known; toasts; name fallback", () => {
    expect(formatPendingApprovalMode(card())).toBeNull();
    expect(
      formatPendingApprovalMode(
        card({ modeKnown: true, expectedDeliveryMode: "poll" }),
      ),
    ).toBe(C.modeNoWake);
    expect(formatPendingApprovalMode(card({ modeKnown: true }))).toBe(
      C.modeWake,
    );
    expect(formatPendingDecisionToast("approved", "Scout")).toBe(
      "You approved Scout. It can finish joining now.",
    );
    expect(formatPendingDecisionToast("denied", "Scout")).toBe(
      "You denied Scout. It did not get access.",
    );
    expect(
      pendingAssistantName({
        requesterLabel: " ",
        suggestedProjectDisplayName: null,
      }),
    ).toBe("this assistant");
  });
});
