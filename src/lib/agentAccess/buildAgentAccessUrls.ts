export interface AgentAccessUrls {
  readonly origin: string;
  readonly registerUrl: string;
  readonly mcpUrl: string;
  /** OAuth-protected MCP (401 + sign-in). Legacy mcpUrl stays anonymous, so sign-in connectors must use this. */
  readonly mcpConnectUrl: string;
  readonly invokeUrl: string;
  readonly discoveryUrl: string;
  readonly guidelineUrl: string;
}

export const buildAgentAccessUrls = (): AgentAccessUrls => ({
  origin: "https://www.agentwitch.com",
  registerUrl: "https://www.agentwitch.com/api/agent-access/register",
  mcpUrl: "https://www.agentwitch.com/api/agent-access/mcp",
  mcpConnectUrl: "https://www.agentwitch.com/api/agent-access/mcp/connect",
  invokeUrl: "https://www.agentwitch.com/api/agent-access/invoke",
  discoveryUrl: "https://www.agentwitch.com/.well-known/webmcp.json",
  guidelineUrl: "https://www.agentwitch.com/for-agents",
});
