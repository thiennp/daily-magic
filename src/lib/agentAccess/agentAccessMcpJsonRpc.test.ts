import { describe, expect, it } from "vitest";

import { handleMcpJsonRpcRequest, toMcpTextResult } from "@agent-witch/shared/mcp";

import { createAgentAccessMcpServer } from "@/lib/agentAccess/createAgentAccessMcpServer";

const makeServer = (
  callTool: (
    name: string,
    args: unknown,
    authorization: string | null,
  ) => Promise<{ readonly isError: boolean; readonly text: string }>,
) => createAgentAccessMcpServer({ callTool });

describe("agent access MCP JSON-RPC edge cases", () => {
  it("returns tools/call error results via toMcpTextResult", async () => {
    const server = makeServer(async () => ({
      isError: true,
      text: JSON.stringify({ ok: false, code: "unauthorized" }),
    }));
    const called = await handleMcpJsonRpcRequest(
      {
        jsonrpc: "2.0",
        id: 7,
        method: "tools/call",
        params: { name: "whoami", arguments: {} },
      },
      server,
      { authorization: null },
    );
    expect(called).toEqual({
      jsonrpc: "2.0",
      id: 7,
      result: toMcpTextResult(
        JSON.stringify({ ok: false, code: "unauthorized" }),
        true,
      ),
    });
  });

  it("rejects parse errors and missing tool names", async () => {
    const server = makeServer(async () => ({ isError: false, text: "{}" }));
    const invalid = await handleMcpJsonRpcRequest("nope", server, {
      authorization: null,
    });
    const missingName = await handleMcpJsonRpcRequest(
      { jsonrpc: "2.0", id: 4, method: "tools/call", params: {} },
      server,
      { authorization: null },
    );
    expect(invalid).toMatchObject({ error: { code: -32700 } });
    expect(missingName).toMatchObject({ error: { code: -32602 } });
  });

  it("rejects unknown methods and answers ping", async () => {
    const server = makeServer(async () => ({ isError: false, text: "{}" }));
    const unknown = await handleMcpJsonRpcRequest(
      { jsonrpc: "2.0", id: 5, method: "nope" },
      server,
      { authorization: null },
    );
    const ping = await handleMcpJsonRpcRequest(
      { jsonrpc: "2.0", id: 6, method: "ping" },
      server,
      { authorization: null },
    );
    expect(unknown).toMatchObject({ error: { code: -32601 } });
    expect(ping).toMatchObject({ result: {} });
  });

  it("rejects a JSON-RPC batch so one request cannot fan out", async () => {
    const server = makeServer(async () => ({ isError: false, text: "{}" }));
    const batched = await handleMcpJsonRpcRequest(
      [{ jsonrpc: "2.0", id: 1, method: "tools/list" }],
      server,
      { authorization: null },
    );
    expect(batched).toMatchObject({ error: { code: -32700 } });
  });
});
