import { describe, expect, it } from "vitest";

import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import {
  PENDING_CAPABILITIES_VISIBLE,
  pendingCapabilities,
  pendingModeLabel,
} from "@/features/projects/access/approvalCard/pendingCapabilities";
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

describe("pending capability tags", () => {
  it("capability tags: 4 short tags; the join mode is its own pill", () => {
    expect(PENDING_CAPABILITIES_VISIBLE).toBe(4);
    expect(pendingCapabilities(card()).map((c) => c.label)).toEqual([
      "Read project info",
      "See who’s here",
      "Short messages",
      "Use your skills",
    ]);
    expect(pendingCapabilities(card({ modeKnown: true }))).toHaveLength(4);
    expect(pendingCapabilities(null)).toHaveLength(4);
    expect(pendingModeLabel(card({ modeKnown: true }))).toBe(C.modeWake);
    expect(pendingModeLabel(null)).toBeNull();
  });
});
