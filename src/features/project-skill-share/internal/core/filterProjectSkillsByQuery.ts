import {
  startsWithAny,
  tokenizeSkillQuery,
  words,
} from "@/features/project-skill-share/internal/core/skillQueryWords";

const NAME_WEIGHT = 4;
const TAG_WEIGHT = 3;
const DESCRIPTION_WEIGHT = 2;
const SKILL_ID_WEIGHT = 1;
/** A multi-word query must match at least this many distinct words. */
const MIN_MATCHED_WORDS = 2;

export type SearchableSkill = {
  readonly skillId: string;
  readonly name: string;
  readonly description: string | null;
  readonly tags: readonly string[];
  readonly updatedAt: string;
};

type Fields = {
  readonly name: readonly string[];
  readonly tags: readonly string[];
  readonly description: readonly string[];
  readonly skillId: readonly string[];
};

const fieldsOf = (skill: SearchableSkill): Fields => ({
  name: words(skill.name),
  tags: skill.tags.flatMap(words),
  description: words(skill.description ?? ""),
  skillId: words(skill.skillId),
});

const weightOf = (fields: Fields, token: string): number =>
  (startsWithAny(fields.name, token) ? NAME_WEIGHT : 0) +
  (startsWithAny(fields.tags, token) ? TAG_WEIGHT : 0) +
  (startsWithAny(fields.description, token) ? DESCRIPTION_WEIGHT : 0) +
  (startsWithAny(fields.skillId, token) ? SKILL_ID_WEIGHT : 0);

const byNewest = (a: SearchableSkill, b: SearchableSkill): number =>
  String(b.updatedAt).localeCompare(String(a.updatedAt));

/**
 * Skills whose name, tags, description or id start with the query words, best
 * first (ties: newest). A query of two or more words must match two of them,
 * so a vague request returns nothing instead of a weak guess.
 */
export const filterProjectSkillsByQuery = <T extends SearchableSkill>(
  skills: readonly T[],
  query: string,
): readonly T[] => {
  const tokens = tokenizeSkillQuery(query);
  const minMatched = Math.min(MIN_MATCHED_WORDS, tokens.length);
  return skills
    .map((skill) => {
      const fields = fieldsOf(skill);
      const weights = tokens.map((token) => weightOf(fields, token));
      return {
        skill,
        score: weights.reduce((sum, weight) => sum + weight, 0),
        matched: weights.filter((weight) => weight > 0).length,
      };
    })
    .filter((row) => row.matched >= Math.max(minMatched, 1))
    .sort((a, b) => b.score - a.score || byNewest(a.skill, b.skill))
    .map((row) => row.skill);
};

export const sortProjectSkillsNewestFirst = <T extends SearchableSkill>(
  skills: readonly T[],
): readonly T[] => [...skills].sort(byNewest);

const nameKey = (name: string): string => words(name).join("-");

/**
 * Keep the first (best or newest) row per normalized name, so near-duplicate
 * saves of one skill (`name`, `name-e4d6`) take one result slot, not several.
 */
export const collapseSameNameSkills = <T extends SearchableSkill>(
  skills: readonly T[],
): readonly T[] => {
  const seen = new Set<string>();
  return skills.filter((skill) => {
    const key = nameKey(skill.name);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

export { tokenizeSkillQuery };
