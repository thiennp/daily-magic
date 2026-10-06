import { handleMcpJsonRpcRequest } from "@agent-witch/shared/mcp";

import { executeProjectSkillShareTool } from "@/features/project-skill-share/public-api/infrastructure";
import { buildWebMcpDocument } from "@/lib/agentAccess/buildWebMcpDocument";
import { createAgentAccessMcpServer } from "@/lib/agentAccess/createAgentAccessMcpServer";
import { executeAgentAccessTool } from "@/lib/agentAccess/executeAgentAccessTool";
import { guardAgentAccessPost } from "@/lib/agentAccess/guardAgentAccessPost";
import { buildMcpWwwAuthenticateHeader } from "@/lib/agentAccess/oauth/buildOauthDiscoveryDocuments";
import { readBoundedAgentAccessBody } from "@/lib/agentAccess/readBoundedAgentAccessBody";
import { readClientIp } from "@/lib/agentAccess/readClientIp";
import { readBearerAgentAccessToken } from "@/lib/agentAccess/hashAgentAccessToken";
import { readBearerProjectApiKey } from "@/lib/projects/acl/projectApiKeys/hashProjectApiKey";

export const dynamic = "force-dynamic";

const hasMcpBearer = (authorization: string | null): boolean =>
  readBearerAgentAccessToken(authorization) !== null ||
  readBearerProjectApiKey(authorization) !== null;

const unauthorizedMcpChallenge = (): Response =>
  new Response(
    JSON.stringify({
      jsonrpc: "2.0",
      id: null,
      error: { code: -32001, message: "Unauthorized" },
    }),
    {
      status: 401,
      headers: {
        "Content-Type": "application/json",
        "WWW-Authenticate": buildMcpWwwAuthenticateHeader(),
      },
    },
  );

export async function GET(request: Request): Promise<Response> {
  const limited = await guardAgentAccessPost(request);

  if (limited !== null) {
    return limited;
  }

  // Public discovery document stays available (Bearer clients unchanged on POST).
  return Response.json(buildWebMcpDocument());
}

export async function POST(request: Request): Promise<Response> {
  const limited = await guardAgentAccessPost(request);

  if (limited !== null) {
    return limited;
  }

  const authorization = request.headers.get("authorization");
  if (!hasMcpBearer(authorization)) {
    return unauthorizedMcpChallenge();
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
  const result = await handleMcpJsonRpcRequest(body, server, {
    authorization,
  });

  return Response.json(result);
}
