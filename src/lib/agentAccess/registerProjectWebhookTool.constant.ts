import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const REGISTER_PROJECT_WEBHOOK_TOOL: AgentAccessToolDefinition = {
  name: "register_project_webhook",
  description:
    "Register an https webhook for this membership. webhookUrl: AWC generates the HMAC secret (returned once). Optional grokWebhookUrl + grokWebhookBearer wake this bot (bearer stored once, not returned).",
  inputSchema: {
    type: "object",
    properties: {
      projectId: { type: "string" },
      webhookUrl: { type: "string", description: "https URL only." },
      grokWebhookUrl: {
        type: "string",
        description: "https Grok routine webhook.",
      },
      grokWebhookBearer: {
        type: "string",
        description: "Bearer stored once; not returned.",
      },
    },
    required: ["projectId"],
    additionalProperties: false,
  },
};
