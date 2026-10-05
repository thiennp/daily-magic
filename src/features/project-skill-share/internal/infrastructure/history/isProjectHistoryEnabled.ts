import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";

/** History flag via the port; any failure reads as OFF (AWC stays authoritative). */
export const isProjectHistoryEnabled = async (input: {
  readonly port: ProjectSkillHistoryPort;
  readonly projectId: string;
}): Promise<boolean> => {
  try {
    return (await input.port.isHistoryEnabled(input.projectId)) === true;
  } catch {
    return false;
  }
};
