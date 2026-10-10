import { handleProjectInviteJoinGet } from "@/features/projects/access/invites/joinPage/public-api/infrastructure";

export const dynamic = "force-dynamic";

type RouteContext = {
  readonly params: Promise<{ readonly token: string }>;
};

/**
 * Public per-invite instructions for assistants (no session). Markdown by
 * default; `/join/<token>.json` or Accept: application/json for JSON.
 * GET only — never redeems or mutates the invite.
 */
export async function GET(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { token } = await context.params;
  return handleProjectInviteJoinGet(request, token);
}
