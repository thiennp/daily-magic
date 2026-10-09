import {
  startsWithAny,
  words,
} from "@/features/project-skill-share/internal/core/skillQueryWords";

const NAME_WEIGHT = 4;
const TAG_WEIGHT = 3;
const DESCRIPTION_WEIGHT = 2;
const SKILL_ID_WEIGHT = 1;
/** A word in at most this share of the library (and at least 2 skills) is rare. */
const RARE_SHARE = 0.25;
const RARE_MIN_SKILLS = 2;

export type SearchableSkill = {
  readonly skillId: string;
  readonly name: string;
  readonly description: string | null;
  readonly tags: readonly string[];
  readonly updatedAt: string;
};

export type ScoredSkill<T> = {
  readonly skill: T;
  /** Field weights times how rare each matched word is in this library. */
  readonly score: number;
  readonly matched: number;
  /** Words that are rare in the library and hit the name or a tag. */
  readonly rareStrong: number;
};

type Fields = Record<"name" | "tags" | "description" | "skillId", string[]>;

const fieldsOf = (skill: SearchableSkill): Fields => ({
  name: [...words(skill.name)],
  tags: skill.tags.flatMap(words),
  description: [...words(skill.description ?? "")],
  skillId: [...words(skill.skillId)],
});

const weightOf = (fields: Fields, token: string): number =>
  (startsWithAny(fields.name, token) ? NAME_WEIGHT : 0) +
  (startsWithAny(fields.tags, token) ? TAG_WEIGHT : 0) +
  (startsWithAny(fields.description, token) ? DESCRIPTION_WEIGHT : 0) +
  (startsWithAny(fields.skillId, token) ? SKILL_ID_WEIGHT : 0);

const isStrong = (fields: Fields, token: string): boolean =>
  startsWithAny(fields.name, token) || startsWithAny(fields.tags, token);

/**
 * Score every skill for the query words. A word found in few skills counts
 * more (ln(1 + N / df)), so "project chat" cannot outrank a rare "bot".
 */
export const scoreProjectSkills = <T extends SearchableSkill>(
  skills: readonly T[],
  tokens: readonly string[],
): readonly ScoredSkill<T>[] => {
  const rows = skills.map((skill) => ({ skill, fields: fieldsOf(skill) }));
  const stats = tokens.map((token) => {
    const df = rows.filter((row) => weightOf(row.fields, token) > 0).length;
    return {
      token,
      idf: df === 0 ? 0 : Math.log(1 + rows.length / df),
      rare: df <= Math.max(RARE_MIN_SKILLS, RARE_SHARE * rows.length),
    };
  });
  return rows.map(({ skill, fields }) => {
    const hits = stats.map((stat) => ({
      weight: weightOf(fields, stat.token),
      stat,
    }));
    return {
      skill,
      score: hits.reduce((sum, hit) => sum + hit.weight * hit.stat.idf, 0),
      matched: hits.filter((hit) => hit.weight > 0).length,
      rareStrong: hits.filter(
        (hit) =>
          hit.weight > 0 && hit.stat.rare && isStrong(fields, hit.stat.token),
      ).length,
    };
  });
};
