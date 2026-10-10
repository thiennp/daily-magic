import type {
  SkillCheckAnswer,
  SkillComparisonAnswer,
} from "@/features/project-auto-skills/internal/core/projectAutoSkills.type";
import { autoSkillsUrl } from "@/features/project-auto-skills/internal/presentation/autoSkillsApi";

/** Answer a skill check: keep the old version, use the new one, or run both. */
export const postSkillCheckAnswer = async (
  projectId: string,
  checkId: number,
  answer: SkillCheckAnswer,
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${autoSkillsUrl(projectId)}/skill-checks/${checkId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
};

/** Pick the old or the new skill version after the two ran side by side. */
export const postSkillComparisonAnswer = async (
  projectId: string,
  comparisonId: number,
  answer: SkillComparisonAnswer,
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${autoSkillsUrl(projectId)}/skill-comparisons/${comparisonId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
};
