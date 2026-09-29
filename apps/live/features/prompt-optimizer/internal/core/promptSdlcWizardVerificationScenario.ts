/** Dogfood + QA scenario: improve this prompt with the Prompt SDLC wizard (Run, not classic loop). */

export const PROMPT_SDLC_WIZARD_VERIFICATION_GOAL =
  "Produce a reusable skill template that teaches how to verify Prompt SDLC wizard steps 1–4 on Agent Witch Live (bundle 172+): generalize with {{variables}}, evaluate scored revisions (no score 0 continue), separate into module chunks, optimize each module with runner+judge round logs visible at step 4.";

/** Intentionally weak prompt — dogfood the wizard to improve it (see IMPROVED). */
export const PROMPT_SDLC_WIZARD_VERIFICATION_SOURCE_PROMPT = `You help users test the prompt optimizer wizard on Agent Witch Live.
Explain the four steps when asked. Sometimes skip evaluate or separate.
Mention round scores at step 4 only if you remember.
Use placeholders like {{thing}} without defining them.
Do not describe install bundle self-update or production bundle version checks.`;

/** Wizard output after live dogfood on 2026-09-29 (bundle 172, cycle wizard-verification-dogfood). */
export const PROMPT_SDLC_WIZARD_VERIFICATION_IMPROVED_PROMPT = `This is the highest scoring version so far. Start from it.

Write \`.cursor/skills/verify-prompt-optimizer-wizard/SKILL.md\` only. Do not open or search \`runner\`, \`judge\`, or unrelated files.

Skill teaches verifying Prompt SDLC wizard steps 1–4 on Agent Witch Live (bundle 172+). Cover every step; do not skip Evaluate or Separate:

1. Generalize — pull concrete values into \`{{variableName}}\` (camelCase); define each placeholder (name, purpose, sample).
2. Evaluate — scored revisions; stop when a revision scores 0.
3. Separate — split into module chunks.
4. Optimize — optimize each module with runner+judge; note that round scores and runner/judge logs must be visible at this step (do not dump sample logs in the skill).

Omit install, self-update, and production version checks.`;
