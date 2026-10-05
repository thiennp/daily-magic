/** Single MCP protocol version answered by every Agent Witch MCP server. */
export const MCP_PROTOCOL_VERSION = "2024-11-05";

/** `serverInfo` reported on `initialize` by Agent Witch MCP servers. */
export const AGENT_WITCH_MCP_SERVER_INFO = {
  name: "agent-witch",
  version: "1.0.0",
} as const;
