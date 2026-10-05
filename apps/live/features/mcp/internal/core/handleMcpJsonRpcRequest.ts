import type {
  McpJsonRpcResponse,
  McpServerDefinition,
} from "../../public-api/types";

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

const callTool = (
  id: unknown,
  params: Readonly<Record<string, unknown>> | null,
  server: McpServerDefinition,
): McpJsonRpcResponse => {
  const name = params?.name;
  if (typeof name !== "string") {
    return jsonRpcError(id, -32602, "tool name is required");
  }
  const tool = server.tools.find((entry) => entry.definition.name === name);
  if (tool === undefined) {
    return jsonRpcError(id, -32602, `Unknown tool: ${name}`);
  }
  try {
    const result = tool.call(params?.arguments ?? {});
    return jsonRpcResult(id, {
      content: [{ type: "text", text: JSON.stringify(result) }],
      isError: false,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return jsonRpcError(id, -32603, `Tool ${name} failed: ${message}`);
  }
};

/**
 * Shared MCP JSON-RPC core (initialize, ping, notifications, tools/list,
 * tools/call, errors). Transports (stdio, HTTP) only frame bytes around it.
 */
export const handleMcpJsonRpcRequest = (
  body: unknown,
  server: McpServerDefinition,
): McpJsonRpcResponse => {
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
      protocolVersion: server.protocolVersion,
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
    return callTool(id, asRecord(record.params), server);
  }
  return jsonRpcError(id, -32601, "Method not found");
};
