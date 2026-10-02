import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";
import { isProjectApiKeyMcpTool } from "@/lib/projects/acl/projectApiKeys/projectApiKeyMcpAllowlist.constant";
import type { ProjectApiKeyAuth } from "@/lib/projects/acl/projectApiKeys/resolveProjectApiKeyActor";

const readArgProjectId = (args: unknown): string | null => {
  if (
    args !== null &&
    typeof args === "object" &&
    "projectId" in args &&
    typeof (args as { projectId: unknown }).projectId === "string"
  ) {
    return (args as { projectId: string }).projectId;
  }
  return null;
};

/** Project keys may only call allowlisted project tools for their projectId. */
export const guardProjectApiKeyToolUse = (input: {
  readonly name: string;
  readonly args: unknown;
  readonly projectAuth: ProjectApiKeyAuth;
}): AgentAccessToolCallResult | null => {
  if (!isProjectApiKeyMcpTool(input.name)) {
    return agentAccessTextResult(
      {
        ok: false,
        error:
          "Project API key cannot call this tool. Use agent-access Bearer for full MCP, or a project-scoped tool.",
        code: "forbidden",
      },
      true,
    );
  }
  const projectId = readArgProjectId(input.args);
  if (projectId !== null && projectId !== input.projectAuth.projectId) {
    return agentAccessTextResult(
      {
        ok: false,
        error: "Project API key is not valid for this projectId.",
        code: "forbidden",
      },
      true,
    );
  }
  return null;
};
