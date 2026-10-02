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
