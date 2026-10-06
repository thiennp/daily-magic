import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/agentAccess/guardAgentAccessPost", () => ({
  guardAgentAccessPost: vi.fn(async () => null),
}));

vi.mock("@/lib/agentAccess/readBoundedAgentAccessBody", () => ({
  readBoundedAgentAccessBody: vi.fn(async () => ({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
  })),
}));

vi.mock("@/lib/agentAccess/createAgentAccessMcpServer", () => ({
  createAgentAccessMcpServer: vi.fn(() => ({
    serverInfo: { name: "test", version: "0" },
    tools: [],
  })),
}));

vi.mock("@agent-witch/shared/mcp", () => ({
  handleMcpJsonRpcRequest: vi.fn(async () => ({
    jsonrpc: "2.0",
    id: 1,
    result: { ok: true, method: "initialize" },
  })),
}));

vi.mock("@/features/project-skill-share/public-api/infrastructure", () => ({
  executeProjectSkillShareTool: vi.fn(),
}));

vi.mock("@/lib/agentAccess/executeAgentAccessTool", () => ({
  executeAgentAccessTool: vi.fn(async () => ({
    isError: false,
    text: JSON.stringify({ ok: true, token: "aw_redacted" }),
  })),
}));

vi.mock("@/lib/agentAccess/readClientIp", () => ({
  readClientIp: () => "127.0.0.1",
}));

import { handleMcpJsonRpcRequest } from "@agent-witch/shared/mcp";
import {
  GET as legacyGet,
  POST as legacyPost,
} from "@/app/api/agent-access/mcp/route";
import { readBoundedAgentAccessBody } from "@/lib/agentAccess/readBoundedAgentAccessBody";

describe("legacy /api/agent-access/mcp (main-compatible anonymous)", () => {
  it("anonymous initialize returns 200 JSON-RPC (not HTTP 401)", async () => {
    const response = await legacyPost(
      new Request("http://localhost/api/agent-access/mcp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{}",
      }),
    );
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.result).toEqual({ ok: true, method: "initialize" });
    expect(response.headers.get("WWW-Authenticate")).toBeNull();
  });

  it("anonymous register_account is dispatched (no HTTP 401 gate)", async () => {
    vi.mocked(readBoundedAgentAccessBody).mockResolvedValueOnce({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: { name: "register_account", arguments: { method: "none" } },
    });
    vi.mocked(handleMcpJsonRpcRequest).mockResolvedValueOnce({
      jsonrpc: "2.0",
      id: 2,
      result: { content: [{ type: "text", text: '{"ok":true}' }] },
    });

    const response = await legacyPost(
      new Request("http://localhost/api/agent-access/mcp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{}",
      }),
    );
    expect(response.status).toBe(200);
    expect(handleMcpJsonRpcRequest).toHaveBeenCalled();
  });

  it("legacy GET discovery stays available without Bearer", async () => {
    const response = await legacyGet(
      new Request("http://localhost/api/agent-access/mcp", { method: "GET" }),
    );
    expect(response.status).toBe(200);
  });
});
