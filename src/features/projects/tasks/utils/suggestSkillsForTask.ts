import type { ProjectSkillView } from "@/features/project-skill-share/public-api/types";

const MAX_SUGGESTIONS = 3;
const MIN_TOKEN_LENGTH = 3;
const MIN_PROMPT_LENGTH = 12;
/** One shared name word, or two shared words anywhere, is enough. */
const MIN_SCORE = 2;
const NAME_WEIGHT = 2;

const STOPWORDS: ReadonlySet<string> = new Set([
  "the",
  "and",
  "for",
  "with",
  "from",
  "into",
  "that",
  "this",
  "then",
  "all",
  "use",
  "make",
  "add",
  "new",
  "file",
  "files",
  "task",
  "please",
]);

const tokenize = (text: string): ReadonlySet<string> =>
  new Set(
    text
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length >= MIN_TOKEN_LENGTH && !STOPWORDS.has(t)),
  );

const overlap = (a: ReadonlySet<string>, b: ReadonlySet<string>): number =>
  [...a].filter((t) => b.has(t)).length;

/**
 * Published skills that fit a task prompt, best first (at most 3). Word
 * overlap of the prompt with the skill name (counts double), its id and its
 * description; nothing is returned for short prompts or weak matches.
 */
export const suggestSkillsForTask = (
  prompt: string,
  skills: readonly ProjectSkillView[],
): readonly ProjectSkillView[] => {
  if (prompt.trim().length < MIN_PROMPT_LENGTH) {
    return [];
  }
  const promptTokens = tokenize(prompt);
  return skills
    .filter((s) => s.kind === "skill" && s.state === "published")
    .map((skill) => ({
      skill,
      score:
        NAME_WEIGHT *
          overlap(promptTokens, tokenize(`${skill.name} ${skill.skillId}`)) +
        overlap(promptTokens, tokenize(skill.description ?? "")),
    }))
    .filter((row) => row.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_SUGGESTIONS)
    .map((row) => row.skill);
};

/** The line a chip adds to the task prompt; also how "already added" is detected. */
export const buildSkillHintLine = (skill: ProjectSkillView): string =>
  `Use the project skill "${skill.name}" (skillId: ${skill.skillId}) if it fits; load it with the skills_run tool.`;
