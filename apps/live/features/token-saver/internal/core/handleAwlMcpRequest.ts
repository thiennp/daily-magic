import type { CheckContextResult } from "../../public-api/types";
import {
  AWL_MCP_PROTOCOL_VERSION,
  AWL_MCP_SERVER_INFO,
  AWL_MCP_TOOLS,
} from "./awlCheckContextTool.constant";
import { parseCheckContextArgs } from "./parseCheckContextArgs";

export interface AwlMcpDeps {
  readonly runCheckContext: (args: unknown) => CheckContextResult;
}

const jsonRpcError = (
  id: unknown,
  code: number,
  message: string,
): Readonly<Record<string, unknown>> => ({
  jsonrpc: "2.0",
  id: id ?? null,
  error: { code, message },
});

const jsonRpcResult = (
  id: unknown,
  result: unknown,
): Readonly<Record<string, unknown>> => ({
  jsonrpc: "2.0",
  id: id ?? null,
  result,
});

/** Local AWL MCP JSON-RPC (stdio or HTTP), same shape as cloud agent-access MCP. */
export const handleAwlMcpRequest = (
  body: unknown,
  deps: AwlMcpDeps,
): Readonly<Record<string, unknown>> => {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return jsonRpcError(null, -32700, "Parse error");
  }
  const record = body as Readonly<Record<string, unknown>>;
  const id = record.id ?? null;
  const method = record.method;
  if (typeof method !== "string") {
    return jsonRpcError(id, -32600, "Invalid Request");
  }
  if (method === "initialize") {
    return jsonRpcResult(id, {
      protocolVersion: AWL_MCP_PROTOCOL_VERSION,
      capabilities: { tools: { listChanged: false } },
      serverInfo: AWL_MCP_SERVER_INFO,
    });
  }
  if (method === "ping" || method === "notifications/initialized") {
    return jsonRpcResult(id, {});
  }
  if (method === "tools/list") {
    return jsonRpcResult(id, { tools: AWL_MCP_TOOLS });
  }
  if (method !== "tools/call") {
    return jsonRpcError(id, -32601, "Method not found");
  }
  const params =
    typeof record.params === "object" &&
    record.params !== null &&
    !Array.isArray(record.params)
      ? (record.params as Readonly<Record<string, unknown>>)
      : null;
  const name = params?.name;
  if (typeof name !== "string") {
    return jsonRpcError(id, -32602, "tool name is required");
  }
  if (name !== "check_context") {
    return jsonRpcError(id, -32602, `Unknown tool: ${name}`);
  }
  const result = deps.runCheckContext(
    parseCheckContextArgs(params?.arguments ?? {}),
  );
  return jsonRpcResult(id, {
    content: [{ type: "text", text: JSON.stringify(result) }],
    isError: false,
  });
};
