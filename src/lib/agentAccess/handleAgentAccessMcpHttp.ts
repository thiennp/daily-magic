import { handleMcpJsonRpcRequest } from "@agent-witch/shared/mcp";

import { executeProjectSkillShareTool } from "@/features/project-skill-share/public-api/infrastructure";
import { buildWebMcpDocument } from "@/lib/agentAccess/buildWebMcpDocument";
import { createAgentAccessMcpServer } from "@/lib/agentAccess/createAgentAccessMcpServer";
import { executeAgentAccessTool } from "@/lib/agentAccess/executeAgentAccessTool";
import { guardAgentAccessPost } from "@/lib/agentAccess/guardAgentAccessPost";
import { readBoundedAgentAccessBody } from "@/lib/agentAccess/readBoundedAgentAccessBody";
import { readClientIp } from "@/lib/agentAccess/readClientIp";

/** GET: public WebMCP document (same as main). */
export const handleAgentAccessMcpGet = async (
  request: Request,
): Promise<Response> => {
  const limited = await guardAgentAccessPost(request);
  if (limited !== null) {
    return limited;
  }
  return Response.json(buildWebMcpDocument());
};

/**
 * POST JSON-RPC MCP (same as main): no HTTP 401 gate.
 * Anonymous initialize / tools/list / register_account work; other tools
 * return unauthorized inside the JSON-RPC result when Bearer is missing.
 */
export const handleAgentAccessMcpPost = async (
  request: Request,
): Promise<Response> => {
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

  const authorization = request.headers.get("authorization");
  const ip = readClientIp(request);
  const server = createAgentAccessMcpServer({
    callTool: (name, args, authHeader) =>
      executeAgentAccessTool({
        name,
        args,
        authorization: authHeader,
        ip,
        featureToolExecutors: [executeProjectSkillShareTool],
      }),
  });
  const result = await handleMcpJsonRpcRequest(payload, server, {
    authorization,
  });

  return Response.json(result);
};
