import { beforeEach, describe, expect, it, vi } from "vitest";

const executeTool = vi.hoisted(() => vi.fn());

vi.mock("@/lib/agentAccess/guardAgentAccessPost", () => ({
  guardAgentAccessPost: async () => null,
  agentAccessTooLargeResponse: () => new Response(null, { status: 413 }),
}));
vi.mock("@/lib/agentAccess/readBoundedAgentAccessBody", () => ({
  readBoundedAgentAccessBody: async () => ({
    name: "list_project_peers",
    arguments: { projectId: "proj-1" },
  }),
}));
vi.mock("@/lib/agentAccess/readClientIp", () => ({
  readClientIp: () => "127.0.0.1",
}));
vi.mock("@/lib/agentAccess/executeAgentAccessTool", () => ({
  executeAgentAccessTool: executeTool,
}));
vi.mock("@/features/project-skill-share/public-api/infrastructure", () => ({
  executeProjectSkillShareTool: vi.fn(),
}));

import { POST } from "@/app/api/agent-access/invoke/route";
import { buildAgentAccessRateLimitedBody } from "@/lib/agentAccess/agentAccessRateLimited";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";

const invoke = () =>
  POST(
    new Request("https://www.agentwitch.com/api/agent-access/invoke", {
      method: "POST",
    }),
  );

describe("POST /api/agent-access/invoke Retry-After (DF-026)", () => {
  beforeEach(() => {
    executeTool.mockReset();
  });

  it("a rate_limited tool result is 429 with body retryAfterSeconds and Retry-After", async () => {
    executeTool.mockResolvedValue(
      agentAccessTextResult(buildAgentAccessRateLimitedBody(90), true),
    );
    const response = await invoke();
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("90");
    expect(await response.json()).toMatchObject({
      code: "rate_limited",
      retryAfterSeconds: 90,
    });
  });

  it("dispatch-cap rate_limited (retryAfterSeconds from the inbox cap) gets the header too", async () => {
    executeTool.mockResolvedValue(
      agentAccessTextResult(
        {
          ok: false,
          code: "rate_limited",
          reason: "hourly",
          retryAfterSeconds: 12.4,
        },
        true,
      ),
    );
    const response = await invoke();
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("13");
  });

  it("no Retry-After without retryAfterSeconds or on success", async () => {
    executeTool.mockResolvedValue(
      agentAccessTextResult({ ok: false, code: "busy" }, true),
    );
    const busy = await invoke();
    expect(busy.status).toBe(429);
    expect(busy.headers.get("Retry-After")).toBeNull();
    executeTool.mockResolvedValue(agentAccessTextResult({ ok: true }, false));
    const ok = await invoke();
    expect(ok.status).toBe(200);
    expect(ok.headers.get("Retry-After")).toBeNull();
  });
});
