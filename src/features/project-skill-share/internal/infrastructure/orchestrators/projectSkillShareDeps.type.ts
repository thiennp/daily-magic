import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";

/** Injected by callers; default History port is the OFF stub. */
export interface ProjectSkillShareDeps {
  readonly history?: ProjectSkillHistoryPort;
}
