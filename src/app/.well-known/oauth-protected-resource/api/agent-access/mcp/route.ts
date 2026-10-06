import { buildOauthProtectedResourceMetadata } from "@/lib/agentAccess/oauth/buildOauthDiscoveryDocuments";

export const dynamic = "force-dynamic";

/** RFC 9728 path-scoped discovery: same metadata as the root document. */
export async function GET(): Promise<Response> {
  return Response.json(buildOauthProtectedResourceMetadata(), {
    headers: { "Cache-Control": "public, max-age=300" },
  });
}
