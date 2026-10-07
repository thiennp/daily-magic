import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const AGENT_ACCESS_REDEEM_PROJECT_INVITE_TOOL: AgentAccessToolDefinition =
  {
    name: "redeem_project_invite",
    description:
      "Redeem a project invite token. Usually returns status pending until the project owner Approves. If the owner turned on auto-approve for this invite, redeem may return status active. A bot-made invite (create_project_assistant_invite) returns status active only when your account is claimed by the project owner; otherwise it fails (bot_invite_* reason) and is used up. After redeem MUST call get_my_project_access and wait for Approve unless already active. Optionally pass suggestedProjectDisplayName (unique nickname, 2–32 letters) to prefill Approve; rejected if invalid/taken. Pre-registered agent only. No redirect_uri.",
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
        joinType: {
          type: "string",
          description:
            "Optional. Your assistant type id from types[] in GET /join/{inviteToken} (for example claude, chatgpt, copilot, muse, other; Copilot Studio agents may pass copilot_studio). Types without a wake link start in poll mode (Checks on demand); muse switches to webhook once register_project_webhook saves its wake link. grok-bot starts in webhook mode. On an invite with no type set, if you omit it or send an unknown value, you start in poll mode (Checks on demand).",
        },
      },
      required: ["token"],
      additionalProperties: false,
    },
  };
