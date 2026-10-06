import { beforeEach, describe, expect, it, vi } from "vitest";

const executeTool = vi.hoisted(() => vi.fn());
const body = vi.hoisted(() => ({ value: null as unknown }));

vi.mock("@/lib/agentAccess/guardAgentAccessPost", () => ({
  guardAgentAccessPost: async () => null,
  agentAccessTooLargeResponse: () => new Response(null, { status: 413 }),
}));
vi.mock("@/lib/agentAccess/readBoundedAgentAccessBody", () => ({
  readBoundedAgentAccessBody: async () => body.value,
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
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";

const post = () =>
  POST(
    new Request("https://www.agentwitch.com/api/agent-access/invoke", {
      method: "POST",
    }),
  );

describe("POST /api/agent-access/invoke tool error status mapping", () => {
  beforeEach(() => {
    executeTool.mockReset();
  });

  it("returns 404 for not_found and keeps 400 for argument errors", async () => {
    const cases: readonly [unknown, number][] = [
      [{ ok: false, error: "Not found.", code: "not_found" }, 404],
      [{ ok: false, error: "Bad args.", code: "invalid_arguments" }, 400],
      [{ ok: false, error: "project_id is required.", code: "project_required" }, 400],
      [{ ok: false, message: "No code." }, 400],
    ];
    for (const [value, expected] of cases) {
      body.value = { name: "get_project_acl", arguments: { projectId: "p-1" } };
      executeTool.mockResolvedValue(agentAccessTextResult(value, true));
      const response = await post();
      expect(response.status).toBe(expected);
      expect(await response.json()).toEqual(value);
    }
  });

  it("keeps 413 when the body is too large", async () => {
    body.value = "too_large";
    const response = await post();
    expect(response.status).toBe(413);
    expect(executeTool).not.toHaveBeenCalled();
  });
});
