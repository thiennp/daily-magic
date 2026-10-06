/**
 * Detail keys the Access log may store and return. Never tokens, emails,
 * reasons, URLs, paths or rendered English (S5's detail.activity is dropped).
 */
export const PROJECT_ACTIVITY_DETAIL_STRING_KEYS = [
  "inviteId",
  "label",
  "expiresAt",
  "teamLabel",
  "requestId",
  "membershipId",
  "memberKind",
  "role",
  "deliveryMode",
  "previousDeliveryMode",
  "trigger",
  "approvalSource",
  "ruleId",
] as const;

export const PROJECT_ACTIVITY_DETAIL_BOOLEAN_KEYS = ["autoApprove"] as const;

export const PROJECT_ACTIVITY_DETAIL_NUMBER_KEYS = ["maxUses"] as const;

export const PROJECT_ACTIVITY_DETAIL_MAX_STRING_CHARS = 120;

export const PROJECT_ACTIVITY_TEAM_LABEL_MAX_CHARS = 60;
