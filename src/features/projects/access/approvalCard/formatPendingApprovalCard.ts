import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import type { PendingApprovalCardMeta } from "@/lib/projects/acl/approvalCard/PendingApprovalCardMeta.type";

type NamedRequest = {
  readonly requesterLabel?: string | null;
  readonly suggestedProjectDisplayName?: string | null;
};

const clean = (value: string | null | undefined): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : null;

/** Account name first (who is really asking), then suggested nickname. */
export const pendingAssistantName = (req: NamedRequest): string =>
  clean(req.requesterLabel) ??
  clean(req.suggestedProjectDisplayName) ??
  C.assistantFallback;

/** "Who is asking" line; the no-kind variants drop the "· {kind}" part. */
export const formatPendingApprovalWhoLine = (input: {
  readonly assistantName: string;
  readonly card: PendingApprovalCardMeta;
}): string => {
  const kind = clean(input.card.assistantKind);
  const person = clean(input.card.ownerPersonName) ?? C.personFallback;
  const claimed = input.card.ownerClaimed;
  const withKind = claimed ? C.whoLine : C.whoUnknownPerson;
  const noKind = claimed ? C.whoLineNoKind : C.whoUnknownPersonNoKind;
  const template = kind === null ? noKind : withKind;
  return template
    .replace("{assistantName}", input.assistantName)
    .replace("{kind}", kind ?? "")
    .replace("{personName}", person);
};

/** Mode line, or null when the join mode is not known before Approve. */
export const formatPendingApprovalMode = (
  card: PendingApprovalCardMeta,
): string | null => {
  if (!card.modeKnown) return null;
  return card.expectedDeliveryMode === "poll" ? C.modeNoWake : C.modeWake;
};

/** Expired body by how the request came in: code / sign-in vs invite only. */
export const formatExpiredJoinRequestBody = (
  card: PendingApprovalCardMeta | null | undefined,
): string =>
  (card?.connectVia ?? null) === null ? C.expiredBodyInvite : C.expiredBody;

export const formatPendingDecisionToast = (
  decision: "approved" | "denied",
  assistantName: string,
): string =>
  (decision === "approved" ? C.approvedToast : C.deniedToast).replace(
    "{assistantName}",
    assistantName,
  );
