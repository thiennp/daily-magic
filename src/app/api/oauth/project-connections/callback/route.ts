import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";
import { completeProjectConnectionOAuth } from "@/lib/projects/connections/completeProjectConnectionOAuth";

export const dynamic = "force-dynamic";

const settingsConnectionsPath = (projectId: string, query: string): string => {
  const base = resolveAppBaseUrl();
  const url = new URL(`/projects/${encodeURIComponent(projectId)}`, base);
  url.searchParams.set("tab", "settings");
  url.searchParams.set("section", "connections");
  if (query.length > 0) {
    url.searchParams.set("connections", query);
  }
  // Project page reads the tab from the hash.
  url.hash = "settings";
  return url.toString();
};

/**
 * GET /api/oauth/project-connections/callback
 * Provider redirect target. Completes OAuth and sends the human back to
 * project Settings → Connections.
 */
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  const oauthError = url.searchParams.get("error");

  const result = await completeProjectConnectionOAuth({
    state,
    code,
    oauthError,
  });

  if (result.ok) {
    return Response.redirect(
      settingsConnectionsPath(result.projectId, "connected"),
      302,
    );
  }

  if (result.projectId !== null) {
    const flag =
      result.code === "oauth_denied"
        ? "denied"
        : result.code === "forbidden"
          ? "forbidden"
          : "error";
    return Response.redirect(
      settingsConnectionsPath(result.projectId, flag),
      302,
    );
  }

  const home = new URL("/", resolveAppBaseUrl());
  home.searchParams.set("connections", result.code);
  return Response.redirect(home.toString(), 302);
}
