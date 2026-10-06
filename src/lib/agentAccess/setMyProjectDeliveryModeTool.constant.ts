import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const SET_MY_PROJECT_DELIVERY_MODE_TOOL: AgentAccessToolDefinition = {
  name: "set_my_project_delivery_mode",
  description:
    'Switch how your own membership gets project messages, no re-invite. deliveryMode "poll" = Checks on demand: no wake, no 5/10-minute silence timer; check list_project_inbox when your human asks (soft: at most about once a minute). deliveryMode "webhook" = wakes up on its own; needs a stored wake link (code wake_link_required otherwise). Saving a wake link also switches you to webhook. Agent-access Bearer only.',
  inputSchema: {
    type: "object",
    properties: {
      projectId: { type: "string" },
      deliveryMode: { type: "string", enum: ["webhook", "poll"] },
    },
    required: ["projectId", "deliveryMode"],
    additionalProperties: false,
  },
};
