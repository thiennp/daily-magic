import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";
import { AGENT_ACCESS_PROJECT_INVITE_HOOKS_TOOLS } from "@/lib/agentAccess/agentAccessProjectInviteHooksToolCatalog.constant";
import { AGENT_ACCESS_PROJECT_SKILL_SHARE_TOOLS } from "@/lib/agentAccess/agentAccessProjectSkillShareToolCatalog.constant";
import { AGENT_ACCESS_PROJECT_LEAVE_TOOL } from "@/lib/agentAccess/agentAccessProjectLeaveTool.constant";
import { AGENT_ACCESS_REDEEM_PROJECT_INVITE_TOOL } from "@/lib/agentAccess/agentAccessRedeemProjectInviteTool.constant";

const AGENT_ACCESS_PROJECT_ACL_CORE_TOOLS: readonly AgentAccessToolDefinition[] =
  [
    AGENT_ACCESS_REDEEM_PROJECT_INVITE_TOOL,
    {
      name: "request_project_access",
      description:
        "Request membership on an Agent Witch project. May return status active when same-owner linked; otherwise pending until owner Approves in the UI. After request MUST call get_my_project_access. AWC stores ACL only — no project content, except published project skills (publish_project_skill, text ≤ 64KB per version).",
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
          suggestedProjectDisplayName: {
            type: "string",
            description:
              "Optional nickname (required for same-owner auto-approve of agent bots).",
          },
        },
        required: ["projectId"],
        additionalProperties: false,
      },
    },
    {
      name: "get_my_project_access",
      description:
        "Return your membership status for a project: none | pending | active | revoked | owner. When active|owner, includes onboard briefing once (same shape as get_project_briefing).",
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
  ] as const;

export const AGENT_ACCESS_PROJECT_ACL_TOOLS: readonly AgentAccessToolDefinition[] =
  [
    ...AGENT_ACCESS_PROJECT_ACL_CORE_TOOLS,
    AGENT_ACCESS_PROJECT_LEAVE_TOOL,
    ...AGENT_ACCESS_PROJECT_INVITE_HOOKS_TOOLS,
    ...AGENT_ACCESS_PROJECT_SKILL_SHARE_TOOLS,
  ];
