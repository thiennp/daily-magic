import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const AGENT_ACCESS_PROJECT_ACL_TOOLS: readonly AgentAccessToolDefinition[] =
  [
    {
      name: "redeem_project_invite",
      description:
        "Redeem a project invite token. Creates a pending access request; owner must Approve and set project display name before messaging scopes / scoped key. Pre-registered agent only. No redirect_uri.",
      inputSchema: {
        type: "object",
        properties: {
          token: {
            type: "string",
            description: "Opaque invite token from the invite URL.",
          },
        },
        required: ["token"],
        additionalProperties: false,
      },
    },
    {
      name: "request_project_access",
      description:
        "Request membership on an Agent Witch project. Owner Approves in the UI. AWC stores ACL only — no project content.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "string", description: "Project id to join." },
          reason: {
            type: "string",
            description: "Optional short non-content reason (max 200 chars).",
          },
          teamLabel: {
            type: "string",
            description: "Optional team label for the owner UI.",
          },
        },
        required: ["projectId"],
        additionalProperties: false,
      },
    },
    {
      name: "get_my_project_access",
      description:
        "Return your membership status for a project: none | pending | active | revoked | owner.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "string" },
        },
        required: ["projectId"],
        additionalProperties: false,
      },
    },
    {
      name: "list_projects",
      description:
        "List projects you own or are an active member of. Returns id + name only.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
    },
    {
      name: "get_project_acl",
      description:
        "Read project name, folder refs, repoUrls, defaultBranch, and your scopes. Denied if not owner or active member. No content.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "string" },
        },
        required: ["projectId"],
        additionalProperties: false,
      },
    },
    {
      name: "check_membership",
      description:
        "Check whether you (or a subject user id) currently pass project ACL. Revoke-aware.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "string" },
          userId: {
            type: "string",
            description: "Optional; defaults to the bearer account.",
          },
        },
        required: ["projectId"],
        additionalProperties: false,
      },
    },

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
        "List active peers: projectDisplayName, teamLabel, isAgent. No UUID required for bot UX.",
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
