import type { AutoSkillCompleter, AutoSkillRunRecord } from "./autoSkill.types";
import { buildAutoSkillTranscript } from "./autoSkillDraft";

const TRIAGE_TIMEOUT_MS = 90_000;

export type RunTriage = "reusable" | "not_reusable" | "unknown";

/** Short yes/no question about one run; a short answer is fast, a whole draft is not. */
export const buildTriagePrompt = (run: AutoSkillRunRecord): string =>
  `You decide whether the work below holds a procedure worth saving as a reusable skill:
steps someone would follow again on a similar task (a recipe, a checklist, a repeatable change).
One-off edits, renames, copy changes and plain fixes are NOT reusable.

${buildAutoSkillTranscript([run])}

Answer ONLY strict JSON: {"reusable":true|false,"why":"<one short sentence>"}`;

/** Strict JSON out of the answer; unknown when it is not usable (the draft step then decides). */
export const parseTriage = (text: string): RunTriage => {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) {
    return "unknown";
  }
  try {
    const parsed = JSON.parse(text.slice(start, end + 1)) as {
      reusable?: unknown;
    };
    return parsed.reusable === true
      ? "reusable"
      : parsed.reusable === false
        ? "not_reusable"
        : "unknown";
  } catch {
    return "unknown";
  }
};

export const triageRun = async (
  run: AutoSkillRunRecord,
  completer: AutoSkillCompleter,
): Promise<RunTriage> => {
  const answered = await completer({
    prompt: buildTriagePrompt(run),
    json: true,
    timeoutMs: TRIAGE_TIMEOUT_MS,
  });
  return answered.ok ? parseTriage(answered.text) : "unknown";
};
