import type { ProjectSkillPublishedMeta } from "@/features/project-skill-share/internal/core/projectSkillPull.type";
import type { ProjectSkillAwcPublishedSource } from "@/features/project-skill-share/internal/infrastructure/awc/projectSkillAwcPublishedSource.type";

export type ListPublishedProjectSkillsForPullResult =
  | {
      readonly ok: true;
      readonly published: readonly ProjectSkillPublishedMeta[];
    }
  | { readonly ok: false };

/**
 * listPublished for pull. Fail / throw / non-ok → `{ ok: false }` so the
 * orchestrator can early-return with zero History disk helper calls.
 */
export const listPublishedProjectSkillsForPull = async (input: {
  readonly awc: ProjectSkillAwcPublishedSource;
  readonly projectId: string;
}): Promise<ListPublishedProjectSkillsForPullResult> => {
  try {
    const published = await input.awc.listPublished(input.projectId);
    return { ok: true, published };
  } catch {
    return { ok: false };
  }
};
