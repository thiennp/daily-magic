import { buildOwnerLlmSkillWritePrompt } from "./buildOwnerLlmSkillDraftPrompt";
import { extractOwnerLlmSkillMarkdown } from "./extractOwnerLlmSkillMarkdown";
import {
  parseScriptProposals,
  splitScriptsBlock,
  type ParsedScripts,
} from "./autoSkillScriptsBlock";
import { AUTO_SKILL_SCRIPTS_INSTRUCTION } from "./autoSkillScriptsPrompt";
import { scrubProjectHistorySkillgenTranscript } from "./scrubProjectHistorySkillgenSecrets";
import { stampProjectHistorySkillgenSourceMessageIds } from "./stampProjectHistorySkillgenSourceMessageIds";
import { validateProjectHistorySkillgenDraft } from "./validateProjectHistorySkillgenDraft";
import type { AutoSkillCompleter, AutoSkillRunRecord } from "./autoSkill.types";

const DRAFT_TIMEOUT_MS = 120_000;
const RESULT_CAP = 500;
const PROMPT_CAP = 1_500;

export type AutoSkillLibraryKind = "skill" | "playbook";

export type AutoSkillDraftResult =
  | {
      readonly ok: true;
      readonly name: string;
      /** What the AI says this is: one focused procedure, or a broader playbook. */
      readonly libraryKind: AutoSkillLibraryKind;
      readonly description: string;
      readonly markdown: string;
      /** Validated script proposal; absent when none or unparseable. */
      readonly scripts?: ParsedScripts;
    }
  | { readonly ok: false; readonly reason: string };

const describeChanges = (run: AutoSkillRunRecord): string =>
  run.changes === undefined
    ? ""
    : `\nChanges in this commit (judge ONLY these changes; do not open or search any other file):\n${run.changes}`;

/**
 * Scrubbed prompts + result summaries of the repeated runs. The prompt keeps
 * its case and line breaks (secrets are still redacted) so the draft reads well.
 */
export const buildAutoSkillTranscript = (
  runs: readonly AutoSkillRunRecord[],
): string =>
  scrubProjectHistorySkillgenTranscript(
    runs
      .map(
        (run, i) =>
          `Run ${i + 1} (${run.completedAt.slice(0, 10)})\nPrompt: ${run.prompt.trim().slice(0, PROMPT_CAP)}\nOutcome: ${run.resultSummary.slice(0, RESULT_CAP)}${describeChanges(run)}`,
      )
      .join("\n\n"),
  ).scrubbed;

/** `kind: playbook` in the draft's frontmatter; anything else is a skill. */
export const readDraftKind = (markdown: string): AutoSkillLibraryKind => {
  const header = /^---\s*\n([\s\S]*?)\n---/.exec(markdown)?.[1] ?? "";
  return /^kind:\s*playbook\s*$/im.test(header) ? "playbook" : "skill";
};

const scriptsOf = (json: string | null): { scripts?: ParsedScripts } => {
  const parsed = json === null ? null : parseScriptProposals(json);
  return parsed === null ? {} : { scripts: parsed };
};

/** Draft SKILL.md from the repeated runs via the chosen completer. */
export const generateAutoSkillDraft = async (
  runs: readonly AutoSkillRunRecord[],
  completer: AutoSkillCompleter,
  existingSkillNames: readonly string[] = [],
): Promise<AutoSkillDraftResult> => {
  const prompt = `${buildOwnerLlmSkillWritePrompt({
    scrubbedTranscript: buildAutoSkillTranscript(runs),
    similarDraftHints: existingSkillNames.map((name) => ({
      name,
      description: "",
    })),
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
    if (split.rest.trim() === "NOT_REUSABLE") {
      return { ok: false, reason: "not_reusable" };
    }
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
        libraryKind: readDraftKind(markdown),
        description: valid.description,
        markdown,
        ...scriptsOf(split.json),
      };
    }
    reason = valid.reason;
  }
  return { ok: false, reason };
};
