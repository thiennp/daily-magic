/**
 * Manual verification for auto-skill reusability. NOT part of vitest, CI or
 * the git hooks (file name is *.verify.ts on purpose). Run when asked:
 *
 *   npx tsx .agents/verification/auto-skill-reusability/run.verify.ts
 *   npx tsx .agents/verification/auto-skill-reusability/run.verify.ts --live "claude -p"
 *
 * --live pipes the real draft prompt to the given command (reads stdin) and
 * validates what comes back, so it checks the prompt, not only the rules.
 */
import { spawnSync } from "node:child_process";

import { mergeOrSkipProjectHistorySkillgenDraft } from "../../../apps/live/features/project-history/internal/core/mergeOrSkipProjectHistorySkillgenDraft";
import { buildOwnerLlmSkillWritePrompt } from "../../../apps/live/features/project-history/internal/core/buildOwnerLlmSkillDraftPrompt";
import { extractOwnerLlmSkillMarkdown } from "../../../apps/live/features/project-history/internal/core/extractOwnerLlmSkillMarkdown";
import { scrubProjectHistorySkillgenTranscript } from "../../../apps/live/features/project-history/internal/core/scrubProjectHistorySkillgenSecrets";
import { validateProjectHistorySkillgenDraft } from "../../../apps/live/features/project-history/internal/core/validateProjectHistorySkillgenDraft";

import {
  DEDUPE_CASES,
  KNOWN_NAMES,
  LIVE_TRANSCRIPT,
  SCRUB_CASES,
  VALIDATE_CASES,
} from "./cases";

type Row = {
  readonly group: string;
  readonly label: string;
  readonly ok: boolean;
  readonly detail: string;
};

const rows: Row[] = [];
const record = (
  group: string,
  label: string,
  ok: boolean,
  detail = "",
): void => {
  rows.push({ group, label, ok, detail });
};

for (const c of SCRUB_CASES) {
  const { scrubbed } = scrubProjectHistorySkillgenTranscript(
    c.input,
    KNOWN_NAMES,
  );
  const leaked = c.mustNotContain.filter((t) => scrubbed.includes(t));
  const missing = c.mustContain.filter((t) => !scrubbed.includes(t));
  record(
    "scrub",
    c.label,
    leaked.length + missing.length === 0,
    `leaked=[${leaked}] missing=[${missing}]`,
  );
}

for (const c of VALIDATE_CASES) {
  const result = validateProjectHistorySkillgenDraft({
    skillMarkdown: c.markdown,
    knownNames: KNOWN_NAMES,
  });
  const got = result.ok ? "ok" : result.reason;
  record(
    "validate",
    c.label,
    got === c.expect,
    `expected ${c.expect}, got ${got}`,
  );
}

const existingDrafts = [
  {
    id: "d1",
    contentHash: "sha256:aaa",
    name: "review-migration-naming",
    stepLines: ["Read <migration-file>.", "Compare names with <naming-rule>."],
  },
];
for (const c of DEDUPE_CASES) {
  const result = mergeOrSkipProjectHistorySkillgenDraft({
    contentHash: "sha256:new",
    name: c.name,
    stepLines: c.steps,
    existingDrafts,
    existingPublished: [],
  });
  record(
    "dedupe",
    c.label,
    result.action === c.expect,
    `expected ${c.expect}, got ${result.action}`,
  );
}

const liveIndex = process.argv.indexOf("--live");
if (liveIndex >= 0) {
  const command = process.argv[liveIndex + 1] ?? "claude -p";
  const scrubbed = scrubProjectHistorySkillgenTranscript(
    LIVE_TRANSCRIPT,
    KNOWN_NAMES,
  ).scrubbed;
  const prompt = buildOwnerLlmSkillWritePrompt({
    scrubbedTranscript: scrubbed,
    similarDraftHints: [],
    mode: "write",
  });
  const [bin = "", ...args] = command.split(" ");
  const run = spawnSync(bin, args, {
    input: prompt,
    encoding: "utf8",
    timeout: 180_000,
  });
  const out = (run.stdout ?? "").trim();
  if (run.status !== 0 || out.length === 0) {
    record(
      "live",
      command,
      false,
      `command failed: ${(run.stderr ?? "").slice(0, 200)}`,
    );
  } else if (out === "NOT_REUSABLE") {
    record("live", "LLM answered NOT_REUSABLE", true, "accepted outcome");
  } else {
    const markdown = extractOwnerLlmSkillMarkdown(out);
    const stamped =
      markdown === null
        ? null
        : markdown.replace(/^---\n/, '---\nsource_message_ids: ["m1"]\n');
    const result =
      stamped === null
        ? null
        : validateProjectHistorySkillgenDraft({
            skillMarkdown: stamped,
            knownNames: KNOWN_NAMES,
          });
    record(
      "live",
      "LLM draft passes validate",
      result?.ok === true,
      result === null
        ? "no markdown"
        : result.ok
          ? (stamped?.split("\n").slice(0, 4).join(" | ") ?? "")
          : result.reason,
    );
  }
}

for (const row of rows) {
  console.log(
    `${row.ok ? "PASS" : "FAIL"}  [${row.group}] ${row.label}${row.ok ? "" : `  -> ${row.detail}`}`,
  );
}
const failed = rows.filter((row) => !row.ok).length;
console.log(`\n${rows.length - failed}/${rows.length} passed`);
process.exit(failed === 0 ? 0 : 1);
