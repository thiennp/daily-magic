import type {
  ProjectSkillPublishedBody,
  ProjectSkillPublishedMeta,
} from "@/features/project-skill-share/internal/core/projectSkillPull.type";

/**
 * AWC store-of-record reads for the Mac pull mirror.
 * History/AWL injects HTTP; same-process default uses Neon (createDb…).
 */
export interface ProjectSkillAwcPublishedSource {
  /**
   * Resolves to the **complete** published set for `projectId`.
   *
   * Errors MUST reject/throw — HTTP 401/403/404/5xx, empty or malformed
   * body, network/timeout, DB error, corrupt published row. Resolve `[]`
   * ONLY for a real, successfully fetched empty published set.
   *
   * Never coerce a failure to `[]`: pull treats every local skill absent
   * from the resolved set as revoked and tombstones it.
   */
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
