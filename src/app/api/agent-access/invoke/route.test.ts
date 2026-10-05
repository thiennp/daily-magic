import { beforeEach, describe, expect, it, vi } from "vitest";

const executeTool = vi.hoisted(() => vi.fn());
const readStatus = vi.hoisted(() => vi.fn());
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
vi.mock(
  "@/lib/projects/acl/webhooks/readProjectGrokRoutineWebhookStatus",
  () => ({ readProjectGrokRoutineWebhookStatus: readStatus }),
);

import { POST } from "@/app/api/agent-access/invoke/route";
import { AWC_GROK_WEBHOOK_STATUS_FORBIDDEN } from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import { executeGetMyProjectWebhookStatusTool } from "@/lib/agentAccess/executeGetMyProjectWebhookStatusTool";
import { guardProjectApiKeyToolUse } from "@/lib/agentAccess/guardProjectApiKeyToolUse";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";

const STATUS_TOOL = "get_my_project_webhook_status";

const invoke = async (args: unknown) => {
  body.value = { name: STATUS_TOOL, arguments: args };
  const response = await POST(
    new Request("https://www.agentwitch.com/api/agent-access/invoke", {
      method: "POST",
    }),
  );
  return {
    status: response.status,
    json: (await response.json()) as Record<string, unknown>,
  };
};

const statusTool = (args: unknown) =>
  executeGetMyProjectWebhookStatusTool({
    actor: { id: "bot-1" } as never,
    args,
  });

describe("POST /api/agent-access/invoke status codes", () => {
  beforeEach(() => {
    executeTool.mockReset();
    readStatus.mockReset();
  });

  it("returns 403 when an awc_proj_ key calls get_my_project_webhook_status", async () => {
    const denied = guardProjectApiKeyToolUse({
      name: STATUS_TOOL,
      args: { projectId: "proj-1" },
      projectAuth: { projectId: "proj-1" } as never,
    });
    expect(denied).not.toBeNull();
    executeTool.mockResolvedValue(denied);
    const { status, json } = await invoke({ projectId: "proj-1" });
    expect(status).toBe(403);
    expect(json.code).toBe("forbidden");
    expect(json.error).toMatch(/^Project API key cannot call this tool/);
  });

  it("returns 403 with the unchanged note when the membership is not active", async () => {
    readStatus.mockResolvedValue(null);
    executeTool.mockResolvedValue(await statusTool({ projectId: "proj-1" }));
    const { status, json } = await invoke({ projectId: "proj-1" });
    expect(status).toBe(403);
    expect(json).toEqual({
      ok: false,
      error: "forbidden",
      code: "forbidden",
      note: AWC_GROK_WEBHOOK_STATUS_FORBIDDEN,
    });
  });

  it("keeps 400 for validation errors", async () => {
    executeTool.mockResolvedValue(await statusTool({}));
    expect((await invoke({})).status).toBe(400);
    body.value = { arguments: {} };
    const missingName = await POST(
      new Request("https://www.agentwitch.com/api/agent-access/invoke", {
        method: "POST",
      }),
    );
    expect(missingName.status).toBe(400);
  });

  it("keeps 401 for missing auth, 429 for rate limits, 200 for success", async () => {
    const cases: readonly [unknown, boolean, number][] = [
      [{ ok: false, code: "unauthorized" }, true, 401],
      [{ ok: false, code: "rate_limited" }, true, 429],
      [{ ok: true, projectId: "proj-1" }, false, 200],
    ];
    for (const [value, isError, expected] of cases) {
      executeTool.mockResolvedValue(agentAccessTextResult(value, isError));
      expect((await invoke({ projectId: "proj-1" })).status).toBe(expected);
    }
  });
});
