import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

const projectIdProp = { type: "string" } as const;
const skillIdProp = {
  type: "string",
  description: "Lowercase slug (a-z 0-9 _ -), ≤ 64 chars, never _-prefixed.",
} as const;

/** Executed by src/features/project-skill-share (injected in the MCP + invoke routes). */
export const AGENT_ACCESS_PROJECT_SKILL_SHARE_TOOLS: readonly AgentAccessToolDefinition[] =
  [
    {
      name: "publish_project_skill",
      description:
        "Publish a project playbook/skill (owner or active member). Text body ≤ 64KB per version; AWC keeps the last 20 versions (oldest dropped). New skill: pass name (skillId optional, derived from name). Existing skill: publisher or owner only. asDraft: true saves a draft only you and the owner see; publish without body promotes the latest draft.",
      inputSchema: {
        type: "object",
        properties: {
          projectId: projectIdProp,
          skillId: skillIdProp,
          name: { type: "string", description: "Display name (≤ 120 chars)." },
          description: { type: "string", description: "≤ 500 chars." },
          body: { type: "string", description: "Skill text, ≤ 64KB UTF-8." },
          asDraft: { type: "boolean" },
        },
        required: ["projectId"],
        additionalProperties: false,
      },
    },
    {
      name: "list_project_skills",
      description:
        "List project skills (meta + contentHash, no body). Active members see published skills; your own drafts (and all drafts for the owner) are included. Requires active membership or ownership.",
      inputSchema: {
        type: "object",
        properties: { projectId: projectIdProp },
        required: ["projectId"],
        additionalProperties: false,
      },
    },
    {
      name: "get_project_skill",
      description:
        "Get one project skill with body. Default = published version; version picks an older kept version. Drafts only for publisher/owner.",
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
        "Revoke a project skill (publisher or owner). Members stop seeing it; versions stay so it can be republished.",
      inputSchema: {
        type: "object",
        properties: { projectId: projectIdProp, skillId: skillIdProp },
        required: ["projectId", "skillId"],
        additionalProperties: false,
      },
    },
  ] as const;
