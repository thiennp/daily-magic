import {
  executeProjectSkillShareToolThenUnblock,
  executeTaskRefinementTool,
} from "@/features/task-refinement/public-api/infrastructure";
import {
  handleAgentAccessMcpGet,
  handleAgentAccessMcpPost,
} from "@/lib/agentAccess/handleAgentAccessMcpHttp";
import { buildMcpWwwAuthenticateHeader } from "@/lib/agentAccess/oauth/buildOauthDiscoveryDocuments";
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

/** OAuth-protected MCP resource. Any request without a valid Bearer → 401. */
export async function GET(request: Request): Promise<Response> {
  if (!hasMcpBearer(request.headers.get("authorization"))) {
    return unauthorizedMcpChallenge();
  }
  return handleAgentAccessMcpGet(request);
}

export async function POST(request: Request): Promise<Response> {
  if (!hasMcpBearer(request.headers.get("authorization"))) {
    return unauthorizedMcpChallenge();
  }
  return handleAgentAccessMcpPost(request, {
    featureToolExecutors: [
      executeProjectSkillShareToolThenUnblock,
      executeTaskRefinementTool,
    ],
  });
}
