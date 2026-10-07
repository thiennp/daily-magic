import { revealProjectInvitePrompt } from "@/lib/projects/acl/invites/revealProjectInvitePrompt";
import { projectAccessErrorJson } from "@/lib/projects/acl/mapProjectAccessError";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" } as const;

const STATUS_BY_CODE: Readonly<Record<string, number>> = {
  forbidden: 403,
  not_found: 404,
  invite_not_usable: 410,
  invite_prompt_unavailable: 409,
};

const withNoStore = (response: Response): Response => {
  response.headers.set("Cache-Control", "no-store");
  return response;
};

/**
 * Owner-only Copy source for a pending assistant invite (any device / tab).
 * 200 { url } for a usable invite; 410 used/revoked/expired; 409 no stored
 * copy (make a new invite); 403 non-owner. Body carries a secret: no-store,
 * never logged.
 */
export async function GET(
  _request: Request,
  context: {
    params: Promise<{ readonly projectId: string; readonly inviteId: string }>;
  },
): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }
  const { projectId, inviteId } = await context.params;
  const result = await revealProjectInvitePrompt({
    projectId,
    inviteId,
    ownerUserId: actor.id,
  });
  if (!result.ok) {
    return withNoStore(
      projectAccessErrorJson(result.code, STATUS_BY_CODE[result.code] ?? 404),
    );
  }
  return Response.json({ url: result.url }, { headers: NO_STORE });
}
