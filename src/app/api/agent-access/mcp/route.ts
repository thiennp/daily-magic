import { buildWebMcpDocument } from "@/lib/agentAccess/buildWebMcpDocument";
import { executeAgentAccessTool } from "@/lib/agentAccess/executeAgentAccessTool";
import { guardAgentAccessPost } from "@/lib/agentAccess/guardAgentAccessPost";
import { handleAgentAccessMcpRequest } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { readBoundedAgentAccessBody } from "@/lib/agentAccess/readBoundedAgentAccessBody";
import { readClientIp } from "@/lib/agentAccess/readClientIp";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const limited = await guardAgentAccessPost(request);

  if (limited !== null) {
    return limited;
  }

  return Response.json(buildWebMcpDocument());
}

export async function POST(request: Request): Promise<Response> {
  const limited = await guardAgentAccessPost(request);

  if (limited !== null) {
    return limited;
  }

  const payload = await readBoundedAgentAccessBody(request);

  if (payload === "too_large") {
    return Response.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: { code: -32600, message: "Payload too large" },
      },
      { status: 413 },
    );
  }

  const body: unknown = payload;
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
