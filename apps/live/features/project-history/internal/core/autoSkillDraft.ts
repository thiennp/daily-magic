import { buildOwnerLlmSkillWritePrompt } from "./buildOwnerLlmSkillDraftPrompt";
import { extractOwnerLlmSkillMarkdown } from "./extractOwnerLlmSkillMarkdown";
import {
  parseScriptProposals,
  splitScriptsBlock,
  type ParsedScripts,
} from "./autoSkillScriptsBlock";
import { AUTO_SKILL_SCRIPTS_INSTRUCTION } from "./autoSkillScriptsPrompt";
import { scrubProjectHistorySkillgenSecrets } from "./scrubProjectHistorySkillgenSecrets";
import { stampProjectHistorySkillgenSourceMessageIds } from "./stampProjectHistorySkillgenSourceMessageIds";
import { validateProjectHistorySkillgenDraft } from "./validateProjectHistorySkillgenDraft";
import type { AutoSkillCompleter, AutoSkillRunRecord } from "./autoSkill.types";

const DRAFT_TIMEOUT_MS = 120_000;
const RESULT_CAP = 500;
const PROMPT_CAP = 1_500;

export type AutoSkillDraftResult =
  | {
      readonly ok: true;
      readonly name: string;
      readonly description: string;
      readonly markdown: string;
      /** Validated script proposal; absent when none or unparseable. */
      readonly scripts?: ParsedScripts;
    }
  | { readonly ok: false; readonly reason: string };

/**
 * Scrubbed prompts + result summaries of the repeated runs. The prompt keeps
 * its case and line breaks (secrets are still redacted) so the draft reads well.
 */
export const buildAutoSkillTranscript = (
  runs: readonly AutoSkillRunRecord[],
): string =>
  scrubProjectHistorySkillgenSecrets(
    runs
      .map(
        (run, i) =>
          `Run ${i + 1} (${run.completedAt.slice(0, 10)})\nPrompt: ${run.prompt.trim().slice(0, PROMPT_CAP)}\nOutcome: ${run.resultSummary.slice(0, RESULT_CAP)}`,
      )
      .join("\n\n"),
  ).scrubbed;

const scriptsOf = (json: string | null): { scripts?: ParsedScripts } => {
  const parsed = json === null ? null : parseScriptProposals(json);
  return parsed === null ? {} : { scripts: parsed };
};

/** Draft SKILL.md from the repeated runs via the chosen completer. */
export const generateAutoSkillDraft = async (
  runs: readonly AutoSkillRunRecord[],
  completer: AutoSkillCompleter,
): Promise<AutoSkillDraftResult> => {
  const prompt = `${buildOwnerLlmSkillWritePrompt({
    scrubbedTranscript: buildAutoSkillTranscript(runs),
    similarDraftHints: [],
    mode: "write",
  })}\n${AUTO_SKILL_SCRIPTS_INSTRUCTION}`;
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
    const split = splitScriptsBlock(done.text);
    const extracted = extractOwnerLlmSkillMarkdown(split.rest);
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
        ...scriptsOf(split.json),
      };
    }
    reason = valid.reason;
  }
  return { ok: false, reason };
};
