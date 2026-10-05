import type { ProjectSkillAwcPublishedSource } from "./projectSkillAwcPublishedSource.type";
import type { ProjectSkillPublishedMeta } from "./projectSkillPull.type";

export type ListPublishedProjectSkillsForPullResult =
  | {
      readonly ok: true;
      readonly published: readonly ProjectSkillPublishedMeta[];
    }
  | { readonly ok: false };

/**
 * listPublished for pull. Throw / reject / non-array → `{ ok: false }` so the
 * orchestrator early-returns with zero History disk helper calls.
 * `{ ok: true, published: [] }` ONLY when the source resolved a real `[]`.
 * Errors are never coerced to an empty set (that would tombstone all locals).
 */
export const listPublishedProjectSkillsForPull = async (input: {
  readonly awc: ProjectSkillAwcPublishedSource;
  readonly projectId: string;
}): Promise<ListPublishedProjectSkillsForPullResult> => {
  try {
    const published: unknown = await input.awc.listPublished(input.projectId);
    if (!Array.isArray(published)) {
      return { ok: false };
    }
    return {
      ok: true,
      published: published as readonly ProjectSkillPublishedMeta[],
    };
  } catch {
    return { ok: false };
  }
};
