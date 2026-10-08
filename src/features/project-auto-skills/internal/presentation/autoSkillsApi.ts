import type {
  AutoSkillAnswer,
  AutoSkillsOverview,
} from "@/features/project-auto-skills/internal/core/projectAutoSkills.type";

export const autoSkillsUrl = (projectId: string): string =>
  `/api/projects/${encodeURIComponent(projectId)}/auto-skills`;

/** Owner-only overview; null for non-owners and on any failure. */
export const fetchAutoSkillsOverview = async (
  projectId: string,
  signal?: AbortSignal,
): Promise<AutoSkillsOverview | null> => {
  const response = await fetch(autoSkillsUrl(projectId), {
    ...(signal !== undefined ? { signal } : {}),
    cache: "no-store",
  });
  if (!response.ok) {
    return null;
  }
  const body = (await response.json()) as { overview?: AutoSkillsOverview };
  return body.overview ?? null;
};

/** The one answer endpoint shared by every surface. */
export const postAutoSkillAnswer = async (
  projectId: string,
  suggestionId: string,
  answer: AutoSkillAnswer,
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${autoSkillsUrl(projectId)}/suggestions/${encodeURIComponent(suggestionId)}`,
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
