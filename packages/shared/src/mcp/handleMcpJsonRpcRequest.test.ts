import { describe, expect, it, vi } from "vitest";

import { handleMcpJsonRpcRequest } from "./handleMcpJsonRpcRequest";
import { MCP_PROTOCOL_VERSION } from "./mcpProtocol.constant";
import type { McpServerDefinition } from "./McpServer.type";

const makeServer = (
  call: (args: unknown) => unknown = () => ({ status: "miss" }),
): McpServerDefinition => ({
  serverInfo: { name: "agent-witch", version: "1.0.0" },
  tools: [
    {
      definition: {
        name: "check_context",
        description: "d",
        inputSchema: { type: "object" },
      },
      call,
    },
  ],
});

describe("handleMcpJsonRpcRequest", () => {
  it("answers initialize with protocol version, capabilities and serverInfo", () => {
    expect(
      handleMcpJsonRpcRequest(
        { jsonrpc: "2.0", id: 1, method: "initialize" },
        makeServer(),
      ),
    ).toEqual({
      jsonrpc: "2.0",
      id: 1,
      result: {
        protocolVersion: MCP_PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "agent-witch", version: "1.0.0" },
      },
    });
  });

  it("acks ping and notifications/initialized with an empty result", () => {
    const server = makeServer();
    expect(
      handleMcpJsonRpcRequest(
        { jsonrpc: "2.0", id: 2, method: "ping" },
        server,
      ),
    ).toEqual({ jsonrpc: "2.0", id: 2, result: {} });
    expect(
      handleMcpJsonRpcRequest(
        { jsonrpc: "2.0", method: "notifications/initialized" },
        server,
      ),
    ).toEqual({ jsonrpc: "2.0", id: null, result: {} });
  });

  it("lists tool definitions", () => {
    expect(
      handleMcpJsonRpcRequest(
        { jsonrpc: "2.0", id: 3, method: "tools/list" },
        makeServer(),
      ),
    ).toMatchObject({ result: { tools: [{ name: "check_context" }] } });
  });

  it("calls a tool with raw arguments and returns JSON text content", () => {
    const call = vi.fn(() => ({ status: "miss", projectId: "p1" }));
    const response = handleMcpJsonRpcRequest(
      {
        jsonrpc: "2.0",
        id: 4,
        method: "tools/call",
        params: { name: "check_context", arguments: { projectId: "p1" } },
      },
      makeServer(call),
    );
    expect(call).toHaveBeenCalledWith({ projectId: "p1" });
    expect(response).toEqual({
      jsonrpc: "2.0",
      id: 4,
      result: {
        isError: false,
        content: [
          {
            type: "text",
            text: JSON.stringify({ status: "miss", projectId: "p1" }),
          },
        ],
      },
    });
  });

  it.each([
    [null, -32700],
    [[1], -32700],
    [{ jsonrpc: "2.0", id: 5 }, -32600],
    [{ jsonrpc: "2.0", id: 6, method: "resources/list" }, -32601],
    [{ jsonrpc: "2.0", id: 7, method: "tools/call", params: {} }, -32602],
    [
      {
        jsonrpc: "2.0",
        id: 8,
        method: "tools/call",
        params: { name: "nope" },
      },
      -32602,
    ],
  ])("returns a JSON-RPC error for %j", (body, code) => {
    expect(handleMcpJsonRpcRequest(body, makeServer())).toMatchObject({
      jsonrpc: "2.0",
      error: { code },
    });
  });

  it("maps a throwing tool to an internal error instead of throwing", () => {
    const response = handleMcpJsonRpcRequest(
      {
        jsonrpc: "2.0",
        id: 9,
        method: "tools/call",
        params: { name: "check_context" },
      },
      makeServer(() => {
        throw new Error("boom");
      }),
    );
    expect(response).toMatchObject({ id: 9, error: { code: -32603 } });
  });
});
