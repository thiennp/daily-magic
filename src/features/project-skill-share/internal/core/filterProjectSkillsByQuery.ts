import {
  scoreProjectSkills,
  type SearchableSkill,
} from "@/features/project-skill-share/internal/core/scoreProjectSkills";
import {
  tokenizeSkillQuery,
  words,
} from "@/features/project-skill-share/internal/core/skillQueryWords";

export type { SearchableSkill };
export { tokenizeSkillQuery };

/** A multi-word query must match this many words (or one rare name/tag word). */
const MIN_MATCHED_WORDS = 2;
/** Drop results scoring below this share of the best one. */
const MIN_SHARE_OF_TOP = 0.4;

const byNewest = (a: SearchableSkill, b: SearchableSkill): number =>
  String(b.updatedAt).localeCompare(String(a.updatedAt));

/**
 * Skills whose name, tags, description or id start with the query words, best
 * first (ties: newest). Rare words weigh more than common ones. A multi-word
 * query needs two matched words or one rare word in the name or a tag, so a
 * vague request returns nothing; weak tails below 40% of the top are cut.
 */
export const filterProjectSkillsByQuery = <T extends SearchableSkill>(
  skills: readonly T[],
  query: string,
): readonly T[] => {
  const tokens = tokenizeSkillQuery(query);
  const accepted = scoreProjectSkills(skills, tokens)
    .filter((row) =>
      tokens.length < MIN_MATCHED_WORDS
        ? row.matched >= 1
        : row.matched >= MIN_MATCHED_WORDS || row.rareStrong >= 1,
    )
    .sort((a, b) => b.score - a.score || byNewest(a.skill, b.skill));
  const top = accepted[0]?.score ?? 0;
  return accepted
    .filter((row) => row.score >= top * MIN_SHARE_OF_TOP)
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
