import type { ProjectSkillShareErrorCode } from "@/features/project-skill-share/internal/core/projectSkill.type";

/** HTTP status for session routes (UI). MCP returns the code in the tool body. */
export const mapProjectSkillShareErrorStatus = (
  code: ProjectSkillShareErrorCode,
): number => {
  if (code === "forbidden") return 403;
  if (code === "not_found") return 404;
  if (code === "version_conflict") return 409;
  if (code === "body_too_large") return 413;
  return 400;
};
