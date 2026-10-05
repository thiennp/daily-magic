import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const GET_MY_PROJECT_WEBHOOK_STATUS_TOOL: AgentAccessToolDefinition = {
  name: "get_my_project_webhook_status",
  description:
    "Read-only: is your Grok routine webhook registered for this project? Returns grokWebhookRegistered, grokWebhookUrlHost, and lastGrokWakeResult. Never returns the URL path or the key. The owner enters the URL + key in Project Access → Members → this bot → Grok webhook.",
  inputSchema: {
    type: "object",
    properties: { projectId: { type: "string" } },
    required: ["projectId"],
    additionalProperties: false,
  },
};
