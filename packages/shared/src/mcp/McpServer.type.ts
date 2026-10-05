/** MCP JSON-RPC shapes shared by AWL (stdio + HTTP) and AWC MCP servers. */
export interface McpServerInfo {
  readonly name: string;
  readonly version: string;
}

export interface McpToolDefinition {
  readonly name: string;
  readonly description: string;
  readonly inputSchema: Readonly<Record<string, unknown>>;
}

export interface McpTool {
  readonly definition: McpToolDefinition;
  /** Receives raw `arguments`; result is JSON-serialized into a text content block. */
  readonly call: (args: unknown) => unknown;
}

/** Tool registry + identity; protocol version is `MCP_PROTOCOL_VERSION`. */
export interface McpServerDefinition {
  readonly serverInfo: McpServerInfo;
  readonly tools: readonly McpTool[];
}

export type McpJsonRpcResponse = Readonly<Record<string, unknown>>;
