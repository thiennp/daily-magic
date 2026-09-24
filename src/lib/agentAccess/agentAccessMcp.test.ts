import { describe, expect, it } from "vitest";

import { buildWebMcpDocument } from "@/lib/agentAccess/buildWebMcpDocument";
import { handleAgentAccessMcpRequest } from "@/lib/agentAccess/handleAgentAccessMcpRequest";

describe("agent access WebMCP", () => {
  it("publishes tools and the production MCP url", () => {
    const document = buildWebMcpDocument("https://www.agentwitch.com/");

    expect(document.tools.map((tool) => tool.name)).toContain("send_task");
    expect(document.mcp.url).toBe(
      "https://www.agentwitch.com/api/agent-access/mcp",
    );
    expect(document.prompt).toContain("https://www.agentwitch.com/for-agents");
    expect(document.guidelineUrl).toBe("https://www.agentwitch.com/for-agents");
  });

  it("answers initialize, tools/list, and tools/call", async () => {
    const initialize = await handleAgentAccessMcpRequest(
      { jsonrpc: "2.0", id: 1, method: "initialize" },
      null,
      { callTool: async () => ({ isError: false, text: "{}" }) },
    );
    const listed = await handleAgentAccessMcpRequest(
      { jsonrpc: "2.0", id: 2, method: "tools/list" },
      null,
      { callTool: async () => ({ isError: false, text: "{}" }) },
    );
    const called = await handleAgentAccessMcpRequest(
      {
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: { name: "whoami", arguments: {} },
      },
      "Bearer aw_testtokenvalue000000000",
      {
        callTool: async (name) => ({
          isError: name !== "whoami",
          text: "{}",
        }),
      },
    );
    const invalid = await handleAgentAccessMcpRequest("nope", null, {
      callTool: async () => ({ isError: false, text: "{}" }),
    });
    const missingName = await handleAgentAccessMcpRequest(
      { jsonrpc: "2.0", id: 4, method: "tools/call", params: {} },
      null,
      { callTool: async () => ({ isError: false, text: "{}" }) },
    );

    expect(initialize).toMatchObject({
      result: { serverInfo: { name: "agent-witch" } },
    });
    expect(JSON.stringify(listed)).toContain("register_account");
    expect(called).toMatchObject({ result: { isError: false } });
    expect(invalid).toMatchObject({ error: { code: -32700 } });
    expect(missingName).toMatchObject({ error: { code: -32602 } });
  });

  it("rejects unknown methods and missing method names", async () => {
    const unknown = await handleAgentAccessMcpRequest(
      { jsonrpc: "2.0", id: 5, method: "nope" },
      null,
      { callTool: async () => ({ isError: false, text: "{}" }) },
    );
    const ping = await handleAgentAccessMcpRequest(
      { jsonrpc: "2.0", id: 6, method: "ping" },
      null,
      { callTool: async () => ({ isError: false, text: "{}" }) },
    );

    expect(unknown).toMatchObject({ error: { code: -32601 } });
    expect(ping).toMatchObject({ result: {} });
  });

  it("rejects a JSON-RPC batch so one request cannot fan out", async () => {
    const batched = await handleAgentAccessMcpRequest(
      [{ jsonrpc: "2.0", id: 1, method: "tools/list" }],
      null,
      { callTool: async () => ({ isError: false, text: "{}" }) },
    );

    expect(batched).toMatchObject({ error: { code: -32700 } });
  });
});
