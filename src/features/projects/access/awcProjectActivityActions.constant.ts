/** Allowlisted G1 activity actions — membership/status only, never content. */
export const AWC_PROJECT_ACTIVITY_ACTIONS = [
  "request",
  "approve",
  "deny",
  "revoke",
  "add_folder_ref",
  "remove_folder_ref",
  "allow_claim_ok",
  "allow_claim_deny",
  "membership_check_ok",
  "membership_check_deny",
] as const;

export type AwcProjectActivityAction =
  (typeof AWC_PROJECT_ACTIVITY_ACTIONS)[number];

export const AWC_PROJECT_ACTIVITY_ACTION_LABELS: Record<
  AwcProjectActivityAction,
  string
> = {
  request: "Access requested",
  approve: "Approved",
  deny: "Denied",
  revoke: "Revoked",
  add_folder_ref: "Folder ref added",
  remove_folder_ref: "Folder ref removed",
  allow_claim_ok: "Allow-claim ok",
  allow_claim_deny: "Allow-claim denied",
  membership_check_ok: "Membership check ok",
  membership_check_deny: "Membership check denied",
};

export const isAwcProjectActivityAction = (
  value: string,
): value is AwcProjectActivityAction =>
  (AWC_PROJECT_ACTIVITY_ACTIONS as readonly string[]).includes(value);
