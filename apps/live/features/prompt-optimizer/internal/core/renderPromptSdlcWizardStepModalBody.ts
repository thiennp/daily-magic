import {
  isPromptSdlcTerminalStatus,
  readPromptSdlcWizardEvaluatePromptText,
  readPromptSdlcWizardTemplatedOrConcrete,
} from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { renderPromptSdlcWizardPipelineModalSummary } from "./renderPromptSdlcWizardPipeline";
import { renderPromptSdlcWizardGeneralizeReview } from "./renderPromptSdlcWizardGeneralizeReview";
import { renderPromptSdlcWizardRevisionRoundList } from "./renderPromptSdlcWizardRevisionRoundList";
import { renderPromptSdlcWizardRevisionRoundJudgePromptInfo } from "./renderPromptSdlcWizardRevisionRoundJudgePromptInfo";
import { renderPromptSdlcWizardSplitOptionDetail } from "./renderPromptSdlcWizardSplitOptionDetail";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const WIZARD_STEP_PHASE: Record<string, string> = {
  "wizard-1": "generalize",
  "wizard-2": "evaluate",
  "wizard-3": "separate",
  "wizard-4": "optimize_modules",
};

const renderTruncatedPromptBlock = (
  heading: string,
  text: string,
  maxPreview = 320,
): string => {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return "";
  }
  const preview =
    trimmed.length <= maxPreview
      ? `<pre class="sdlc-pre">${escapeHtml(trimmed)}</pre>`
      : `<p class="sdlc-pre-preview mono">${escapeHtml(trimmed.slice(0, maxPreview))}…</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${escapeHtml(trimmed)}</pre></details>`;
  return `<h2>${escapeHtml(heading)}</h2>${preview}`;
};

const renderEvaluateTargetSection = (cycle: PromptSdlcLocalCycle): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined || wizard.phase !== "evaluate") {
    return "";
  }
  const templated = wizard.templatedPrompt.trim();
  const concrete = readPromptSdlcWizardTemplatedOrConcrete(wizard).trim();
  const reference = readPromptSdlcWizardEvaluatePromptText({
    wizard,
    revisions: cycle.revisions.map((item) => ({
      roundNumber: item.roundNumber,
      promptText: item.promptText,
      score: item.judgement?.score,
    })),
  }).trim();
  const inLiveEvaluate =
    wizard.gate === null && !isPromptSdlcTerminalStatus(cycle.status);
  const primary =
    inLiveEvaluate && concrete.length > 0
      ? concrete
      : reference.length > 0
        ? reference
        : templated;
  if (primary.length === 0) {
    return `<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>`;
  }
  const note =
    reference.length > 0
      ? `<p class="muted">Prompt-text judge scores this revision (no folder run).</p>`
      : `<p class="muted">Prompt-text judge scores templated prompt revisions.</p>`;
  return `${note}${renderTruncatedPromptBlock("What is being evaluated", primary)}`;
};

const renderWizardStepPipelineSection = (
  cycle: PromptSdlcLocalCycle,
  stepId: string,
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined || isPromptSdlcTerminalStatus(cycle.status)) {
    return "";
  }
  const phase = WIZARD_STEP_PHASE[stepId];
  if (phase === undefined || wizard.phase !== phase) {
    return "";
  }
  return renderPromptSdlcWizardPipelineModalSummary(cycle);
};

const wrapWizardStepModalBody = (
  cycle: PromptSdlcLocalCycle,
  stepId: string,
  inner: string,
): string => {
  const pipeline = renderWizardStepPipelineSection(cycle, stepId);
  const evaluateTarget =
    stepId === "wizard-2" ? renderEvaluateTargetSection(cycle) : "";
  return `${pipeline}${evaluateTarget}${inner}`;
};

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
  return renderPromptSdlcWizardGeneralizeReview(wizard);
};

const renderEvaluateRevisionListFromSnapshots = (
  cycle: PromptSdlcLocalCycle,
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
      const judgeInfo = renderPromptSdlcWizardRevisionRoundJudgePromptInfo({
        cycle,
        roundNumber: item.roundNumber,
        promptText: item.promptText,
      });
      return `<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${escapeHtml(score)}${selected}</span>${judgeInfo}${reasonLine}</li>`;
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
      cycle,
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
      return `<li class="sdlc-wizard-split-option"><strong>${escapeHtml(item.title)}</strong>${badge}${escapeHtml(selected)}${renderPromptSdlcWizardSplitOptionDetail(cycle, item)}</li>`;
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
      const moduleLabel = `Module ${index + 1} of ${wizard.modules.length}`;
      const active =
        wizard.phase !== "complete" && index === wizard.currentModuleIndex
          ? " — in progress"
          : "";
      return `<li class="sdlc-wizard-module-prompt"><span class="muted">${escapeHtml(moduleLabel)}</span> <strong>${escapeHtml(item.title)}</strong>${escapeHtml(active)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${escapeHtml(item.prompt)}</pre></li>`;
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
  return `<ul class="sdlc-wizard-chunks">${moduleList}</ul>${rounds}`;
};

export const renderPromptSdlcWizardStepModalBody = (
  cycle: PromptSdlcLocalCycle,
  stepId: string,
): string => {
  switch (stepId) {
    case "wizard-1":
      return wrapWizardStepModalBody(
        cycle,
        stepId,
        renderGeneralizeBody(cycle),
      );
    case "wizard-2":
      return wrapWizardStepModalBody(cycle, stepId, renderEvaluateBody(cycle));
    case "wizard-3":
      return wrapWizardStepModalBody(cycle, stepId, renderSeparateBody(cycle));
    case "wizard-4":
      return wrapWizardStepModalBody(cycle, stepId, renderOptimizeBody(cycle));
    default:
      return "";
  }
};
