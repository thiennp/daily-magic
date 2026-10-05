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

import { GET_MY_PROJECT_WEBHOOK_STATUS_TOOL } from "@/lib/agentAccess/getMyProjectWebhookStatusTool.constant";
import { executeProjectAclWebhookAndKeyTools } from "@/lib/agentAccess/executeProjectAclWebhookAndKeyTools";

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
    readHmacStatus.mockReset();
    readHmacStatus.mockResolvedValue({
      hmacWebhookUrl: null,
      secretSet: false,
    });
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
    expect(outsider.text).toContain(
      "If forbidden says 'Project API key cannot call this tool', retry with your agent-access Bearer. Any other forbidden means your membership is not active: re-check get_my_project_access.",
    );
  });

  it("points an unregistered bot to the owner's form, never a member form", async () => {
    readStatus.mockResolvedValue({
      grokWebhookUrl: null,
      lastGrokWakeResult: null,
    });
    const { text } = await call({ projectId: "proj-1" });
    expect(text).toContain(
      "The project owner enters both in the Grok webhook form at Agent Witch Cloud → Project Access → People → Members → <bot> → Grok webhook",
    );
    expect(text).toContain(
      "If you are not the owner, give the URL and key to the owner outside chat. Never paste the key into a project message.",
    );
    expect(text).not.toContain("register_project_webhook yourself");
    expect(text).not.toContain("Project Access → Members");
    expect(GET_MY_PROJECT_WEBHOOK_STATUS_TOOL.description).toContain(
      "Agent-access Bearer only; awc_proj_ keys are rejected for this tool.",
    );
    expect(GET_MY_PROJECT_WEBHOOK_STATUS_TOOL.description).toContain(
      "If forbidden says 'Project API key cannot call this tool', retry with your agent-access Bearer. Any other forbidden means your membership is not active: re-check get_my_project_access.",
    );
    expect(GET_MY_PROJECT_WEBHOOK_STATUS_TOOL.description).toContain(
      "Project Access → People → Members → <bot> → Grok webhook",
    );
  });
});
