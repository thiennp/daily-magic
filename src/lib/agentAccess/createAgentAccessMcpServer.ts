import {
  AGENT_WITCH_MCP_SERVER_INFO,
  toMcpTextResult,
  type McpServerDefinition,
  type McpTool,
} from "@agent-witch/shared/mcp";

import type { AgentAccessToolCallResult } from "@/lib/agentAccess/agentAccessToolCallResult.type";
import { AGENT_ACCESS_TOOLS } from "@/lib/agentAccess/agentAccessTools.constant";
import { coerceAgentAccessArguments } from "@/lib/agentAccess/coerceAgentAccessArguments";

/** Per-call context: authorization header threaded by the MCP route. */
export type AgentAccessMcpContext = {
  readonly authorization: string | null;
};

export type AgentAccessMcpCallTool = (
  name: string,
  args: unknown,
  authorization: string | null,
) => Promise<AgentAccessToolCallResult>;

/**
 * Cloud agent-access MCP server: shared JSON-RPC core + catalog tools that
 * keep existing async callTool + authorization behaviour.
 */
export const createAgentAccessMcpServer = (input: {
  readonly callTool: AgentAccessMcpCallTool;
}): McpServerDefinition<AgentAccessMcpContext> => ({
  serverInfo: AGENT_WITCH_MCP_SERVER_INFO,
  tools: AGENT_ACCESS_TOOLS.map(
    (definition): McpTool<AgentAccessMcpContext> => ({
      definition,
      call: async (args, context) => {
        const result = await input.callTool(
          definition.name,
          coerceAgentAccessArguments(args),
          context.authorization,
        );
        return toMcpTextResult(result.text, result.isError);
      },
    }),
  ),
});
