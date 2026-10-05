/** Machine codes → user-visible Project Access copy (no snake_case in UI). */
export const PROJECT_ACCESS_ERROR_MESSAGES: Readonly<Record<string, string>> = {
  display_name_invalid:
    "Nickname must be 2–32 letters (single spaces OK). Avoid @ / and reserved words.",
  display_name_reserved: "That name is reserved.",
  display_name_taken: "That project nickname is already taken.",
  display_name_missing: "Enter a project nickname.",
  display_name_required: "Enter a project nickname.",
  invite_email_mismatch:
    "This invite is locked to a different email address.",
  invite_email_unverified:
    "Verify your email before accepting this invite.",
  email_required_for_lock:
    "Enter an email to lock this invite to one account.",
  INVALID_DISPLAY_NAME:
    "Nickname must be 2–32 letters (single spaces OK). Avoid @ / and reserved words.",
  DISPLAY_NAME_RESERVED: "That name is reserved.",
  DISPLAY_NAME_TAKEN: "That project nickname is already taken.",
  DISPLAY_NAME_REQUIRED: "Enter a project nickname.",
  missing: "Enter a project nickname.",
  invalid:
    "Nickname must be 2–32 letters (single spaces OK). Avoid @ / and reserved words.",
  reserved: "That name is reserved.",
  too_short: "Nickname must be at least 2 characters.",
  too_long: "Nickname must be at most 32 characters.",
  forbidden: "Only the project owner can manage Project Access.",
  not_found: "Project or membership not found.",
  not_pending: "That request is no longer pending.",
  not_active: "That membership is not active.",
  already_member: "Already a member of this project.",
  already_pending: "A request is already pending.",
  invalid_token: "Invite link is invalid or expired.",
  owner: "Project owners do not need an access request.",
  already_left: "You already left this project.",
  confirm_required: "Pass confirm:true to leave this project.",
  owner_cannot_leave: "Project owners cannot leave via leave_project.",
  misconfigured: "Project Access is misconfigured. Try again later.",
  invalid_url: "Enter the POST URL from the bot's webhook routine.",
  https_only: "The POST URL must start with https.",
  blocked_host: "That POST URL host is not allowed.",
  invalid_bearer: "Enter the key from the bot's webhook routine (up to 2000 characters).",
  naming_required: "Give this bot a project nickname first.",
};

/** Stable public codes Product can switch on (HTTP status still authoritative). */
export const PUBLIC_ACCESS_ERROR_CODES: Readonly<Record<string, string>> = {
  display_name_invalid: "INVALID_DISPLAY_NAME",
  display_name_reserved: "DISPLAY_NAME_RESERVED",
  display_name_taken: "DISPLAY_NAME_TAKEN",
  display_name_missing: "DISPLAY_NAME_REQUIRED",
  display_name_required: "DISPLAY_NAME_REQUIRED",
  invite_email_mismatch: "INVITE_EMAIL_MISMATCH",
  invite_email_unverified: "INVITE_EMAIL_UNVERIFIED",
  email_required_for_lock: "EMAIL_REQUIRED_FOR_LOCK",
  missing: "DISPLAY_NAME_REQUIRED",
  invalid: "INVALID_DISPLAY_NAME",
  reserved: "DISPLAY_NAME_RESERVED",
  too_short: "INVALID_DISPLAY_NAME",
  too_long: "INVALID_DISPLAY_NAME",
};
