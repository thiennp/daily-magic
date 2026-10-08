import { deleteSkillRow, upsertSkillRow } from "./skillIndexDb";
import type {
  SkillDescriptor,
  SkillEmbedder,
  SkillIndexDb,
} from "./skillIndex.types";

export const buildSkillIndexText = (skill: SkillDescriptor): string =>
  [skill.name, skill.description, skill.whenToUse, skill.keywords]
    .filter((part) => part.trim().length > 0)
    .join("\n");

/**
 * Embed `name + description + when_to_use + keywords` and upsert the row.
 * Without an embedder (or when Ollama is down) the row is keyword-only.
 */
export const indexSkill = async (
  db: SkillIndexDb,
  skill: SkillDescriptor,
  embed?: SkillEmbedder,
  options?: { readonly requireVector?: boolean },
): Promise<{ readonly embedded: boolean; readonly wrote: boolean }> => {
  let vector: Float32Array | null = null;
  if (embed !== undefined) {
    try {
      vector = await embed(buildSkillIndexText(skill));
    } catch {
      vector = null;
    }
  }
  if (vector === null && options?.requireVector === true) {
    return { embedded: false, wrote: false };
  }
  upsertSkillRow(db, skill, vector);
  return { embedded: vector !== null, wrote: true };
};

export const removeSkill = (
  db: SkillIndexDb,
  projectId: string,
  skillId: string,
): void => deleteSkillRow(db, projectId, skillId);
