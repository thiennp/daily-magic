/**
 * Print a copy-paste task brief for a cloud subagent (single page).
 * Usage: npm run storybook:wave:page-brief -- AWC home-marketing
 */
import { STORYBOOK_WAVE_PAGES } from "./storybookWavePageCatalog";

const deployable = process.argv[2]?.trim();
const pageId = process.argv[3]?.trim();

if (deployable !== "AWC" && deployable !== "AWL") {
  throw new Error("Usage: printWaveQaPageBrief.ts AWC|AWL <pageId>");
}
if (pageId === undefined || pageId.length === 0) {
  throw new Error("Missing pageId");
}

const page = STORYBOOK_WAVE_PAGES.find(
  (p) => p.deployable === deployable && p.id === pageId,
);
if (page === undefined) {
  throw new Error(`Unknown page ${deployable}/${pageId}`);
}

const branch = `cursor/wave-qa-${deployable.toLowerCase()}-${pageId}-b63b`;

const brief = `
# Storybook wave QA — single page (subagent)

**Page:** ${deployable} / ${page.id} (${page.title}) — path \`${page.path}\`
**Statuses to capture:** ${page.statuses.join(", ")}
**Git branch:** \`${branch}\` (create from latest \`main\`, push when done)

## Rules

- Agent-only scores for ux, copy, ui, product. \`reviewMethod: "agent"\` in JSON.
- Read: \`docs/storybook/wave-qa/reviewer-rubric.md\`, skill \`.cursor/skills/skill-storybook-page-wave-qa/SKILL.md\`
- Forbidden: Playwright subjective rubric / bulk automate.

## Steps

1. \`git fetch origin main && git checkout -b ${branch} origin/main\`
2. \`npm run storybook:build\` — serve \`storybook-static\` on :6008
3. \`STORYBOOK_BASE_URL=http://127.0.0.1:6008 npm run storybook:wave:capture -- ${deployable} ${pageId} 1\`
4. For each role in order (ux → copy → ui → product):
   - Reviewer A: all PNGs + manifest → JSON \`docs/storybook/wave-qa/reviews/${deployable}/${pageId}/round-1/<role>-reviewer-a.json\`
   - **ui only:** read \`docs/storybook/wave-qa/ui-deep-inspection.md\`; zoom every card/pre/form; set \`zoomedSections\` + \`obviousVisualDefects\` (\`none\` | \`present\`). If \`present\`, \`mustFix\` + \`passed: false\` until fixed.
   - Fix mustFix in product or \`src/utils/storybook/*\`; recapture if visuals changed
   - Reviewer B: separate review → \`...-reviewer-b.json\`
   - \`npm run storybook:wave:record-agent -- ${deployable} ${pageId} <role> <a.json> <b.json>\`
   - Commit after each role passes: \`wave-qa(${deployable} ${pageId}): <role> agent A+B ≥95%\`
5. When all four roles pass: run \`npm run ci\`, merge to \`main\`, \`git push origin main\` (no PR).
6. Return: scores per role, PR URL, list of files changed.

Do not work on other catalog pages.
`.trim();

process.stdout.write(`${brief}\n`);
