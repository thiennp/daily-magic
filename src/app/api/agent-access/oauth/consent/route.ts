import { isAllowedAppHttpOrigin } from "@/lib/app/isAllowedAppHttpOrigin";
import { requireAuth } from "@/lib/auth/requireAuth";
import { completeOauthConsent } from "@/lib/agentAccess/oauth/completeOauthConsent";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  if (!isAllowedAppHttpOrigin(request)) {
    return Response.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error ?? Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  let pendingId = "";
  let decision: "approve" | "deny" = "deny";
  let acceptTerms: unknown;
  let termsVersion: unknown;

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const form = await request.formData();
    pendingId = String(form.get("pending") ?? "");
    decision = String(form.get("decision") ?? "") === "approve" ? "approve" : "deny";
    const at = form.get("acceptTerms");
    acceptTerms =
      at === "true" || at === "on" ? true : at === "false" ? false : undefined;
    const tv = form.get("termsVersion");
    termsVersion = typeof tv === "string" ? tv : undefined;
  } else {
    const json: unknown = await request.json().catch(() => null);
    const body =
      json !== null && typeof json === "object"
        ? (json as Record<string, unknown>)
        : {};
    pendingId = typeof body.pending === "string" ? body.pending : "";
    decision = body.decision === "approve" ? "approve" : "deny";
    acceptTerms = body.acceptTerms;
    termsVersion = body.termsVersion;
  }

  const outcome = await completeOauthConsent({
    pendingId,
    ownerUserId: actor.id,
    decision,
    acceptTerms,
    termsVersion,
  });

  const wantsHtml = (request.headers.get("accept") ?? "").includes("text/html");
  if (!outcome.ok) {
    if (wantsHtml) {
      return Response.redirect(
        new URL(
          `/oauth/consent?pending=${encodeURIComponent(pendingId)}&error=${encodeURIComponent(outcome.code)}`,
          request.url,
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
