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

/** MCP tools/call result (`content` + optional `isError`). */
export interface McpToolResult {
  readonly content: readonly {
    readonly type: "text";
    readonly text: string;
  }[];
  readonly isError?: boolean;
}

export interface McpTool<TContext = undefined> {
  readonly definition: McpToolDefinition;
  /**
   * Receives raw `arguments` and the per-call `context`. May return a value or
   * a Promise; throw/reject maps to JSON-RPC -32603.
   */
  readonly call: (
    args: unknown,
    context: TContext,
  ) => McpToolResult | Promise<McpToolResult>;
}

/** Tool registry + identity; protocol version is `MCP_PROTOCOL_VERSION`. */
export interface McpServerDefinition<TContext = undefined> {
  readonly serverInfo: McpServerInfo;
  readonly tools: readonly McpTool<TContext>[];
}

export type McpJsonRpcResponse = Readonly<Record<string, unknown>>;
