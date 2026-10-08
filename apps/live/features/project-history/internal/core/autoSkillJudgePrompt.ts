import type {
  AutoSkillCandidate,
  AutoSkillVerdict,
  AutoSkillVerdictKind,
} from "./autoSkill.types";

const PROMPT_CAP = 600;

export const buildAutoSkillJudgePrompt = (input: {
  readonly newPrompt: string;
  readonly candidates: readonly AutoSkillCandidate[];
}): string =>
  [
    "You compare coding-task requests. For each earlier request decide if it is",
    "the same kind of task as the NEW request.",
    "SAME = equivalent task. SIMILAR = same procedure with different details.",
    "DIFFERENT = a different kind of task.",
    'Answer ONLY strict JSON: {"verdicts":[{"id":"<id>","verdict":"SAME|SIMILAR|DIFFERENT","reason":"<max 12 words>","cluster":"<short-kebab-name of the task kind>"}]}',
    "",
    `NEW: ${input.newPrompt.slice(0, PROMPT_CAP)}`,
    ...input.candidates.map(
      (c) => `EARLIER id=${c.id}: ${c.prompt.slice(0, PROMPT_CAP)}`,
    ),
  ].join("\n");

const KINDS: readonly AutoSkillVerdictKind[] = ["SAME", "SIMILAR", "DIFFERENT"];

const slug = (raw: string): string =>
  raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

const toVerdict = (row: unknown): AutoSkillVerdict | null => {
  if (typeof row !== "object" || row === null) {
    return null;
  }
  const r = row as Record<string, unknown>;
  const verdict = String(r.verdict ?? "").toUpperCase();
  if (
    typeof r.id !== "string" ||
    !KINDS.includes(verdict as AutoSkillVerdictKind)
  ) {
    return null;
  }
  return {
    candidateId: r.id,
    verdict: verdict as AutoSkillVerdictKind,
    reason: String(r.reason ?? "").slice(0, 140),
    clusterId: slug(String(r.cluster ?? "")),
  };
};

/** Strict parse: first JSON object in the text; null when unusable. */
export const parseAutoSkillJudgeVerdicts = (
  text: string,
): readonly AutoSkillVerdict[] | null => {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(text.slice(start, end + 1));
    const rows = (parsed as { verdicts?: unknown }).verdicts;
    if (!Array.isArray(rows)) {
      return null;
    }
    const verdicts = rows
      .map(toVerdict)
      .filter((v): v is AutoSkillVerdict => v !== null);
    return verdicts.length > 0 ? verdicts : null;
  } catch {
    return null;
  }
};
