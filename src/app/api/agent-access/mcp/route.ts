import { executeProjectSkillShareTool } from "@/features/project-skill-share/public-api/infrastructure";
import {
  handleAgentAccessMcpGet,
  handleAgentAccessMcpPost,
} from "@/lib/agentAccess/handleAgentAccessMcpHttp";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  return handleAgentAccessMcpGet(request);
}

export async function POST(request: Request): Promise<Response> {
  return handleAgentAccessMcpPost(request, {
    featureToolExecutors: [executeProjectSkillShareTool],
  });
}
