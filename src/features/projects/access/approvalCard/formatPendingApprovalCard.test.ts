import { describe, expect, it } from "vitest";

import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import {
  formatPendingApprovalMode,
  formatPendingApprovalWhoLine,
  formatPendingAskedAt,
  formatPendingOwnerLine,
  formatPendingResolved,
  pendingAssistantName,
  pendingInitials,
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

describe("pending approval card formatters", () => {
  it("owner line: claimed person, unnamed person, not linked", () => {
    expect(formatPendingOwnerLine(card())).toBe("Belongs to Thien");
    expect(formatPendingOwnerLine(card({ ownerPersonName: " " }))).toBe(
      "Belongs to a person with no name set",
    );
    expect(
      formatPendingOwnerLine(
        card({ ownerClaimed: false, ownerPersonName: null }),
      ),
    ).toBeNull();
  });

  it("who line (One Window): claimed, not linked, no kind", () => {
    const who = (over: Partial<PendingApprovalCardMeta>) =>
      formatPendingApprovalWhoLine({
        assistantName: "Scout",
        card: card(over),
      });
    expect(who({})).toBe("Scout · Claude · belongs to Thien");
    expect(who({ ownerClaimed: false, ownerPersonName: null })).toBe(
      "Scout · Claude · not linked to a person yet",
    );
    expect(who({ assistantKind: null, ownerPersonName: null })).toBe(
      "Scout · belongs to a person with no name set",
    );
    expect(who({ assistantKind: null, ownerClaimed: false })).toBe(
      "Scout · not linked to a person yet",
    );
  });

  it("mode only when known", () => {
    expect(formatPendingApprovalMode(card())).toBeNull();
    expect(
      formatPendingApprovalMode(
        card({ modeKnown: true, expectedDeliveryMode: "poll" }),
      ),
    ).toBe(C.modeNoWake);
    expect(formatPendingApprovalMode(card({ modeKnown: true }))).toBe(
      C.modeWake,
    );
  });

  it("asked-at: today vs other day, local 24h; bad input → null", () => {
    const now = new Date(2026, 9, 7, 21, 6);
    expect(
      formatPendingAskedAt(new Date(2026, 9, 7, 20, 41).toISOString(), now),
    ).toBe("Asked today, 20:41");
    expect(
      formatPendingAskedAt(new Date(2026, 9, 6, 9, 0).toISOString(), now),
    ).toBe("Asked Oct 6, 09:00");
    expect(formatPendingAskedAt("nope", now)).toBeNull();
    expect(formatPendingAskedAt(undefined, now)).toBeNull();
  });

  it("initials, resolved rows, name fallback", () => {
    expect(pendingInitials("NRG Lead")).toBe("NL");
    expect(pendingInitials("scout")).toBe("SC");
    expect(
      formatPendingResolved("approved", {
        nickname: "NRG Lead",
        requester: "x",
      }),
    ).toEqual({
      title: "NRG Lead joined the project",
      sub: "It now appears under Assistants.",
    });
    expect(
      formatPendingResolved("denied", { nickname: "x", requester: "NRG Lead" }),
    ).toEqual({
      title: "Request from NRG Lead denied",
      sub: "It has no access.",
    });
    expect(
      pendingAssistantName({
        requesterLabel: " ",
        suggestedProjectDisplayName: null,
      }),
    ).toBe("this assistant");
  });
});
