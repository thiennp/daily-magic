import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";

const unavailable = (): never => {
  throw new Error("project_skill_history_unavailable");
};

/**
 * Default until AW History ships its helpers: History OFF everywhere, so AWC
 * (always the store of record) is the only copy and nothing is mirrored.
 */
export const PROJECT_SKILL_HISTORY_STUB_PORT: ProjectSkillHistoryPort = {
  isHistoryEnabled: () => false,
  resolveProjectDataDir: unavailable,
  writeProjectSkillVersion: unavailable,
  readProjectSkillVersion: unavailable,
};
