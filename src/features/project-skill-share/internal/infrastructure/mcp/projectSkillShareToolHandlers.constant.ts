import type { ProjectSkillFailure } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { getProjectSkill } from "@/features/project-skill-share/internal/infrastructure/orchestrators/getProjectSkill";
import { listProjectSkillsTool } from "@/features/project-skill-share/internal/infrastructure/orchestrators/listProjectSkillsTool";
import { publishProjectSkill } from "@/features/project-skill-share/internal/infrastructure/orchestrators/publishProjectSkill";
import { revokeProjectSkill } from "@/features/project-skill-share/internal/infrastructure/orchestrators/revokeProjectSkill";

type ProjectSkillToolHandler = (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}) => Promise<{ readonly ok: true } | ProjectSkillFailure>;

/** MCP tool name → orchestrator (catalog: src/lib/agentAccess/agentAccessProjectSkillShareToolCatalog.constant.ts). */
export const PROJECT_SKILL_SHARE_TOOL_HANDLERS: ReadonlyMap<
  string,
  ProjectSkillToolHandler
> = new Map<string, ProjectSkillToolHandler>([
  ["publish_project_skill", publishProjectSkill],
  ["list_project_skills", listProjectSkillsTool],
  ["get_project_skill", getProjectSkill],
  ["revoke_project_skill", revokeProjectSkill],
]);
