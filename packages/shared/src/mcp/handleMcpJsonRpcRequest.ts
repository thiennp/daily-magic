import { MCP_PROTOCOL_VERSION } from "./mcpProtocol.constant";
import type {
  McpJsonRpcResponse,
  McpServerDefinition,
} from "./McpServer.type";

const jsonRpcError = (
  id: unknown,
  code: number,
  message: string,
): McpJsonRpcResponse => ({
  jsonrpc: "2.0",
  id: id ?? null,
  error: { code, message },
});

const jsonRpcResult = (id: unknown, result: unknown): McpJsonRpcResponse => ({
  jsonrpc: "2.0",
  id: id ?? null,
  result,
});

const asRecord = (value: unknown): Readonly<Record<string, unknown>> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Readonly<Record<string, unknown>>)
    : null;

const callTool = async <TContext>(
  id: unknown,
  params: Readonly<Record<string, unknown>> | null,
  server: McpServerDefinition<TContext>,
  context: TContext,
): Promise<McpJsonRpcResponse> => {
  const name = params?.name;
  if (typeof name !== "string") {
    return jsonRpcError(id, -32602, "tool name is required");
  }
  const tool = server.tools.find((entry) => entry.definition.name === name);
  if (tool === undefined) {
    return jsonRpcError(id, -32602, `Unknown tool: ${name}`);
  }
  try {
    const result = await tool.call(params?.arguments ?? {}, context);
    return jsonRpcResult(id, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return jsonRpcError(id, -32603, `Tool ${name} failed: ${message}`);
  }
};

/**
 * Shared MCP JSON-RPC core (initialize, ping, notifications, tools/list,
 * tools/call, errors). Environment-neutral: pure async request -> response for
 * a tool registry with a per-call `context`. Transports (AWL stdio, HTTP
 * `/mcp`, AWC) only frame bytes / auth around it.
 */
export const handleMcpJsonRpcRequest = async <TContext = undefined>(
  body: unknown,
  server: McpServerDefinition<TContext>,
  context: TContext,
): Promise<McpJsonRpcResponse> => {
  const record = asRecord(body);
  if (record === null) {
    return jsonRpcError(null, -32700, "Parse error");
  }
  const id = record.id ?? null;
  const method = record.method;
  if (typeof method !== "string") {
    return jsonRpcError(id, -32600, "Invalid Request");
  }
  if (method === "initialize") {
    return jsonRpcResult(id, {
      protocolVersion: MCP_PROTOCOL_VERSION,
      capabilities: { tools: { listChanged: false } },
      serverInfo: server.serverInfo,
    });
  }
  if (method === "ping" || method === "notifications/initialized") {
    return jsonRpcResult(id, {});
  }
  if (method === "tools/list") {
    return jsonRpcResult(id, {
      tools: server.tools.map((tool) => tool.definition),
    });
  }
  if (method === "tools/call") {
    return callTool(id, asRecord(record.params), server, context);
  }
  return jsonRpcError(id, -32601, "Method not found");
};
