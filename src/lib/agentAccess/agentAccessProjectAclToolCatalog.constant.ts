import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const AGENT_ACCESS_PROJECT_ACL_TOOLS: readonly AgentAccessToolDefinition[] =
  [
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
  ] as const;
