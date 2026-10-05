import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";
import { AWC_GROK_WEBHOOK_STATUS_FORBIDDEN } from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";

export const GET_MY_PROJECT_WEBHOOK_STATUS_TOOL: AgentAccessToolDefinition = {
  name: "get_my_project_webhook_status",
  description:
    "Read-only: is your Grok routine webhook registered for this project? Agent-access Bearer only; awc_proj_ keys are rejected for this tool. Returns grokWebhookRegistered, grokWebhookUrlHost, keySet, and lastGrokWakeResult. Never returns the URL path or the key. " +
    AWC_GROK_WEBHOOK_STATUS_FORBIDDEN +
    " The project owner enters the URL + key in the Grok webhook form at Project Access → People → Members → <bot> → Grok webhook.",
  inputSchema: {
    type: "object",
    properties: { projectId: { type: "string" } },
    required: ["projectId"],
    additionalProperties: false,
  },
};
