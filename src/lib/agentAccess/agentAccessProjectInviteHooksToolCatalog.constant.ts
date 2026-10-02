import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const AGENT_ACCESS_PROJECT_INVITE_HOOKS_TOOLS: readonly AgentAccessToolDefinition[] =
  [
    {
      name: "register_project_webhook",
      description:
        "Register an https webhook for this project membership. AWC generates the HMAC secret (returned once). Client-supplied secrets are rejected.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "string" },
          webhookUrl: { type: "string", description: "https URL only." },
        },
        required: ["projectId", "webhookUrl"],
        additionalProperties: false,
      },
    },
    {
      name: "project_dispatch",
      description:
        "Send thin protocol metadata by toProjectDisplayName (primary) or toTeamLabel. Address the human with toProjectDisplayName: \"Owner\" (reserved). No broadcast/media/blobs/bodies. summary ≤200 chars; allowlisted refs (prUrl|commitSha|localPath|allowClaimId) only; bulky payloads via P2P/localPath. Rate 60/day.",      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "string" },
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
    {
      name: "list_project_inbox",
      description: "List thin project messages addressed to you (poll path).",
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
      description: "Ack a project inbox message by messageId (hard-deletes the row + deliveries).",
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
        "List self + active peers (members and owner): projectDisplayName, teamLabel, isAgent, isOwner. Requires active membership. No UUID required for bot UX.",
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
        "Active-member onboard briefing: project name, your display name/teamLabel, peers (display names only), how to project_dispatch, and bound playbook harness slugs. Call once after Approve.",
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
