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
        "Send a thin metadata message to a peer by toProjectDisplayName (primary) or toTeamLabel. No broadcast in v1. summary ≤512 chars; allowlisted refs only.",
      inputSchema: {
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
      description: "Acknowledge a project inbox message by messageId.",
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
