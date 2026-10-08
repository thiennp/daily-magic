import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import { formatPendingApprovalMode } from "@/features/projects/access/approvalCard/formatPendingApprovalCard";
import type { PendingApprovalCardMeta } from "@/lib/projects/acl/approvalCard/PendingApprovalCardMeta.type";

export type PendingCapabilityIcon =
  "eye" | "users" | "send" | "inbox" | "spark" | "clock";

export type PendingCapability = {
  readonly icon: PendingCapabilityIcon;
  readonly label: string;
};

/** Chips shown before "+N more". */
export const PENDING_CAPABILITIES_VISIBLE = 4;

/**
 * COPY.md canDoBody as chips, plus the join mode when it is known.
 * Only what the card already promised — no extra capability or limit claims.
 */
export const pendingCapabilities = (
  _card?: PendingApprovalCardMeta | null,
): readonly PendingCapability[] => {
  const base: PendingCapability[] = [
    { icon: "eye", label: C.canRead },
    { icon: "users", label: C.canSeePeers },
    { icon: "send", label: C.canSend },
    { icon: "spark", label: C.canUseSkills },
  ];
  return base;
};

/** Join mode shown as its own pill under the tags (design v2), when known. */
export const pendingModeLabel = (
  card: PendingApprovalCardMeta | null | undefined,
): string | null => (card ? formatPendingApprovalMode(card) : null);
