import type { ProjectSkillView } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { isProjectSkillViewPayload } from "@/features/project-skill-share/internal/presentation/utils/isProjectSkillViewPayload.guardz";
import type { FetchProjectSkillsResult } from "@/features/project-skill-share/internal/presentation/utils/projectSkillsRequest.type";
import { readProjectSkillsJson } from "@/features/project-skill-share/internal/presentation/utils/readProjectSkillsJson";

/** GET /api/projects/:projectId/skills (owner or active member). */
export const fetchProjectSkills = async (
  projectId: string,
): Promise<FetchProjectSkillsResult> => {
  const response = await fetch(
    `/api/projects/${encodeURIComponent(projectId)}/skills`,
    { cache: "no-store" },
  ).catch(() => null);
  const body = await readProjectSkillsJson(response);
  if (response === null || body === null || body.ok !== true) {
    return {
      ok: false,
      forbidden: response?.status === 403 || response?.status === 404,
      errorMessage:
        typeof body?.errorMessage === "string"
          ? body.errorMessage
          : "Could not load skills.",
    };
  }
  const raw = Array.isArray(body.skills) ? body.skills : [];
  return {
    ok: true,
    skills: raw.filter((row: unknown): row is ProjectSkillView =>
      isProjectSkillViewPayload(row),
    ),
  };
};
