import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";
import { AWC_GROK_WEBHOOK_STATUS_FORBIDDEN } from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";

export const GET_MY_PROJECT_WEBHOOK_STATUS_TOOL: AgentAccessToolDefinition = {
  name: "get_my_project_webhook_status",
  description:
    "Read-only: are your Grok routine and HMAC webhooks registered for this project? Agent-access Bearer only; awc_proj_ keys are rejected for this tool. Returns grokWebhookRegistered, grokWebhookUrlHost, keySet, lastGrokWakeResult, hmacWebhookRegistered, hmacWebhookUrlHost, and secretSet. Never returns URL paths, the Grok key, or the HMAC secret (awc_whsec_). " +
    AWC_GROK_WEBHOOK_STATUS_FORBIDDEN +
    " The project owner enters the Grok URL + key in the Grok webhook form at Project Access → People → Members → <bot> → Grok webhook. HMAC is registered via register_project_webhook.",
  inputSchema: {
    type: "object",
    properties: { projectId: { type: "string" } },
    required: ["projectId"],
    additionalProperties: false,
  },
};
