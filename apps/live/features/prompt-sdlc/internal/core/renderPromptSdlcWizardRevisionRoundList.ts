import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcWizardRevisionRoundList = (input: {
  readonly cycle: PromptSdlcLocalCycle;
  readonly interactive: boolean;
  readonly selectedRound?: number | null;
  readonly caption?: string;
}): string => {
  const scored = input.cycle.revisions.filter(
    (item) =>
      item.judgement?.score !== null && item.judgement?.score !== undefined,
  );
  if (scored.length === 0) {
    return "";
  }
  const caption =
    input.caption === undefined
      ? ""
      : `<p class="muted">${escapeHtml(input.caption)}</p>`;
  const items = input.cycle.revisions
    .map((item) => {
      const score = item.judgement?.score;
      const label =
        score === null || score === undefined
          ? `Round ${item.roundNumber}`
          : `Round ${item.roundNumber} — ${score}`;
      const reason = item.judgement?.reasons?.trim() ?? "";
      const reasonLine =
        reason.length === 0
          ? ""
          : `<br><span class="muted">${escapeHtml(reason)}</span>`;
      if (input.interactive) {
        const checked =
          input.selectedRound === item.roundNumber ? " checked" : "";
        return `<li><label><input type="radio" name="wizardRevisionRound" value="${item.roundNumber}"${checked}> ${escapeHtml(label)}</label>${reasonLine}</li>`;
      }
      return `<li>${escapeHtml(label)}${reasonLine}</li>`;
    })
    .join("");
  return `${caption}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${items}</ul>`;
};
