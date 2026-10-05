import type { AcceptHumanInviteNamingErrorCode } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";
import { validateProjectDisplayName } from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";
import {
  mapProjectAccessError,
  toPublicAccessErrorCode,
} from "@/lib/projects/acl/mapProjectAccessError";

const NAMING_CODES: ReadonlySet<string> = new Set<AcceptHumanInviteNamingErrorCode>([
  "DISPLAY_NAME_TAKEN",
  "INVALID_DISPLAY_NAME",
  "DISPLAY_NAME_RESERVED",
  "DISPLAY_NAME_REQUIRED",
]);

/** True when an accept failure is a nickname error (invite not consumed → retry). */
export const isHumanAcceptNamingError = (code: string | undefined): boolean =>
  typeof code === "string" && NAMING_CODES.has(toPublicAccessErrorCode(code));

/**
 * Client pre-check with the same validator as bot redeem / server accept.
 * Server stays authoritative (uniqueness, races).
 */
export const checkHumanAcceptNickname = (
  raw: string,
):
  | { readonly ok: true; readonly name: string }
  | { readonly ok: false; readonly errorMessage: string } => {
  const validated = validateProjectDisplayName(raw);
  if (validated.ok) {
    return { ok: true, name: validated.name };
  }
  return {
    ok: false,
    errorMessage: mapProjectAccessError(toPublicAccessErrorCode(validated.code)),
  };
};

/** Prefill from account name: trimmed, or empty when absent. */
export const initialHumanAcceptNickname = (
  accountName: string | null | undefined,
): string => (typeof accountName === "string" ? accountName.trim() : "");
