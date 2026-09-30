import {
  readPromptSdlcWizardEvaluatePromptText,
  substitutePromptSdlcTemplate,
} from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { renderPromptSdlcWizardRevisionRoundList } from "./renderPromptSdlcWizardRevisionRoundList";
import { renderPromptSdlcWizardSplitOptionChunks } from "./renderPromptSdlcWizardSplitChunks";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

type EvaluateRevisionSnapshot = {
  readonly roundNumber: number;
  readonly promptText: string;
  readonly score: number | null;
  readonly passed: boolean | null;
  readonly reasons: string | null;
};

const readEvaluateAttemptRevisions = (
  cycle: PromptSdlcLocalCycle,
): readonly EvaluateRevisionSnapshot[] | null => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return null;
  }
  const attempts = wizard.attempts.filter((item) => item.step === "evaluate");
  const last = attempts.at(-1);
  if (
    last === undefined ||
    typeof last.output !== "object" ||
    last.output === null
  ) {
    return null;
  }
  const revisions = (last.output as { revisions?: unknown }).revisions;
  if (!Array.isArray(revisions)) {
    return null;
  }
  const parsed: EvaluateRevisionSnapshot[] = [];
  for (const item of revisions) {
    if (typeof item !== "object" || item === null) {
      continue;
    }
    const row = item as Record<string, unknown>;
    const roundNumber = row.roundNumber;
    const promptText = row.promptText;
    if (typeof roundNumber !== "number" || typeof promptText !== "string") {
      continue;
    }
    parsed.push({
      roundNumber,
      promptText,
      score: typeof row.score === "number" ? row.score : null,
      passed: typeof row.passed === "boolean" ? row.passed : null,
      reasons: typeof row.reasons === "string" ? row.reasons : null,
    });
  }
  return parsed.length === 0 ? null : parsed;
};

const renderGeneralizeBody = (cycle: PromptSdlcLocalCycle): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return "";
  }
  const vars =
    wizard.variables.length === 0
      ? `<p class="muted">No variables yet.</p>`
      : `<ul class="sdlc-wizard-vars">${wizard.variables
          .map(
            (item) =>
              `<li><strong>{{${escapeHtml(item.name)}}}</strong> — ${escapeHtml(item.description)} (sample: ${escapeHtml(item.sampleValue)})</li>`,
          )
          .join("")}</ul>`;
  const template = wizard.templatedPrompt.trim();
  const templateBlock =
    template.length === 0
      ? `<p class="muted">No templated prompt yet.</p>`
      : `<h2>Templated prompt</h2><pre class="sdlc-pre">${escapeHtml(template)}</pre>`;
  const concrete = substitutePromptSdlcTemplate(
    wizard.templatedPrompt,
    wizard.variables,
  ).trim();
  const sampleBlock =
    concrete.length === 0 || concrete === template
      ? ""
      : `<h2>Sample with variables filled</h2><pre class="sdlc-pre">${escapeHtml(concrete)}</pre>`;
  return `${vars}${templateBlock}${sampleBlock}`;
};

const renderEvaluateRevisionListFromSnapshots = (
  revisions: readonly EvaluateRevisionSnapshot[],
  selectedRound: number | null,
): string => {
  const items = revisions
    .map((item) => {
      const score =
        item.score === null
          ? `Round ${item.roundNumber} — not scored`
          : `Round ${item.roundNumber} — ${item.score}`;
      const selected = selectedRound === item.roundNumber ? " (selected)" : "";
      const reason = item.reasons?.trim() ?? "";
      const reasonLine =
        reason.length === 0
          ? ""
          : `<br><span class="muted">${escapeHtml(reason)}</span>`;
      return `<li>${escapeHtml(score)}${selected}${reasonLine}</li>`;
    })
    .join("");
  return `<ul class="sdlc-wizard-revisions">${items}</ul>`;
};

const renderEvaluateBody = (cycle: PromptSdlcLocalCycle): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return "";
  }
  const inEvaluate = wizard.phase === "evaluate" || wizard.gate === "evaluate";
  if (inEvaluate) {
    return renderPromptSdlcWizardRevisionRoundList({
      cycle,
      interactive: false,
      selectedRound: wizard.evaluateSelectedRound,
      caption: "Scored revisions from prompt-text judge (no folder run).",
    });
  }
  const snapshot = readEvaluateAttemptRevisions(cycle);
  if (snapshot !== null) {
    return `<p class="muted">Scored revisions from step 2 evaluate.</p>${renderEvaluateRevisionListFromSnapshots(
      snapshot,
      wizard.evaluateSelectedRound,
    )}`;
  }
  if (wizard.evaluateSelectedRound !== null) {
    const handoff = readPromptSdlcWizardEvaluatePromptText({
      wizard,
      revisions: cycle.revisions.map((item) => ({
        roundNumber: item.roundNumber,
        promptText: item.promptText,
        score: item.judgement?.score,
      })),
    });
    return `<p class="muted">Selected round ${wizard.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${escapeHtml(handoff)}</pre>`;
  }
  const evaluateFinished =
    wizard.phase === "complete" ||
    (wizard.gate === null && wizard.modules.length > 0);
  if (evaluateFinished) {
    const scoredRevisions = cycle.revisions.filter(
      (revision) =>
        revision.judgement !== null && revision.judgement !== undefined,
    );
    if (scoredRevisions.length > 0) {
      const list = scoredRevisions
        .map((revision) => {
          const score = revision.judgement?.score ?? "—";
          return `<li>Round ${revision.roundNumber} — score ${score}</li>`;
        })
        .join("");
      return `<p class="muted">Evaluate finished — scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${list}</ul>`;
    }
    const template = wizard.templatedPrompt.trim();
    if (template.length > 0) {
      return `<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${escapeHtml(template)}</pre>`;
    }
    return `<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>`;
  }
  return `<p class="muted">Evaluate has not run yet.</p>`;
};

const renderSeparateBody = (cycle: PromptSdlcLocalCycle): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return "";
  }
  if (wizard.splitOptions.length === 0) {
    if (wizard.modules.length > 0) {
      const moduleItems = wizard.modules
        .map(
          (item) =>
            `<li><strong>${escapeHtml(item.title)}</strong> <span class="muted">(${escapeHtml(item.status)})</span></li>`,
        )
        .join("");
      return `<p class="muted">Separate finished — ${wizard.modules.length} module${wizard.modules.length === 1 ? "" : "s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${moduleItems}</ul>`;
    }
    return `<p class="muted">No split options yet.</p>`;
  }
  const options = wizard.splitOptions
    .map((item) => {
      const badge = item.recommended
        ? ' <span class="sdlc-badge">Recommended</span>'
        : "";
      const selected =
        wizard.selectedSplitOptionId === item.id ? " (selected)" : "";
      return `<li class="sdlc-wizard-split-option"><strong>${escapeHtml(item.title)}</strong>${badge}${escapeHtml(selected)}<br><span class="muted">${escapeHtml(item.summary)} (${escapeHtml(item.topology)})</span>${renderPromptSdlcWizardSplitOptionChunks(item)}</li>`;
    })
    .join("");
  return `<ul class="sdlc-wizard-splits">${options}</ul>`;
};

const renderOptimizeBody = (cycle: PromptSdlcLocalCycle): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return "";
  }
  if (wizard.modules.length === 0) {
    return `<p class="muted">No modules yet. Complete separate first.</p>`;
  }
  const moduleList = wizard.modules
    .map((item, index) => {
      const active = index === wizard.currentModuleIndex ? " — current" : "";
      return `<li><strong>${escapeHtml(item.title)}</strong> (${escapeHtml(item.status)})${escapeHtml(active)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${escapeHtml(item.prompt)}</pre></li>`;
    })
    .join("");
  const rounds =
    wizard.phase === "optimize_modules" || wizard.gate === "optimize_modules"
      ? renderPromptSdlcWizardRevisionRoundList({
          cycle,
          interactive: false,
          caption: "Scored rounds for the current module (runner + judge).",
        })
      : "";
  return `<ol class="sdlc-wizard-chunks">${moduleList}</ol>${rounds}`;
};

export const renderPromptSdlcWizardStepModalBody = (
  cycle: PromptSdlcLocalCycle,
  stepId: string,
): string => {
  switch (stepId) {
    case "wizard-1":
      return renderGeneralizeBody(cycle);
    case "wizard-2":
      return renderEvaluateBody(cycle);
    case "wizard-3":
      return renderSeparateBody(cycle);
    case "wizard-4":
      return renderOptimizeBody(cycle);
    default:
      return "";
  }
};
