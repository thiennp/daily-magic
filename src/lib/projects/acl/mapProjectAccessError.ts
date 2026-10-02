/**
 * Map ACL / project-access machine codes to user-visible copy.
 * Never surface raw snake_case in rename, approve, invites, or activity UI.
 */

const PROJECT_ACCESS_ERROR_MESSAGES: Readonly<Record<string, string>> = {
  display_name_invalid:
    "Nickname must be 2–32 letters (single spaces OK). Avoid @ / and reserved words.",
  display_name_reserved: "That name is reserved.",
  display_name_taken: "That project nickname is already taken.",
  display_name_missing: "Enter a project nickname.",
  display_name_required: "Enter a project nickname.",
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
};

/** Stable public codes Product can switch on (HTTP status still authoritative). */
const PUBLIC_ERROR_CODES: Readonly<Record<string, string>> = {
  display_name_invalid: "INVALID_DISPLAY_NAME",
  display_name_reserved: "DISPLAY_NAME_RESERVED",
  display_name_taken: "DISPLAY_NAME_TAKEN",
  display_name_missing: "DISPLAY_NAME_REQUIRED",
  display_name_required: "DISPLAY_NAME_REQUIRED",
  missing: "DISPLAY_NAME_REQUIRED",
  invalid: "INVALID_DISPLAY_NAME",
  reserved: "DISPLAY_NAME_RESERVED",
  too_short: "INVALID_DISPLAY_NAME",
  too_long: "INVALID_DISPLAY_NAME",
};

const looksLikeSnakeCode = (value: string): boolean =>
  /^[a-z][a-z0-9]*(?:_[a-z0-9]+)+$/.test(value) ||
  /^[a-z]+(?:\.[a-z_]+)+$/.test(value);

const humanizeUnknownCode = (code: string): string => {
  const spaced = code.replace(/[._]/g, " ").trim();
  if (spaced.length === 0) {
    return "Something went wrong.";
  }
  return spaced.charAt(0).toUpperCase() + spaced.slice(1) + ".";
};

/** Prefer friendly copy; pass through already-human strings; never leave snake_case. */
export const mapProjectAccessError = (
  codeOrMessage: string | null | undefined,
  fallback = "Something went wrong.",
): string => {
  if (codeOrMessage === null || codeOrMessage === undefined) {
    return fallback;
  }
  const trimmed = codeOrMessage.trim();
  if (trimmed.length === 0) {
    return fallback;
  }
  const mapped = PROJECT_ACCESS_ERROR_MESSAGES[trimmed];
  if (mapped !== undefined) {
    return mapped;
  }
  if (looksLikeSnakeCode(trimmed) || /^[a-z][a-z0-9_]*$/.test(trimmed)) {
    return humanizeUnknownCode(trimmed);
  }
  return trimmed;
};

/** Alias kept for call sites / tests that extract a display-name-only helper. */
export const mapDisplayNameApiError = mapProjectAccessError;

export const toPublicAccessErrorCode = (code: string): string =>
  PUBLIC_ERROR_CODES[code] ?? code;

export const displayNameErrorHttpStatus = (code: string): number => {
  if (code === "display_name_taken" || code === "DISPLAY_NAME_TAKEN") {
    return 409;
  }
  if (code === "display_name_reserved" || code === "DISPLAY_NAME_RESERVED") {
    return 422;
  }
  if (
    code === "display_name_required" ||
    code === "display_name_missing" ||
    code === "DISPLAY_NAME_REQUIRED" ||
    code === "display_name_invalid" ||
    code === "INVALID_DISPLAY_NAME" ||
    code === "missing" ||
    code === "invalid" ||
    code === "too_short" ||
    code === "too_long"
  ) {
    return 400;
  }
  return 400;
};

export const projectAccessErrorJson = (
  code: string,
  status: number,
): Response =>
  Response.json(
    {
      ok: false,
      code: toPublicAccessErrorCode(code),
      errorMessage: mapProjectAccessError(code),
    },
    { status },
  );
