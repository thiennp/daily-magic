import type { AutoSkillCandidate, AutoSkillRunRecord } from "./autoSkill.types";

const HARNESS_SUFFIX_RE = /\n---\n[\s\S]*$/;
const PREFILTER_MAX = 5;
const PREFILTER_MIN_SCORE = 0.12;

/** Drop the injected harness suffix and punctuation noise. */
export const normalizeAutoSkillPrompt = (prompt: string): string =>
  prompt
    .replace(HARNESS_SUFFIX_RE, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s/._-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokensOf = (prompt: string): ReadonlySet<string> =>
  new Set(
    normalizeAutoSkillPrompt(prompt)
      .split(" ")
      .filter((token) => token.length > 2),
  );

/** Jaccard overlap of word tokens, 0..1. */
export const scoreAutoSkillPromptSimilarity = (
  left: string,
  right: string,
): number => {
  const a = tokensOf(left);
  const b = tokensOf(right);
  if (a.size === 0 || b.size === 0) {
    return 0;
  }
  const shared = [...a].filter((token) => b.has(token)).length;
  return shared / (a.size + b.size - shared);
};

export const isExactAutoSkillRepeat = (
  left: string,
  right: string,
): boolean => {
  const normalized = normalizeAutoSkillPrompt(left);
  return (
    normalized.length > 0 && normalized === normalizeAutoSkillPrompt(right)
  );
};

/** Cheap local prefilter: only limits how many candidates reach the judge. */
/** Redacted runs hold only a preview: compare against the same-length head. */
const comparable = (newPrompt: string, run: AutoSkillRunRecord): string =>
  run.redacted === true ? newPrompt.slice(0, run.prompt.length) : newPrompt;

export const prefilterAutoSkillCandidates = (
  newPrompt: string,
  earlier: readonly AutoSkillRunRecord[],
): readonly AutoSkillCandidate[] =>
  earlier
    .map((run) => ({
      id: run.runId,
      prompt: run.prompt,
      score: scoreAutoSkillPromptSimilarity(
        comparable(newPrompt, run),
        run.prompt,
      ),
    }))
    .filter((row) => row.score >= PREFILTER_MIN_SCORE)
    .sort((x, y) => y.score - x.score)
    .slice(0, PREFILTER_MAX)
    .map(({ id, prompt }) => ({ id, prompt }));
