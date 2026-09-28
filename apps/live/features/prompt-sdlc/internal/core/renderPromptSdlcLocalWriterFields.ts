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
): string => {
  const options = choices
    .map(
      (choice) =>
        `<option value="${escapeHtml(choice.id)}"${choice.id === selected ? " selected" : ""}>${escapeHtml(choice.label)}</option>`,
    )
    .join("");
  return `<label class="field"><span class="field-label">${label}</span><select class="input" name="${name}" data-writer-select="${name}">${options}</select></label>`;
};

const renderWriterStatus = (
  role: string,
  writerId: string,
  choices: readonly PromptSdlcLocalWriterChoice[],
): string => {
  const label =
    choices.find((choice) => choice.id === writerId)?.label ?? writerId;
  return `<p class="muted" data-writer-status="${role}" data-writer="${escapeHtml(writerId)}">Checking ${escapeHtml(label)}…</p>`;
};

export const renderPromptSdlcLocalWriterFields = (input: {
  readonly writers: readonly PromptSdlcLocalWriterChoice[];
  readonly judge: string;
  readonly improver: string;
}): string => {
  if (input.writers.length === 0) {
    return "";
  }
  if (input.writers.length === 1) {
    return renderWriterStatus("judge", input.judge, input.writers);
  }
  return `${renderWriterSelect("judge", "Judge", input.judge, input.writers)}${renderWriterStatus("judge", input.judge, input.writers)}${renderWriterSelect("improver", "Improver", input.improver, input.writers)}${renderWriterStatus("improver", input.improver, input.writers)}`;
};
