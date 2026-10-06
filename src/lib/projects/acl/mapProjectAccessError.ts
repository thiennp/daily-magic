/**
 * Map ACL / project-access machine codes to user-visible copy.
 * Never surface raw snake_case in rename, approve, invites, or activity UI.
 */

import {
  PROJECT_ACCESS_ERROR_MESSAGES,
  PUBLIC_ACCESS_ERROR_CODES,
} from "@/lib/projects/acl/projectAccessErrorMessages.constant";

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

/** True when ACL load failed because the viewer is not the project owner. */
export const isProjectAccessForbiddenError = (message: string): boolean =>
  /owner|forbidden/i.test(message);

/** Map load errors to forbidden copy when the ACL rejects non-owners. */
export const resolveProjectAccessLoadError = (
  loadError: string,
  forbiddenCopy: string,
): string =>
  isProjectAccessForbiddenError(loadError) ? forbiddenCopy : loadError;

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
  PUBLIC_ACCESS_ERROR_CODES[code] ?? code;

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
