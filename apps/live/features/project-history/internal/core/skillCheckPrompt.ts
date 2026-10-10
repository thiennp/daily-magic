import type { DueSkillCheck } from "./skillCheck.types";

const SKILL_CAP = 20_000;
const FIELD_CAP = 300;

const cap = (text: string | null, max: number): string =>
  (text ?? "").replace(/\s+/g, " ").trim().slice(0, max);

const describeRuns = (check: DueSkillCheck): string =>
  check.runs
    .map((run, i) =>
      [
        `Run ${i + 1}: ${cap(run.title, FIELD_CAP)}`,
        `  Outcome: ${run.outcome}`,
        ...(run.description === null
          ? []
          : [`  Task: ${cap(run.description, FIELD_CAP)}`]),
        ...(run.resultSummary === null
          ? []
          : [`  Result: ${cap(run.resultSummary, FIELD_CAP)}`]),
      ].join("\n"),
    )
    .join("\n");

const describeDeclined = (check: DueSkillCheck): string =>
  (check.declinedNotes ?? []).length === 0
    ? ""
    : `\nThe owner already declined these changes; do not propose them again:\n${(
        check.declinedNotes ?? []
      )
        .map((note) => `- ${cap(note, FIELD_CAP)}`)
        .join("\n")}\n`;

/** Ask whether the skill held up over the runs; strict JSON answer. */
export const buildSkillCheckPrompt = (check: DueSkillCheck): string =>
  `You review a reusable skill after assistants used it.
SKILL "${check.skillName}" (version ${check.skillVersion}):
${check.skillBody.slice(0, SKILL_CAP)}

The skill was used in these finished runs (task titles, outcomes and short summaries only):
${describeRuns(check)}
${describeDeclined(check)}
Decide: "fine" when the skill held up and the failures, if any, are not its fault;
"improve" when a step is missing, wrong or unclear and a better version would help.
Answer ONLY strict JSON: {"verdict":"fine"|"improve","note":"<two sentences: what you saw and, for improve, what to change>"}`;

/** Ask for the full improved skill text. */
export const buildSkillImprovePrompt = (
  check: DueSkillCheck,
  note: string,
): string =>
  `Rewrite this skill so it fixes the problem below. Keep its name, its frontmatter format and what already works. Change only what the problem needs.
Problem: ${note}

CURRENT SKILL:
${check.skillBody.slice(0, SKILL_CAP)}

Answer with the complete improved skill in one \`\`\`markdown fenced block and nothing else.`;

export type SkillCheckVerdict = {
  readonly verdict: "fine" | "improve";
  readonly note: string;
};

/** Strict JSON out of the judge's text; null when it is not a usable verdict. */
export const parseSkillCheckVerdict = (
  text: string,
): SkillCheckVerdict | null => {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) {
    return null;
  }
  try {
    const parsed = JSON.parse(text.slice(start, end + 1)) as {
      verdict?: unknown;
      note?: unknown;
    };
    const note = typeof parsed.note === "string" ? parsed.note.trim() : "";
    return (parsed.verdict === "fine" || parsed.verdict === "improve") &&
      note.length > 0
      ? { verdict: parsed.verdict, note }
      : null;
  } catch {
    return null;
  }
};
