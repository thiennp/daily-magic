import { describe, expect, it, vi } from "vitest";

import { handleMcpJsonRpcRequest } from "./handleMcpJsonRpcRequest";
import { MCP_PROTOCOL_VERSION } from "./mcpProtocol.constant";
import type { McpServerDefinition, McpToolResult } from "./McpServer.type";
import { toMcpTextResult } from "./toMcpTextResult";

const makeServer = <TContext = undefined>(
  call: (
    args: unknown,
    context: TContext,
  ) => McpToolResult | Promise<McpToolResult> = () =>
    toMcpTextResult(JSON.stringify({ status: "miss" })),
): McpServerDefinition<TContext> => ({
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
  it("answers initialize with protocol version, capabilities and serverInfo", async () => {
    expect(MCP_PROTOCOL_VERSION).toBe("2025-03-26");
    expect(
      await handleMcpJsonRpcRequest(
        { jsonrpc: "2.0", id: 1, method: "initialize" },
        makeServer(),
        undefined,
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

  it("acks ping and notifications/initialized with an empty result", async () => {
    const server = makeServer();
    expect(
      await handleMcpJsonRpcRequest(
        { jsonrpc: "2.0", id: 2, method: "ping" },
        server,
        undefined,
      ),
    ).toEqual({ jsonrpc: "2.0", id: 2, result: {} });
    expect(
      await handleMcpJsonRpcRequest(
        { jsonrpc: "2.0", method: "notifications/initialized" },
        server,
        undefined,
      ),
    ).toEqual({ jsonrpc: "2.0", id: null, result: {} });
  });

  it("lists tool definitions", async () => {
    expect(
      await handleMcpJsonRpcRequest(
        { jsonrpc: "2.0", id: 3, method: "tools/list" },
        makeServer(),
        undefined,
      ),
    ).toMatchObject({ result: { tools: [{ name: "check_context" }] } });
  });

  it("calls a tool with raw arguments and returns MCP text content", async () => {
    const call = vi.fn(() =>
      toMcpTextResult(JSON.stringify({ status: "miss", projectId: "p1" })),
    );
    const response = await handleMcpJsonRpcRequest(
      {
        jsonrpc: "2.0",
        id: 4,
        method: "tools/call",
        params: { name: "check_context", arguments: { projectId: "p1" } },
      },
      makeServer(call),
      undefined,
    );
    expect(call).toHaveBeenCalledWith({ projectId: "p1" }, undefined);
    expect(response).toEqual({
      jsonrpc: "2.0",
      id: 4,
      result: {
        content: [
          {
            type: "text",
            text: JSON.stringify({ status: "miss", projectId: "p1" }),
          },
        ],
      },
    });
  });

  it("awaits an async tool and returns its result", async () => {
    const response = await handleMcpJsonRpcRequest(
      {
        jsonrpc: "2.0",
        id: 10,
        method: "tools/call",
        params: { name: "check_context", arguments: { x: 1 } },
      },
      makeServer(async () => toMcpTextResult(JSON.stringify({ ok: true }))),
      undefined,
    );
    expect(response).toEqual({
      jsonrpc: "2.0",
      id: 10,
      result: toMcpTextResult(JSON.stringify({ ok: true })),
    });
  });

  it("passes per-call context through to the tool", async () => {
    const call = vi.fn((_: unknown, context: { authorization: string }) =>
      toMcpTextResult(JSON.stringify({ auth: context.authorization })),
    );
    const response = await handleMcpJsonRpcRequest(
      {
        jsonrpc: "2.0",
        id: 11,
        method: "tools/call",
        params: { name: "check_context", arguments: {} },
      },
      makeServer<{ authorization: string }>(call),
      { authorization: "Bearer tok" },
    );
    expect(call).toHaveBeenCalledWith({}, { authorization: "Bearer tok" });
    expect(response).toMatchObject({
      result: {
        content: [
          { type: "text", text: JSON.stringify({ auth: "Bearer tok" }) },
        ],
      },
    });
  });

  it("passes through an isError tool result", async () => {
    const response = await handleMcpJsonRpcRequest(
      {
        jsonrpc: "2.0",
        id: 12,
        method: "tools/call",
        params: { name: "check_context" },
      },
      makeServer(() => toMcpTextResult("denied", true)),
      undefined,
    );
    expect(response).toEqual({
      jsonrpc: "2.0",
      id: 12,
      result: {
        content: [{ type: "text", text: "denied" }],
        isError: true,
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
  ])("returns a JSON-RPC error for %j", async (body, code) => {
    expect(
      await handleMcpJsonRpcRequest(body, makeServer(), undefined),
    ).toMatchObject({
      jsonrpc: "2.0",
      error: { code },
    });
  });

  it("maps a throwing tool to an internal error instead of throwing", async () => {
    const response = await handleMcpJsonRpcRequest(
      {
        jsonrpc: "2.0",
        id: 9,
        method: "tools/call",
        params: { name: "check_context" },
      },
      makeServer(() => {
        throw new Error("boom");
      }),
      undefined,
    );
    expect(response).toMatchObject({ id: 9, error: { code: -32603 } });
  });

  it("maps a rejecting tool to an internal error instead of rejecting", async () => {
    const response = await handleMcpJsonRpcRequest(
      {
        jsonrpc: "2.0",
        id: 13,
        method: "tools/call",
        params: { name: "check_context" },
      },
      makeServer(async () => {
        throw new Error("async boom");
      }),
      undefined,
    );
    expect(response).toEqual({
      jsonrpc: "2.0",
      id: 13,
      error: { code: -32603, message: "Tool check_context failed" },
    });
  });

  it("-32603 never leaks error text, stack or paths; hands the error to onToolError", async () => {
    const onToolError = vi.fn();
    const secret = new Error("ENOENT: /Users/someone/.agent-witch/profiles/x/token-saver.db");
    const response = await handleMcpJsonRpcRequest(
      {
        jsonrpc: "2.0",
        id: 14,
        method: "tools/call",
        params: { name: "check_context" },
      },
      {
        ...makeServer(() => {
          throw secret;
        }),
        onToolError,
      },
      undefined,
    );
    expect(response).toEqual({
      jsonrpc: "2.0",
      id: 14,
      error: { code: -32603, message: "Tool check_context failed" },
    });
    expect(JSON.stringify(response)).not.toContain("/Users/");
    expect(JSON.stringify(response)).not.toContain("ENOENT");
    expect(onToolError).toHaveBeenCalledWith("check_context", secret);
  });

  it("a throwing onToolError does not change the -32603 response", async () => {
    const response = await handleMcpJsonRpcRequest(
      {
        jsonrpc: "2.0",
        id: 15,
        method: "tools/call",
        params: { name: "check_context" },
      },
      {
        ...makeServer(() => {
          throw new Error("boom");
        }),
        onToolError: () => {
          throw new Error("logger down");
        },
      },
      undefined,
    );
    expect(response).toMatchObject({
      id: 15,
      error: { code: -32603, message: "Tool check_context failed" },
    });
  });
});
