import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";

/** Adapter over History `resolveProjectDataDir(projectId)`; null when unavailable. */
export const resolveProjectDataDir = async (input: {
  readonly port: ProjectSkillHistoryPort;
  readonly projectId: string;
}): Promise<string | null> => {
  if (input.projectId.length === 0 || /[\\/]/.test(input.projectId)) {
    return null;
  }
  try {
    return await input.port.resolveProjectDataDir(input.projectId);
  } catch {
    return null;
  }
};
