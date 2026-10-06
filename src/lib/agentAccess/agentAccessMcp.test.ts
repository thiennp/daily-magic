import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_MCP_SERVER_INFO,
  handleMcpJsonRpcRequest,
  MCP_PROTOCOL_VERSION,
  toMcpTextResult,
} from "@agent-witch/shared/mcp";

import { AGENT_ACCESS_MCP_INSTRUCTIONS } from "@/lib/agentAccess/agentAccessLocalFirstCopy.constant";
import { buildWebMcpDocument } from "@/lib/agentAccess/buildWebMcpDocument";
import { createAgentAccessMcpServer } from "@/lib/agentAccess/createAgentAccessMcpServer";

const makeServer = (
  callTool: (
    name: string,
    args: unknown,
    authorization: string | null,
  ) => Promise<{ readonly isError: boolean; readonly text: string }>,
) => createAgentAccessMcpServer({ callTool });

describe("agent access WebMCP", () => {
  it("publishes tools and the production MCP url", () => {
    const document = buildWebMcpDocument();
    expect(document.tools.map((tool) => tool.name)).toContain("send_task");
    expect(document.mcp.url).toBe(
      "https://www.agentwitch.com/api/agent-access/mcp",
    );
    expect(document.prompt).toContain("https://www.agentwitch.com/for-agents");
    expect(document.guidelineUrl).toBe("https://www.agentwitch.com/for-agents");
  });

  it("answers initialize with shared protocol and server info", async () => {
    const server = makeServer(async () => ({ isError: false, text: "{}" }));
    const initialize = await handleMcpJsonRpcRequest(
      { jsonrpc: "2.0", id: 1, method: "initialize" },
      server,
      { authorization: null },
    );
    expect(initialize).toEqual({
      jsonrpc: "2.0",
      id: 1,
      result: {
        protocolVersion: MCP_PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: AGENT_WITCH_MCP_SERVER_INFO,
        instructions: AGENT_ACCESS_MCP_INSTRUCTIONS,
      },
    });
    expect(MCP_PROTOCOL_VERSION).toBe("2025-03-26");
  });

  it("answers tools/list and tools/call success with auth context", async () => {
    const seenAuth: Array<string | null> = [];
    const server = makeServer(async (name, _args, authorization) => {
      seenAuth.push(authorization);
      return {
        isError: name !== "whoami",
        text: JSON.stringify({ ok: name === "whoami" }),
      };
    });
    const listed = await handleMcpJsonRpcRequest(
      { jsonrpc: "2.0", id: 2, method: "tools/list" },
      server,
      { authorization: null },
    );
    const called = await handleMcpJsonRpcRequest(
      {
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: { name: "whoami", arguments: {} },
      },
      server,
      { authorization: "Bearer aw_testtokenvalue000000000" },
    );
    expect(JSON.stringify(listed)).toContain("register_account");
    expect(called).toEqual({
      jsonrpc: "2.0",
      id: 3,
      result: toMcpTextResult(JSON.stringify({ ok: true })),
    });
    expect(seenAuth).toEqual(["Bearer aw_testtokenvalue000000000"]);
  });
});
