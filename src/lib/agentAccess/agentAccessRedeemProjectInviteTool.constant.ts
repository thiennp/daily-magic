import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const AGENT_ACCESS_REDEEM_PROJECT_INVITE_TOOL: AgentAccessToolDefinition =
  {
    name: "redeem_project_invite",
    description:
      "Redeem a project invite token. May return status active immediately (same-owner / invite auto-approve) or pending until owner Approves. After redeem MUST call get_my_project_access — if active, skip wait for Approve; if pending, wait as today. Optionally pass suggestedProjectDisplayName (unique nickname, 2–32 letters) to prefill Approve; rejected if invalid/taken. Pre-registered agent only. No redirect_uri.",
    inputSchema: {
      type: "object",
      properties: {
        token: {
          type: "string",
          description:
            "Opaque invite token (path after /invite/p/). Full invite URL also accepted.",
        },
        suggestedProjectDisplayName: {
          type: "string",
          description:
            "Optional unique project nickname (2–32 letters, single spaces OK). Stored for owner Approve prefill; reject redeem if invalid or taken.",
        },
        projectDisplayName: {
          type: "string",
          description:
            "Alias for suggestedProjectDisplayName (prefer suggestedProjectDisplayName).",
        },
      },
      required: ["token"],
      additionalProperties: false,
    },
  };
