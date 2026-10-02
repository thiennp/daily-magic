/** Client helpers for §11 / A10 project display names (agents only). */

export const PROJECT_DISPLAY_NAME_RESERVED = [
  "owner",
  "broadcast",
  "system",
  "all",
] as const;

export const PROJECT_DISPLAY_NAME_MIN_LEN = 2;
export const PROJECT_DISPLAY_NAME_MAX_LEN = 32;

export const normalizeProjectDisplayName = (raw: string): string =>
  raw.trim().toLocaleLowerCase("en-US");

export const isReservedProjectDisplayName = (raw: string): boolean => {
  const normalized = normalizeProjectDisplayName(raw);
  return (PROJECT_DISPLAY_NAME_RESERVED as readonly string[]).includes(
    normalized,
  );
};

const hasDisallowedChars = (raw: string): boolean =>
  /[\u0000-\u001f\u007f/@]/.test(raw) || /\s{2,}/.test(raw.trim());

export const isValidProjectDisplayName = (raw: string): boolean => {
  const trimmed = raw.trim();
  if (
    trimmed.length < PROJECT_DISPLAY_NAME_MIN_LEN ||
    trimmed.length > PROJECT_DISPLAY_NAME_MAX_LEN
  ) {
    return false;
  }
  if (hasDisallowedChars(trimmed) || isReservedProjectDisplayName(trimmed)) {
    return false;
  }
  return /^[\p{L}][\p{L}\p{M}'-]{0,31}$/u.test(trimmed);
};

export const pickRandomAvailableDisplayName = (
  available: readonly string[],
): string | null => {
  if (available.length === 0) {
    return null;
  }
  const index = Math.floor(Math.random() * available.length);
  return available[index] ?? null;
};

export type BuildApproveAccessPayloadInput = {
  readonly requestId: string;
  readonly requesterIsAgent: boolean;
  readonly projectDisplayName?: string;
  readonly teamLabel?: string | null;
  readonly scopes?: readonly string[];
};

export type BuildApproveAccessPayloadResult =
  | {
      readonly ok: true;
      readonly body: {
        readonly requestId: string;
        readonly action: "approve";
        readonly projectDisplayName?: string;
        readonly teamLabel?: string | null;
        readonly scopes?: readonly string[];
      };
    }
  | { readonly ok: false; readonly errorMessage: string };

export const buildApproveAccessPayload = (
  input: BuildApproveAccessPayloadInput,
): BuildApproveAccessPayloadResult => {
  const body: {
    requestId: string;
    action: "approve";
    projectDisplayName?: string;
    teamLabel?: string | null;
    scopes?: readonly string[];
  } = {
    requestId: input.requestId,
    action: "approve",
  };

  if (input.teamLabel !== undefined) {
    body.teamLabel = input.teamLabel;
  }
  if (input.scopes !== undefined) {
    body.scopes = input.scopes;
  }

  if (!input.requesterIsAgent) {
    return { ok: true, body };
  }

  const name = input.projectDisplayName?.trim() ?? "";
  if (!name) {
    return {
      ok: false,
      errorMessage: "Project nickname is required for agent Approve.",
    };
  }
  if (!isValidProjectDisplayName(name)) {
    return {
      ok: false,
      errorMessage:
        "Invalid project nickname (2–32 letters; reserved names blocked).",
    };
  }

  body.projectDisplayName = name;
  return { ok: true, body };
};

export const mapAccessActionHttpError = (
  status: number,
  errorMessage: string,
): {
  readonly code: "name_taken" | "name_invalid" | "name_reserved" | "other";
  readonly errorMessage: string;
} => {
  if (status === 409) {
    return {
      code: "name_taken",
      errorMessage: errorMessage || "That project nickname is already taken.",
    };
  }
  if (status === 422) {
    return {
      code: "name_reserved",
      errorMessage: errorMessage || "That name is reserved.",
    };
  }
  if (status === 400) {
    return {
      code: "name_invalid",
      errorMessage: errorMessage || "Invalid project nickname.",
    };
  }
  return { code: "other", errorMessage: errorMessage || "Request failed." };
};
