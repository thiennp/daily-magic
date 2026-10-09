import type { ProjectSkillView } from "@/features/project-skill-share/internal/core/projectSkill.type";

const WORD = /[a-z0-9]+/g;
const STOPWORDS: ReadonlySet<string> = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "to",
  "of",
  "in",
  "on",
  "for",
  "with",
  "is",
  "it",
  "how",
  "new",
]);

const NAME_WEIGHT = 3;
const DESCRIPTION_WEIGHT = 2;
const SKILL_ID_WEIGHT = 1;

const words = (text: string): readonly string[] =>
  text.toLowerCase().match(WORD) ?? [];

/** Distinct, lowercase query words without stopwords. */
export const tokenizeSkillQuery = (query: string): readonly string[] => [
  ...new Set(words(query).filter((word) => !STOPWORDS.has(word))),
];

const hasWordStartingWith = (
  haystack: readonly string[],
  token: string,
): boolean => haystack.some((word) => word.startsWith(token));

const scoreSkill = (
  skill: ProjectSkillView,
  tokens: readonly string[],
): number => {
  const name = words(skill.name);
  const description = words(skill.description ?? "");
  const skillId = words(skill.skillId);
  return tokens.reduce(
    (sum, token) =>
      sum +
      (hasWordStartingWith(name, token) ? NAME_WEIGHT : 0) +
      (hasWordStartingWith(description, token) ? DESCRIPTION_WEIGHT : 0) +
      (hasWordStartingWith(skillId, token) ? SKILL_ID_WEIGHT : 0),
    0,
  );
};

const byNewest = (a: ProjectSkillView, b: ProjectSkillView): number =>
  String(b.updatedAt).localeCompare(String(a.updatedAt));

/** Skills whose name, description or id start with a query word, best first. */
export const filterProjectSkillsByQuery = (
  skills: readonly ProjectSkillView[],
  query: string,
): readonly ProjectSkillView[] => {
  const tokens = tokenizeSkillQuery(query);
  return skills
    .map((skill) => ({ skill, score: scoreSkill(skill, tokens) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || byNewest(a.skill, b.skill))
    .map((row) => row.skill);
};

export const sortProjectSkillsNewestFirst = (
  skills: readonly ProjectSkillView[],
): readonly ProjectSkillView[] => [...skills].sort(byNewest);
