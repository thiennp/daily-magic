import { redeemHumanProjectInvite } from "@/lib/projects/acl/humanInvites/redeemHumanProjectInvite";
import {
  displayNameErrorHttpStatus,
  mapProjectAccessError,
  projectAccessErrorJson,
  toPublicAccessErrorCode,
} from "@/lib/projects/acl/mapProjectAccessError";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

const statusFor = (code: string): number => {
  if (
    code.startsWith("display_name_") ||
    code === "DISPLAY_NAME_TAKEN" ||
    code === "INVALID_DISPLAY_NAME" ||
    code === "DISPLAY_NAME_REQUIRED" ||
    code === "NAMING_REQUIRED"
  ) {
    return displayNameErrorHttpStatus(code);
  }
  if (code === "already_owner" || code === "already_member") return 409;
  if (code === "expired" || code === "revoked" || code === "already_redeemed") {
    return 410;
  }
  if (code === "invalid_token" || code === "invalid_transition") return 404;
  return 400;
};

const namingErrorJson = (
  code: string,
  suggestedProjectDisplayName: string | null | undefined,
): Response => {
  const publicCode = toPublicAccessErrorCode(code);
  return Response.json(
    {
      ok: false,
      code: publicCode,
      errorMessage: mapProjectAccessError(code),
      suggestedProjectDisplayName: suggestedProjectDisplayName ?? null,
    },
    { status: statusFor(code) },
  );
};

export async function POST(
  request: Request,
  context: { params: Promise<{ readonly token: string }> },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }
  const { token } = await context.params;
  const body: unknown = await request.json().catch(() => ({}));
  const payload =
    body !== null && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {};
  const suggested =
    typeof payload.suggestedProjectDisplayName === "string"
      ? payload.suggestedProjectDisplayName
      : payload.suggestedProjectDisplayName === null
        ? null
        : undefined;

  const result = await redeemHumanProjectInvite({
    token,
    claimantUserId: actor.id,
    suggestedProjectDisplayName: suggested,
  });
  if (!result.ok) {
    if (
      result.code === "display_name_taken" ||
      result.code === "display_name_invalid" ||
      result.code === "display_name_reserved" ||
      result.code === "display_name_required"
    ) {
      return namingErrorJson(result.code, result.suggestedProjectDisplayName);
    }
    return projectAccessErrorJson(result.code, statusFor(result.code));
  }
  return Response.json({
    ok: true,
    projectId: result.projectId,
    membershipId: result.membership.id,
    role: result.role,
    status: result.membership.status,
    projectDisplayName: result.projectDisplayName,
  });
}
