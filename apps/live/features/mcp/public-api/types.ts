/**
 * AWL slice `mcp` — local MCP server shapes shared by stdio and HTTP transports.
 */
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

export interface McpServerDefinition {
  readonly serverInfo: { readonly name: string; readonly version: string };
  readonly protocolVersion: string;
  readonly tools: readonly McpTool[];
}

export type McpJsonRpcResponse = Readonly<Record<string, unknown>>;
