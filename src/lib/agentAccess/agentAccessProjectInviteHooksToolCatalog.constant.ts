import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";
import { GET_MY_PROJECT_WEBHOOK_STATUS_TOOL } from "@/lib/agentAccess/getMyProjectWebhookStatusTool.constant";
import { PROJECT_MESSENGER_REPLY_TOOL } from "@/lib/agentAccess/projectMessengerReplyTool.constant";
import { REGISTER_PROJECT_WEBHOOK_TOOL } from "@/lib/agentAccess/registerProjectWebhookTool.constant";
import { SET_MY_PROJECT_DELIVERY_MODE_TOOL } from "@/lib/agentAccess/setMyProjectDeliveryModeTool.constant";

export const AGENT_ACCESS_PROJECT_INVITE_HOOKS_TOOLS: readonly AgentAccessToolDefinition[] =
  [
    REGISTER_PROJECT_WEBHOOK_TOOL,
    GET_MY_PROJECT_WEBHOOK_STATUS_TOOL,
    SET_MY_PROJECT_DELIVERY_MODE_TOOL,
    {
      name: "project_dispatch",
      description:
        'Send thin protocol metadata. Prefer toMembershipId (UUID from list_project_peers) for peer bots; keep toProjectDisplayName: "Owner" for the human; else toProjectDisplayName / toTeamLabel. Exactly one of toMembershipId | toProjectDisplayName | toTeamLabel. No broadcast/media/blobs/bodies. summary ≤200 chars; allowlisted refs (prUrl|commitSha|localPath|allowClaimId) only; bulky payloads via P2P/localPath. Rate 300/hour + max 300 unread. On rate_limited tell your user and use retryAfterSeconds/retryAfterAt when present.',
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "string" },
          toMembershipId: {
            type: "string",
            description:
              "Preferred stable peer membership UUID from list_project_peers.",
          },
          toProjectDisplayName: { type: "string" },
          toTeamLabel: { type: "string" },
          kind: { type: "string" },
          summary: { type: "string" },
          refs: { type: "object" },
        },
        required: ["projectId", "kind", "summary"],
        additionalProperties: false,
      },
    },
    PROJECT_MESSENGER_REPLY_TOOL,
    {
      name: "list_project_inbox",
      description:
        "List thin project messages addressed to you. In webhook mode, call only after posting task.received from the wake payload. In poll mode (Checks on demand) there is no wake: call when your user asks, at most once a minute. Not a timer. grokWakeResult is your membership's stored wake result (http_<status>, fetch_failed, not_postable) or null.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "string" },
          since: { type: "string" },
          limit: { type: "number" },
        },
        required: ["projectId"],
        additionalProperties: false,
      },
    },
    {
      name: "ack_project_message",
      description:
        "Ack a project inbox message by messageId (hard-deletes the row + deliveries).",
      inputSchema: {
        type: "object",
        properties: { messageId: { type: "string" } },
        required: ["messageId"],
        additionalProperties: false,
      },
    },
    {
      name: "list_project_peers",
      description:
        "List self + active peers (members and owner): membershipId (when present), projectDisplayName, teamLabel, isAgent, isOwner. Prefer toMembershipId for peer dispatch. Requires active membership.",
      inputSchema: {
        type: "object",
        properties: { projectId: { type: "string" } },
        required: ["projectId"],
        additionalProperties: false,
      },
    },
    {
      name: "get_project_briefing",
      description:
        "Active-member onboard briefing: project name, your display name/teamLabel, peers (membershipId when present + display names), how to project_dispatch (prefer toMembershipId for peers), and bound playbook harness slugs. Call once when active.",
      inputSchema: {
        type: "object",
        properties: { projectId: { type: "string" } },
        required: ["projectId"],
        additionalProperties: false,
      },
    },
    {
      name: "rotate_project_api_key",
      description:
        "Rotate your project-scoped API key (awc_proj_). Same scopes; plaintext once.",
      inputSchema: {
        type: "object",
        properties: { projectId: { type: "string" } },
        required: ["projectId"],
        additionalProperties: false,
      },
    },
  ] as const;
