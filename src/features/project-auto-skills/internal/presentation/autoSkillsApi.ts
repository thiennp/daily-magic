import type {
  AutoSkillAnswer,
  AutoSkillsOverview,
  SkillCheckAnswer,
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

/** Owner: ask the owner's online computers to scan past tasks now. */
export const postAutoSkillScan = async (
  projectId: string,
  options: { readonly docs?: boolean; readonly commits?: number } = {},
): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> => {
  try {
    const response = await fetch(`${autoSkillsUrl(projectId)}/scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(options.docs === true ? { docs: true } : {}),
        ...(options.commits !== undefined ? { commits: options.commits } : {}),
      }),
    });
    if (response.ok) {
      return { ok: true };
    }
    const body = (await response.json().catch(() => ({}))) as {
      errorMessage?: unknown;
    };
    return {
      ok: false,
      errorMessage:
        typeof body.errorMessage === "string"
          ? body.errorMessage
          : "Could not start the scan.",
    };
  } catch {
    return { ok: false, errorMessage: "Could not start the scan." };
  }
};

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
