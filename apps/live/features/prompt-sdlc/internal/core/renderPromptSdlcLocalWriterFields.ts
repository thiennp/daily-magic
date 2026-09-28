import type { PromptSdlcLocalWriterChoice } from "./promptSdlcLocalForm";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderWriterSelect = (
  name: string,
  label: string,
  selected: string,
  choices: readonly PromptSdlcLocalWriterChoice[],
  manualLabel: string,
): string => {
  const blank = `<option value=""${selected === "" ? " selected" : ""}>Choose</option>`;
  const options = choices
    .map(
      (choice) =>
        `<option value="${escapeHtml(choice.id)}"${choice.id === selected ? " selected" : ""}>${escapeHtml(choice.label)}</option>`,
    )
    .join("");
  const manual = `<option value="manual"${selected === "manual" ? " selected" : ""}>${escapeHtml(manualLabel)}</option>`;
  return `<label class="field"><span class="field-label">${label}</span><select class="input" name="${name}" data-writer-select="${name}">${blank}${options}${manual}</select></label>`;
};

const renderWriterStatus = (
  role: string,
  writerId: string,
  choices: readonly PromptSdlcLocalWriterChoice[],
): string => {
  if (writerId.length === 0) {
    return `<p class="muted" data-writer-status="${role}" data-writer="">Choose who does this step.</p>`;
  }
  if (writerId === "manual") {
    return `<p class="muted" data-writer-status="${role}" data-writer="manual" data-ready="true">You will do this step.</p>`;
  }
  const label =
    choices.find((choice) => choice.id === writerId)?.label ?? writerId;
  return `<p class="muted" data-writer-status="${role}" data-writer="${escapeHtml(writerId)}">Checking ${escapeHtml(label)}…</p>`;
};

const renderInstruction = (
  name: string,
  label: string,
  value: string,
  hint: string,
): string =>
  `<label class="field"><span class="field-label">${label}</span><textarea class="input textarea sdlc-instruction" name="${name}" rows="3">${escapeHtml(value)}</textarea><span class="muted">${hint}</span></label>`;

export const renderPromptSdlcLocalWriterFields = (input: {
  readonly writers: readonly PromptSdlcLocalWriterChoice[];
  readonly judge: string;
  readonly improver: string;
  readonly judgeInstructions?: string;
  readonly improverInstructions?: string;
}): string => {
  const judgeCard = `<div class="sdlc-writer">${renderWriterSelect("judge", "Judge", input.judge, input.writers, "I'll score it")}${renderWriterStatus("judge", input.judge, input.writers)}${renderInstruction("judgeInstructions", "Instructions for the judge", input.judgeInstructions ?? "", "Optional. Used with the goal when scoring.")}</div>`;
  const improverCard = `<div class="sdlc-writer">${renderWriterSelect("improver", "Improver", input.improver, input.writers, "I'll rewrite it")}${renderWriterStatus("improver", input.improver, input.writers)}${renderInstruction("improverInstructions", "Instructions for the improver", input.improverInstructions ?? "", "Optional. Used with the goal when rewriting.")}</div>`;
  return `<div class="sdlc-writers">${judgeCard}${improverCard}</div>`;
};
