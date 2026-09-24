import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";
import { buildWebMcpDocument } from "@/lib/agentAccess/buildWebMcpDocument";
import { executeAgentAccessTool } from "@/lib/agentAccess/executeAgentAccessTool";
import { handleAgentAccessMcpRequest } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { readClientIp } from "@/lib/agentAccess/readClientIp";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  return Response.json(buildWebMcpDocument(resolveAppBaseUrl()));
}

export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);
  const result = await handleAgentAccessMcpRequest(
    body,
    request.headers.get("authorization"),
    {
      callTool: (name, args, authorization) =>
        executeAgentAccessTool({
          name,
          args,
          authorization,
          ip: readClientIp(request),
        }),
    },
  );

  return Response.json(result);
}
