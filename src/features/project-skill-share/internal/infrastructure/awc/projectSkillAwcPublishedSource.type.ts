import type {
  ProjectSkillPublishedBody,
  ProjectSkillPublishedMeta,
} from "@/features/project-skill-share/internal/core/projectSkillPull.type";

/**
 * AWC store-of-record reads for the Mac pull mirror.
 * History/AWL injects HTTP; same-process default uses Neon (createDb…).
 */
export interface ProjectSkillAwcPublishedSource {
  readonly listPublished: (
    projectId: string,
  ) => Promise<readonly ProjectSkillPublishedMeta[]>;
  readonly getPublishedBody: (input: {
    readonly projectId: string;
    readonly skillId: string;
    readonly version: number;
    readonly skillRowId?: string;
  }) => Promise<ProjectSkillPublishedBody | null>;
}
