import { beforeEach, describe, expect, it, vi } from "vitest";

const readStatus = vi.hoisted(() => vi.fn());

vi.mock(
  "@/lib/projects/acl/webhooks/readProjectGrokRoutineWebhookStatus",
  () => ({
    readProjectGrokRoutineWebhookStatus: readStatus,
  }),
);

import { AGENT_ACCESS_PROJECT_INVITE_HOOKS_TOOLS } from "@/lib/agentAccess/agentAccessProjectInviteHooksToolCatalog.constant";
import { buildAgentAccessLiveGuide } from "@/lib/agentAccess/buildAgentAccessLiveGuide";
import { executeProjectAclWebhookAndKeyTools } from "@/lib/agentAccess/executeProjectAclWebhookAndKeyTools";
import { AGENT_ACCESS_MUTATING_TOOLS } from "@/lib/agentAccess/agentAccess.constant";
import { PROJECT_API_KEY_MCP_TOOLS } from "@/lib/projects/acl/projectApiKeys/projectApiKeyMcpAllowlist.constant";

const actor = { id: "bot-user-1" } as never;

const call = async (args: unknown) => {
  const result = await executeProjectAclWebhookAndKeyTools({
    actor,
    name: "get_my_project_webhook_status",
    args,
  });
  const text = JSON.stringify(result);
  return { result, text };
};

describe("get_my_project_webhook_status", () => {
  beforeEach(() => {
    readStatus.mockReset();
  });

  it("returns registration + host for the caller's own membership, never the key", async () => {
    readStatus.mockResolvedValue({
      grokWebhookUrl: "https://hooks.example.com/wake/abc",
      lastGrokWakeResult: "http_200",
    });
    const { result, text } = await call({ projectId: "proj-1" });
    expect(readStatus).toHaveBeenCalledWith({
      projectId: "proj-1",
      by: "own_membership",
      userId: "bot-user-1",
    });
    expect(text).toMatch(/keySet\\":true/);
    expect(result?.isError).not.toBe(true);
    expect(text).toContain("grokWebhookRegistered");
    expect(text).toContain("hooks.example.com");
    expect(text).toContain("http_200");
    expect(text).not.toMatch(/bearer|wake\/abc/i);
  });

  it("rejects missing projectId and non-members", async () => {
    const missing = await call({});
    expect(missing.result?.isError).toBe(true);
    expect(missing.text).toContain("invalid_arguments");
    expect(readStatus).not.toHaveBeenCalled();
    readStatus.mockResolvedValue(null);
    const outsider = await call({ projectId: "proj-1" });
    expect(outsider.result?.isError).toBe(true);
    expect(outsider.text).toContain("forbidden");
  });

  it("is listed in the catalog and guide as a read-only, agent-access tool", () => {
    const def = AGENT_ACCESS_PROJECT_INVITE_HOOKS_TOOLS.find(
      (tool) => tool.name === "get_my_project_webhook_status",
    );
    expect(def?.inputSchema).toMatchObject({ required: ["projectId"] });
    expect(buildAgentAccessLiveGuide().projectCowork.tools).toContain(
      "get_my_project_webhook_status",
    );
    expect(AGENT_ACCESS_MUTATING_TOOLS as readonly string[]).not.toContain(
      "get_my_project_webhook_status",
    );
    expect(PROJECT_API_KEY_MCP_TOOLS as readonly string[]).not.toContain(
      "get_my_project_webhook_status",
    );
  });
});
