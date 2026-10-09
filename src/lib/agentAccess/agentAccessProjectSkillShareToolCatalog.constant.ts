import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

const projectIdProp = { type: "string" } as const;
const skillIdProp = {
  type: "string",
  description: "Lowercase slug (a-z 0-9 _ -), ≤ 64 chars, never _-prefixed.",
} as const;
const kindProp = {
  type: "string",
  enum: ["skill", "playbook"],
  description:
    'Item kind: "skill" (default) or "playbook" (how the team works). Same lifecycle, ACL and limits.',
} as const;

/** Executed by src/features/project-skill-share (injected in the MCP + invoke routes). */
export const AGENT_ACCESS_PROJECT_SKILL_SHARE_TOOLS: readonly AgentAccessToolDefinition[] =
  [
    {
      name: "publish_project_skill",
      description:
        "Save or publish a project skill or playbook (kind: skill by default, or playbook). Owner: publish, save drafts, and publish without body to promote the latest draft. Active member: publish or save drafts for a new skill or one they published; on someone else's skill, asDraft: true with a body only (a new draft version; the live version is never changed). Viewer: no writes. Text body ≤ 64KB per version; AWC keeps the last 20 versions. New skill: pass name (skillId optional, derived from name).",
      inputSchema: {
        type: "object",
        properties: {
          projectId: projectIdProp,
          skillId: skillIdProp,
          name: { type: "string", description: "Display name (≤ 120 chars)." },
          description: { type: "string", description: "≤ 500 chars." },
          body: { type: "string", description: "Skill text, ≤ 64KB UTF-8." },
          asDraft: { type: "boolean" },
          kind: kindProp,
        },
        required: ["projectId"],
        additionalProperties: false,
      },
    },
    {
      name: "list_project_skills",
      description:
        "List project skills and playbooks (meta + kind + contentHash, no body); pass kind to filter. Pass query (a short description of your task) to get only the best matches, newest first on ties (default 5, max 20 via limit) plus total; without query or limit the whole library is returned, which costs tokens. Owner and members see published skills and all drafts (with latestAuthorName); viewers see published only. Requires ownership, active membership, or viewer access.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: projectIdProp,
          kind: kindProp,
          query: {
            type: "string",
            description:
              "Short task description; returns the best matching skills only.",
          },
          limit: {
            type: "number",
            description:
              "Max rows when query or limit is set (default 5, max 20).",
          },
        },
        required: ["projectId"],
        additionalProperties: false,
      },
    },
    {
      name: "get_project_skill",
      description:
        "Get one project skill with body. Default = published version; version picks an older kept version. Drafts for owner and members.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: projectIdProp,
          skillId: skillIdProp,
          version: { type: "number" },
        },
        required: ["projectId", "skillId"],
        additionalProperties: false,
      },
    },
    {
      name: "revoke_project_skill",
      description:
        "Revoke a project skill (project owner, or the member who published it). Members stop seeing it; versions stay so it can be republished.",
      inputSchema: {
        type: "object",
        properties: { projectId: projectIdProp, skillId: skillIdProp },
        required: ["projectId", "skillId"],
        additionalProperties: false,
      },
    },
  ] as const;
