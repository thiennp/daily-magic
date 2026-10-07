import {
  displayNameErrorHttpStatus,
  mapProjectAccessError,
  toPublicAccessErrorCode,
} from "@/lib/projects/acl/mapProjectAccessError";

export const humanInviteAcceptStatusFor = (code: string): number => {
  if (
    code.startsWith("display_name_") ||
    code === "DISPLAY_NAME_TAKEN" ||
    code === "INVALID_DISPLAY_NAME" ||
    code === "DISPLAY_NAME_REQUIRED" ||
    code === "NAMING_REQUIRED"
  ) {
    return displayNameErrorHttpStatus(code);
  }
  if (
    code === "already_owner" ||
    code === "already_member" ||
    code === "already_requested"
  ) {
    return 409;
  }
  if (code === "expired" || code === "revoked" || code === "already_redeemed") {
    return 410;
  }
  if (code === "invalid_token" || code === "invalid_transition") return 404;
  if (
    code === "invite_email_mismatch" ||
    code === "INVITE_EMAIL_MISMATCH" ||
    code === "invite_email_unverified" ||
    code === "INVITE_EMAIL_UNVERIFIED"
  ) {
    return 403;
  }
  return 400;
};

export const humanInviteNamingErrorJson = (
  code: string,
  suggestedProjectDisplayName: string | null | undefined,
): Response =>
  Response.json(
    {
      ok: false,
      code: toPublicAccessErrorCode(code),
      errorMessage: mapProjectAccessError(code),
      suggestedProjectDisplayName: suggestedProjectDisplayName ?? null,
    },
    { status: humanInviteAcceptStatusFor(code) },
  );

export const humanInviteEmailLockErrorJson = (
  code: string,
  invitedEmailMasked: string | undefined,
): Response =>
  Response.json(
    {
      ok: false,
      code: toPublicAccessErrorCode(code),
      errorMessage: mapProjectAccessError(code),
      invitedEmailMasked: invitedEmailMasked ?? null,
    },
    { status: 403 },
  );
