import type { PromptSdlcLocalWriterChoice } from "./promptSdlcLocalForm";
import { renderPromptSdlcFieldHeading } from "./renderPromptSdlcFieldTip";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcWizardRunnerFields = (input: {
  readonly writers: readonly PromptSdlcLocalWriterChoice[];
  readonly runner: string;
  readonly runnerInstructions: string;
}): string => {
  const blank = `<option value=""${input.runner === "" ? " selected" : ""}>Choose</option>`;
  const options = input.writers
    .map(
      (choice) =>
        `<option value="${escapeHtml(choice.id)}"${choice.id === input.runner ? " selected" : ""}>${escapeHtml(choice.label)}</option>`,
    )
    .join("");
  const runnerStatus =
    input.runner.length === 0
      ? `<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>`
      : `<p class="muted" data-writer-status="runner" data-writer="${escapeHtml(input.runner)}">Checking ${escapeHtml(input.writers.find((w) => w.id === input.runner)?.label ?? input.runner)}…</p>`;
  return `<div class="sdlc-block sdlc-runner-block">
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${renderPromptSdlcFieldHeading("Runner", "runner")}<select class="input" name="runner" data-writer-select="runner" required>${blank}${options}</select>${runnerStatus}</div>
      <div class="field">${renderPromptSdlcFieldHeading("Runner instructions", "runnerInstructions")}<textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${escapeHtml(input.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div>
    </div>
  </div>`;
};
