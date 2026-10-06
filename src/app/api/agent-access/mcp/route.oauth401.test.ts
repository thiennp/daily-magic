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
import { readBoundedAgentAccessBody } from "@/lib/agentAccess/readBoundedAgentAccessBody";
import { POST as legacyPost, GET as legacyGet } from "@/app/api/agent-access/mcp/route";
import {
  POST as connectPost,
  GET as connectGet,
} from "@/app/api/agent-access/mcp/connect/route";
import { buildOauthProtectedResourceMetadata } from "@/lib/agentAccess/oauth/buildOauthDiscoveryDocuments";

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

describe("OAuth-protected /api/agent-access/mcp/connect", () => {
  it("401s without Bearer and advertises resource_metadata", async () => {
    const response = await connectPost(
      new Request("http://localhost/api/agent-access/mcp/connect", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{}",
      }),
    );
    expect(response.status).toBe(401);
    const www = response.headers.get("WWW-Authenticate") ?? "";
    expect(www).toContain("Bearer");
    expect(www).toContain("resource_metadata=");
  });

  it("GET without Bearer also 401s", async () => {
    const response = await connectGet(
      new Request("http://localhost/api/agent-access/mcp/connect", {
        method: "GET",
      }),
    );
    expect(response.status).toBe(401);
  });

  it("works with a Bearer access token (HTTP 200)", async () => {
    vi.mocked(readBoundedAgentAccessBody).mockResolvedValueOnce({
      jsonrpc: "2.0",
      id: 9,
      method: "initialize",
    });
    vi.mocked(handleMcpJsonRpcRequest).mockResolvedValueOnce({
      jsonrpc: "2.0",
      id: 9,
      result: { ok: true },
    });

    const prefix = "aw_";
    const body = "x" + "y".repeat(24);
    const response = await connectPost(
      new Request("http://localhost/api/agent-access/mcp/connect", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${prefix}${body}`,
        },
        body: "{}",
      }),
    );
    expect(response.status).toBe(200);
  });

  it("protected-resource metadata points at /mcp/connect", () => {
    expect(buildOauthProtectedResourceMetadata().resource).toBe(
      "https://www.agentwitch.com/api/agent-access/mcp/connect",
    );
  });
});
