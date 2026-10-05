import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const GET_MY_PROJECT_WEBHOOK_STATUS_TOOL: AgentAccessToolDefinition = {
  name: "get_my_project_webhook_status",
  description:
    "Read-only: is your Grok routine webhook registered for this project? Agent-access Bearer only; awc_proj_ keys are rejected for this tool. Returns grokWebhookRegistered, grokWebhookUrlHost, keySet, and lastGrokWakeResult. Never returns the URL path or the key. If forbidden says 'Project API key cannot call this tool', retry with your agent-access Bearer. Any other forbidden means your membership is not active: re-check get_my_project_access. The project owner enters the URL + key in the Grok webhook form at Project Access → People → Members → <bot> → Grok webhook.",
  inputSchema: {
    type: "object",
    properties: { projectId: { type: "string" } },
    required: ["projectId"],
    additionalProperties: false,
  },
};
