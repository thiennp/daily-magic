import { beforeEach, describe, expect, it, vi } from "vitest";

const readStatus = vi.hoisted(() => vi.fn());
const readHmacStatus = vi.hoisted(() => vi.fn());

vi.mock(
  "@/lib/projects/acl/webhooks/readProjectGrokRoutineWebhookStatus",
  () => ({
    readProjectGrokRoutineWebhookStatus: readStatus,
  }),
);

vi.mock(
  "@/lib/projects/acl/webhooks/readProjectMembershipHmacWebhookStatus",
  () => ({
    readProjectMembershipHmacWebhookStatus: readHmacStatus,
  }),
);

import { AGENT_ACCESS_PROJECT_INVITE_HOOKS_TOOLS } from "@/lib/agentAccess/agentAccessProjectInviteHooksToolCatalog.constant";
import { AGENT_ACCESS_MUTATING_TOOLS } from "@/lib/agentAccess/agentAccess.constant";
import { buildAgentAccessLiveGuide } from "@/lib/agentAccess/buildAgentAccessLiveGuide";
import { GET_MY_PROJECT_WEBHOOK_STATUS_TOOL } from "@/lib/agentAccess/getMyProjectWebhookStatusTool.constant";
import { PROJECT_API_KEY_MCP_TOOLS } from "@/lib/projects/acl/projectApiKeys/projectApiKeyMcpAllowlist.constant";
import { executeProjectAclWebhookAndKeyTools } from "@/lib/agentAccess/executeProjectAclWebhookAndKeyTools";

const actor = { id: "bot-user-1" } as never;

const call = async (args: unknown) => {
  const result = await executeProjectAclWebhookAndKeyTools({
    actor,
    name: "get_my_project_webhook_status",
    args,
  });
  return { result, text: JSON.stringify(result) };
};

describe("get_my_project_webhook_status HMAC fields", () => {
  beforeEach(() => {
    readStatus.mockReset();
    readHmacStatus.mockReset();
    readStatus.mockResolvedValue({
      grokWebhookUrl: "https://hooks.example.com/wake/abc",
      lastGrokWakeResult: "http_200",
    });
    readHmacStatus.mockResolvedValue({
      hmacWebhookUrl: "https://muse.example.com/hook/xyz",
      secretSet: true,
    });
  });

  it("returns HMAC host + secretSet and never the secret or path", async () => {
    const { result, text } = await call({ projectId: "proj-1" });
    expect(readHmacStatus).toHaveBeenCalledWith({
      projectId: "proj-1",
      by: "own_membership",
      userId: "bot-user-1",
    });
    expect(result?.isError).not.toBe(true);
    expect(text).toContain("hmacWebhookRegistered");
    expect(text).toContain("muse.example.com");
    expect(text).toMatch(/secretSet\\":true/);
    expect(text).not.toMatch(/hook\/xyz|awc_whsec_/i);
  });

  it("documents HMAC fields and register_project_webhook in the tool description", () => {
    expect(GET_MY_PROJECT_WEBHOOK_STATUS_TOOL.description).toContain(
      "hmacWebhookRegistered",
    );
    expect(GET_MY_PROJECT_WEBHOOK_STATUS_TOOL.description).toContain(
      "register_project_webhook",
    );
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
