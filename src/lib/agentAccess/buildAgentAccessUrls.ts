export interface AgentAccessUrls {
  readonly origin: string;
  readonly registerUrl: string;
  readonly mcpUrl: string;
  readonly invokeUrl: string;
  readonly discoveryUrl: string;
  readonly guidelineUrl: string;
}

export const buildAgentAccessUrls = (origin: string): AgentAccessUrls => {
  const trimmed = origin.replace(/\/$/, "");

  return {
    origin: trimmed,
    registerUrl: `${trimmed}/api/agent-access/register`,
    mcpUrl: `${trimmed}/api/agent-access/mcp`,
    invokeUrl: `${trimmed}/api/agent-access/invoke`,
    discoveryUrl: `${trimmed}/.well-known/webmcp.json`,
    guidelineUrl: `${trimmed}/for-agents`,
  };
};
