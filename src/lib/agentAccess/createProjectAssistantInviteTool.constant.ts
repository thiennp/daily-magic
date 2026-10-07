import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";
import { CREATE_PROJECT_ASSISTANT_INVITE_TOOL_NAME } from "@/lib/projects/acl/invites/botInvites/botProjectInvite.constants";

/** DF-038: active same-owner bot member → single-use invite for a sibling bot. */
export const CREATE_PROJECT_ASSISTANT_INVITE_TOOL: AgentAccessToolDefinition = {
  name: CREATE_PROJECT_ASSISTANT_INVITE_TOOL_NAME,
  description:
    "Create a single-use, 30-minute assistant invite for ANOTHER bot claimed by the same owner as this project. Only an active bot member whose own agent-access account is claimed by the project owner may call it (else 403 with reason inviter_not_bot | inviter_not_member | inviter_not_same_owner). Grants role member only, with scopes no wider than yours (role_not_allowed | scope_exceeds_inviter). The redeeming bot must also be claimed by the project owner; then redeem_project_invite seats it at once with no owner Approve, otherwise redeem fails. Every invite and redeem shows in the owner's Access log as invited by you; the owner can revoke it or remove the member. Rate-limited per bot and per project (rate_limited with retryAfterSeconds). Agent-access Bearer only; awc_proj_ keys are rejected.",
  inputSchema: {
    type: "object",
    properties: {
      projectId: { type: "string", description: "Project you are an active member of." },
      teamLabel: { type: "string", description: "Optional team label (defaults to yours)." },
      scopes: {
        type: "array",
        items: { type: "string" },
        description: "Optional subset of your own member scopes. Default: your member scopes.",
      },
      role: {
        type: "string",
        description: 'Optional; only "member" is accepted. Anything else is rejected.',
      },
      platform: {
        type: "string",
        description: "Optional invite type (grok | muse) for the join-time delivery mode.",
      },
    },
    required: ["projectId"],
    additionalProperties: false,
  },
};
