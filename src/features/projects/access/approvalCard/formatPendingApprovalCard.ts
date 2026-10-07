import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import type { PendingApprovalCardMeta } from "@/lib/projects/acl/approvalCard/PendingApprovalCardMeta.type";

type NamedRequest = {
  readonly requesterLabel?: string | null;
  readonly suggestedProjectDisplayName?: string | null;
};

export const cleanLabel = (value: string | null | undefined): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : null;

/** Account name first (who is really asking), then suggested nickname. */
export const pendingAssistantName = (req: NamedRequest): string =>
  cleanLabel(req.requesterLabel) ??
  cleanLabel(req.suggestedProjectDisplayName) ??
  C.assistantFallback;

/** Avatar initials: first letters of the first two words, else first two letters. */
export const pendingInitials = (name: string): string => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const raw =
    words.length > 1
      ? `${words[0]!.charAt(0)}${words[1]!.charAt(0)}`
      : words[0]!.slice(0, 2);
  return raw.toUpperCase();
};

/** "Belongs to …" when a person claimed it; null when not linked yet. */
export const formatPendingOwnerLine = (
  card: PendingApprovalCardMeta,
): string | null =>
  card.ownerClaimed
    ? C.belongsTo.replace(
        "{personName}",
        cleanLabel(card.ownerPersonName) ?? C.personFallback,
      )
    : null;

/** One-line "who" summary; the no-kind variants drop the "· {kind}" part. */
export const formatPendingApprovalWhoLine = (input: {
  readonly assistantName: string;
  readonly card: PendingApprovalCardMeta;
}): string => {
  const kind = cleanLabel(input.card.assistantKind);
  const person = cleanLabel(input.card.ownerPersonName) ?? C.personFallback;
  const claimed = input.card.ownerClaimed;
  const withKind = claimed ? C.whoLine : C.whoNotLinked;
  const noKind = claimed ? C.whoLineNoKind : C.whoNotLinkedNoKind;
  return (kind === null ? noKind : withKind)
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

const pad = (n: number): string => String(n).padStart(2, "0");
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/** "Asked today, 20:41" / "Asked Oct 6, 09:00" (viewer's local time, 24 h). */
export const formatPendingAskedAt = (
  createdAt: string | null | undefined,
  now: Date = new Date(),
): string | null => {
  if (!createdAt) return null;
  const at = new Date(createdAt);
  if (Number.isNaN(at.getTime())) return null;
  const time = `${pad(at.getHours())}:${pad(at.getMinutes())}`;
  const sameDay = at.toDateString() === now.toDateString();
  if (sameDay) return C.askedToday.replace("{time}", time);
  const date = `${MONTHS[at.getMonth()]} ${at.getDate()}`;
  return C.askedOn.replace("{date}", date).replace("{time}", time);
};

/** Expired body by how the request came in: code / sign-in vs invite only. */
export const formatExpiredJoinRequestBody = (
  card: PendingApprovalCardMeta | null | undefined,
): string =>
  (card?.connectVia ?? null) === null ? C.expiredBodyInvite : C.expiredBody;

export type PendingDecision = "approved" | "denied";

/** Resolved row copy after the owner's action succeeds (no Undo). */
export const formatPendingResolved = (
  decision: PendingDecision,
  names: { readonly nickname: string; readonly requester: string },
): { readonly title: string; readonly sub: string } =>
  decision === "approved"
    ? {
        title: C.approvedTitle.replace("{name}", names.nickname),
        sub: C.approvedSub,
      }
    : {
        title: C.deniedTitle.replace("{requester}", names.requester),
        sub: C.deniedSub,
      };
