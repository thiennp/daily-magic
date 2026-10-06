import { buildOauthProtectedResourceMetadata } from "@/lib/agentAccess/oauth/buildOauthDiscoveryDocuments";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  return Response.json(buildOauthProtectedResourceMetadata(), {
    headers: { "Cache-Control": "public, max-age=300" },
  });
}
