import { buildOwnerLlmSkillWritePrompt } from "./buildOwnerLlmSkillDraftPrompt";
import { extractOwnerLlmSkillMarkdown } from "./extractOwnerLlmSkillMarkdown";
import { scrubProjectHistorySkillgenSecrets } from "./scrubProjectHistorySkillgenSecrets";
import { stampProjectHistorySkillgenSourceMessageIds } from "./stampProjectHistorySkillgenSourceMessageIds";
import { validateProjectHistorySkillgenDraft } from "./validateProjectHistorySkillgenDraft";
import { normalizeAutoSkillPrompt } from "./autoSkillPromptSimilarity";
import type { AutoSkillCompleter, AutoSkillRunRecord } from "./autoSkill.types";

const DRAFT_TIMEOUT_MS = 120_000;
const RESULT_CAP = 500;

export type AutoSkillDraftResult =
  | {
      readonly ok: true;
      readonly name: string;
      readonly description: string;
      readonly markdown: string;
    }
  | { readonly ok: false; readonly reason: string };

/** Scrubbed prompts + result summaries of the repeated runs. */
export const buildAutoSkillTranscript = (
  runs: readonly AutoSkillRunRecord[],
): string =>
  scrubProjectHistorySkillgenSecrets(
    runs
      .map(
        (run, i) =>
          `Run ${i + 1} (${run.completedAt.slice(0, 10)})\nPrompt: ${normalizeAutoSkillPrompt(run.prompt) || run.prompt}\nOutcome: ${run.resultSummary.slice(0, RESULT_CAP)}`,
      )
      .join("\n\n"),
  ).scrubbed;

/** Draft SKILL.md from the repeated runs via the chosen completer. */
export const generateAutoSkillDraft = async (
  runs: readonly AutoSkillRunRecord[],
  completer: AutoSkillCompleter,
): Promise<AutoSkillDraftResult> => {
  const prompt = buildOwnerLlmSkillWritePrompt({
    scrubbedTranscript: buildAutoSkillTranscript(runs),
    similarDraftHints: [],
    mode: "write",
  });
  let reason = "draft_invalid";
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const done = await completer({
      prompt,
      json: false,
      timeoutMs: DRAFT_TIMEOUT_MS,
    });
    if (!done.ok) {
      reason = done.reason;
      continue;
    }
    const extracted = extractOwnerLlmSkillMarkdown(done.text);
    if (extracted === null) {
      continue;
    }
    const markdown = stampProjectHistorySkillgenSourceMessageIds({
      skillMarkdown: extracted,
      sourceMessageIds: runs.map((r) => r.runId),
    });
    const valid = validateProjectHistorySkillgenDraft({
      skillMarkdown: markdown,
    });
    if (valid.ok) {
      return {
        ok: true,
        name: valid.name,
        description: valid.description,
        markdown,
      };
    }
    reason = valid.reason;
  }
  return { ok: false, reason };
};
