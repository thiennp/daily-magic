import { createOauthAuthorizationPending } from "@/lib/agentAccess/oauth/createOauthAuthorizationPending";
import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";
import { auth } from "@/lib/auth/auth";

export const dynamic = "force-dynamic";

const readParam = (url: URL, key: string): string =>
  url.searchParams.get(key)?.trim() ?? "";

/**
 * OAuth authorize: validates client/PKCE/redirect, stores pending, sends human
 * to consent (or login first).
 */
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const clientId = readParam(url, "client_id");
  const redirectUri = readParam(url, "redirect_uri");
  const responseType = readParam(url, "response_type");
  const codeChallenge = readParam(url, "code_challenge");
  const codeChallengeMethod =
    readParam(url, "code_challenge_method") || "plain";
  const stateRaw = url.searchParams.get("state");
  const state = stateRaw !== null && stateRaw.length > 0 ? stateRaw : null;

  if (responseType !== "code") {
    return Response.json(
      {
        error: "unsupported_response_type",
        error_description: 'response_type must be "code".',
      },
      { status: 400 },
    );
  }

  const pending = await createOauthAuthorizationPending({
    clientId,
    redirectUri,
    codeChallenge,
    codeChallengeMethod,
    state,
  });

  if (!pending.ok) {
    // If redirect_uri is trustworthy enough, bounce error there; else JSON.
    if (
      pending.error === "invalid_request" &&
      redirectUri.startsWith("https://")
    ) {
      try {
        const target = new URL(redirectUri);
        target.searchParams.set("error", pending.error);
        target.searchParams.set("error_description", pending.error_description);
        if (state !== null) target.searchParams.set("state", state);
        return Response.redirect(target.toString(), 302);
      } catch {
        /* fall through */
      }
    }
    return Response.json(
      { error: pending.error, error_description: pending.error_description },
      { status: pending.status },
    );
  }

  const session = await auth();
  // Public origin, never url.origin: behind Railway's proxy that is the
  // internal host (e.g. https://<container>:8080).
  const publicOrigin = resolveAppBaseUrl();
  const consentUrl = new URL(pending.consentPath, publicOrigin);
  if (!session?.user?.id) {
    const login = new URL("/login", publicOrigin);
    login.searchParams.set(
      "callbackUrl",
      consentUrl.pathname + consentUrl.search,
    );
    return Response.redirect(login.toString(), 302);
  }

  return Response.redirect(consentUrl.toString(), 302);
}
