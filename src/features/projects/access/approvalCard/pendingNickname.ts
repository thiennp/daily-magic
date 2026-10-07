import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import { cleanLabel } from "@/features/projects/access/approvalCard/formatPendingApprovalCard";
import { validateProjectDisplayName } from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";

type NicknameSource = {
  readonly requesterLabel?: string | null;
  readonly suggestedProjectDisplayName?: string | null;
  readonly requesterIsAgent?: boolean;
};

/**
 * DF-017 default nickname (before the owner types):
 * requesterLabel (the name it registered with, when it is a valid nickname)
 * → suggestedProjectDisplayName → free preset from the server → "".
 * The server still owns uniqueness; a taken name comes back on Approve.
 */
export const pendingNicknameDefault = (
  req: NicknameSource,
  presetSuggestion: string,
): string => {
  const label = cleanLabel(req.requesterLabel);
  if (label !== null && validateProjectDisplayName(label).ok) return label;
  const suggested = cleanLabel(req.suggestedProjectDisplayName);
  if (suggested !== null) return suggested;
  return req.requesterIsAgent !== false ? presetSuggestion : "";
};

/** Client format check (same rule as the server); null when Approve is OK. */
export const pendingNicknameIssue = (value: string): string | null => {
  const result = validateProjectDisplayName(value);
  if (result.ok) return null;
  switch (result.code) {
    case "missing":
      return C.nicknameRequired;
    case "too_short":
    case "too_long":
      return C.nicknameLength;
    case "reserved":
      return C.nicknameReserved;
    default:
      return C.nicknameInvalid;
  }
};

/** Help line under the field when the name is valid. */
export const pendingNicknameHelp = (
  value: string,
  requesterLabel: string | null | undefined,
): string =>
  cleanLabel(requesterLabel) !== null &&
  value.trim() === cleanLabel(requesterLabel)
    ? C.nicknameAskedFor
    : C.nicknameRule;

export const formatPendingNicknameTaken = (name: string): string =>
  C.nicknameTaken.replace("{name}", name.trim());
