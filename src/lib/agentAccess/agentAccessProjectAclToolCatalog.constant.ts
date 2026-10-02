import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";
import { AGENT_ACCESS_PROJECT_INVITE_HOOKS_TOOLS } from "@/lib/agentAccess/agentAccessProjectInviteHooksToolCatalog.constant";

const AGENT_ACCESS_PROJECT_ACL_CORE_TOOLS: readonly AgentAccessToolDefinition[] =
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
            description: "Opaque invite token (path after /invite/p/). Full invite URL also accepted.",
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
        "Read project name, folder refs, repoUrls, defaultBranch, your scopes, and peers/self roster (owner included for members). Denied if not owner or active member. No content.",
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
      name: "leave_project",
      description:
        "Leave this project (self-disconnect). No owner approval. Irreversible until you request access again and owner Approves. Requires confirm:true.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: { type: "string", description: "Project id to leave." },
          confirm: {
            type: "boolean",
            description: "Must be true to confirm self-disconnect.",
          },
        },
        required: ["projectId", "confirm"],
        additionalProperties: false,
      },
    },
  ] as const;

export const AGENT_ACCESS_PROJECT_ACL_TOOLS: readonly AgentAccessToolDefinition[] =
  [
    ...AGENT_ACCESS_PROJECT_ACL_CORE_TOOLS,
    ...AGENT_ACCESS_PROJECT_INVITE_HOOKS_TOOLS,
  ];
