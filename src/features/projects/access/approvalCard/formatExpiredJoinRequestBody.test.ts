import { describe, expect, it } from "vitest";

import { formatExpiredJoinRequestBody } from "@/features/projects/access/approvalCard/formatPendingApprovalCard";
import type { PendingApprovalCardMeta } from "@/lib/projects/acl/approvalCard/PendingApprovalCardMeta.type";

const card = (
  over: Partial<PendingApprovalCardMeta> = {},
): PendingApprovalCardMeta => ({
  assistantKind: "Claude",
  ownerClaimed: true,
  ownerPersonName: "Thien",
  connectVia: "device_code",
  expectedDeliveryMode: "poll",
  modeKnown: true,
  isExpired: true,
  ...over,
});

describe("expired join request body (Product EN)", () => {
  it("expired body: code / sign-in path vs invite path", () => {
    expect(formatExpiredJoinRequestBody(card())).toBe(
      "The assistant must start again with a new code.",
    );
    expect(formatExpiredJoinRequestBody(card({ connectVia: "sign_in" }))).toBe(
      "The assistant must start again with a new code.",
    );
    expect(formatExpiredJoinRequestBody(card({ connectVia: null }))).toBe(
      "The assistant must ask to join again with the invite.",
    );
    expect(formatExpiredJoinRequestBody(null)).toBe(
      "The assistant must ask to join again with the invite.",
    );
  });
});
