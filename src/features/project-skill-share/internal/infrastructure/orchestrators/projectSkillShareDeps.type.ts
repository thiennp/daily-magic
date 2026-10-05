import type { ProjectSkillAwcPublishedSource } from "@/features/project-skill-share/internal/infrastructure/awc/projectSkillAwcPublishedSource.type";
import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";

/** Injected by callers; default History port is the OFF stub; AWC source defaults to Neon. */
export interface ProjectSkillShareDeps {
  readonly history?: ProjectSkillHistoryPort;
  readonly awcPublished?: ProjectSkillAwcPublishedSource;
}
