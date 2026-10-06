import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/agentAccess/guardAgentAccessPost", () => ({
  guardAgentAccessPost: vi.fn(async () => null),
}));

vi.mock("@/lib/agentAccess/readBoundedAgentAccessBody", () => ({
  readBoundedAgentAccessBody: vi.fn(),
}));

vi.mock("@/lib/agentAccess/createAgentAccessMcpServer", () => ({
  createAgentAccessMcpServer: vi.fn(),
}));

vi.mock("@agent-witch/shared/mcp", () => ({
  handleMcpJsonRpcRequest: vi.fn(),
}));

vi.mock("@/features/project-skill-share/public-api/infrastructure", () => ({
  executeProjectSkillShareTool: vi.fn(),
}));

vi.mock("@/lib/agentAccess/executeAgentAccessTool", () => ({
  executeAgentAccessTool: vi.fn(),
}));

vi.mock("@/lib/agentAccess/readClientIp", () => ({
  readClientIp: () => "127.0.0.1",
}));

import { POST, GET } from "@/app/api/agent-access/mcp/route";

describe("MCP OAuth challenge", () => {
  it("unauthenticated POST returns 401 with WWW-Authenticate resource_metadata", async () => {
    const response = await POST(
      new Request("http://localhost/api/agent-access/mcp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{}",
      }),
    );
    expect(response.status).toBe(401);
    const www = response.headers.get("WWW-Authenticate") ?? "";
    expect(www).toContain("Bearer");
    expect(www).toContain("resource_metadata=");
    expect(www).toContain("oauth-protected-resource");
  });

  it("legacy GET discovery stays available without Bearer", async () => {
    const response = await GET(
      new Request("http://localhost/api/agent-access/mcp", { method: "GET" }),
    );
    expect(response.status).toBe(200);
  });
});
