import { buildWebMcpDocument } from "@/lib/agentAccess/buildWebMcpDocument";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  return Response.json(buildWebMcpDocument(), {
    headers: {
      "Cache-Control": "public, max-age=300",
    },
  });
}
