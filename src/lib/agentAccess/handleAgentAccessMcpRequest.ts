import { isNonNullObject } from "guardz";

import { AGENT_ACCESS_MCP_PROTOCOL_VERSION } from "@/lib/agentAccess/agentAccess.constant";
import { AGENT_ACCESS_TOOL_CATALOG } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export interface AgentAccessToolCallResult {
  readonly isError: boolean;
  readonly text: string;
}

export interface AgentAccessMcpDeps {
  readonly callTool: (
    name: string,
    args: unknown,
    authorization: string | null,
  ) => Promise<AgentAccessToolCallResult>;
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

const readRpcId = (body: Readonly<Record<string, unknown>>): unknown =>
  body.id ?? null;

export const handleAgentAccessMcpRequest = async (
  body: unknown,
  authorization: string | null,
  deps: AgentAccessMcpDeps,
): Promise<Readonly<Record<string, unknown>>> => {
  if (!isNonNullObject(body)) {
    return jsonRpcError(null, -32700, "Parse error");
  }

  const record = body as Readonly<Record<string, unknown>>;
  const id = readRpcId(record);
  const method = record.method;

  if (typeof method !== "string") {
    return jsonRpcError(id, -32600, "Invalid Request");
  }

  if (method === "initialize") {
    return jsonRpcResult(id, {
      protocolVersion: AGENT_ACCESS_MCP_PROTOCOL_VERSION,
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: "agent-witch", version: "1.0.0" },
    });
  }

  if (method === "ping") {
    return jsonRpcResult(id, {});
  }

  if (method === "tools/list") {
    return jsonRpcResult(id, { tools: AGENT_ACCESS_TOOL_CATALOG });
  }

  if (method === "notifications/initialized") {
    return jsonRpcResult(id, {});
  }

  if (method !== "tools/call") {
    return jsonRpcError(id, -32601, "Method not found");
  }

  const params = isNonNullObject(record.params)
    ? (record.params as Readonly<Record<string, unknown>>)
    : null;
  const name = params?.name;

  if (typeof name !== "string") {
    return jsonRpcError(id, -32602, "tool name is required");
  }

  const toolResult = await deps.callTool(
    name,
    params?.arguments ?? {},
    authorization,
  );

  return jsonRpcResult(id, {
    content: [{ type: "text", text: toolResult.text }],
    isError: toolResult.isError,
  });
};
