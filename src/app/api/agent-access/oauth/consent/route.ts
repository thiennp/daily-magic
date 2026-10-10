import { parseOauthConsentBody } from "@/app/api/agent-access/oauth/consent/parseOauthConsentBody";
import { completeOauthConsent } from "@/lib/agentAccess/oauth/completeOauthConsent";
import { isAllowedAppHttpOrigin } from "@/lib/app/isAllowedAppHttpOrigin";
import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  if (!isAllowedAppHttpOrigin(request)) {
    return Response.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const wantsHtml = (request.headers.get("accept") ?? "").includes("text/html");
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    if (wantsHtml) {
      // Session expired: the consent page sends the browser to /login and back.
      const { pendingId } = await parseOauthConsentBody(request);
      return Response.redirect(
        new URL(
          `/oauth/consent?pending=${encodeURIComponent(pendingId)}`,
          resolveAppBaseUrl(),
        ),
        303,
      );
    }
    return error ?? Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await parseOauthConsentBody(request);
  const outcome = await completeOauthConsent({
    pendingId: body.pendingId,
    ownerUserId: actor.id,
    decision: body.decision,
    acceptTerms: body.acceptTerms,
    termsVersion: body.termsVersion,
  });

  if (!outcome.ok) {
    if (wantsHtml) {
      return Response.redirect(
        new URL(
          `/oauth/consent?pending=${encodeURIComponent(body.pendingId)}&error=${encodeURIComponent(outcome.code)}`,
          resolveAppBaseUrl(),
        ),
        303,
      );
    }
    return Response.json(
      { ok: false, error: outcome.error, code: outcome.code },
      { status: outcome.status },
    );
  }

  return Response.redirect(outcome.redirectUrl, 303);
}
