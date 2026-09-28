import {
  isPromptSdlcTerminalStatus,
  selectPromptSdlcBestPrompt,
} from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { describePromptSdlcWriterTerminalFailure } from "./readPromptSdlcWriterOutput";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const renderPromptSdlcLocalBestPrompt = (
  cycle: PromptSdlcLocalCycle,
): string => {
  if (!isPromptSdlcTerminalStatus(cycle.status)) {
    return "";
  }

  const best = selectPromptSdlcBestPrompt(
    cycle.revisions.map((revision) => ({
      roundNumber: revision.roundNumber,
      promptText: revision.promptText,
      score: revision.judgement?.score ?? null,
      reasons: revision.judgement?.reasons ?? null,
    })),
  );
  if (best === null) {
    return "";
  }

  const failure = describePromptSdlcWriterTerminalFailure(best.promptText);
  const body =
    failure === null
      ? `<pre class="mono">${escapeHtml(best.promptText)}</pre>`
      : `<div class="alert-error">${escapeHtml(failure)}</div>`;
  const reasons =
    best.reasons === null || best.reasons.trim().length === 0
      ? ""
      : `<p>${escapeHtml(best.reasons.trim())}</p>`;
  const save =
    failure === null
      ? `<form method="POST" action="/prompt-sdlc"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${escapeHtml(cycle.id)}"><button class="btn btn-primary" type="submit">Save as a skill</button></form><p class="muted">Saves a skill at .cursor/skills/ in the folder for this run.</p>`
      : "";

  return `<section class="card" id="prompt-sdlc-best"><p class="eyebrow">Best prompt</p><h2>Round ${best.roundNumber} · Score ${best.score} / 100</h2>${reasons}${body}${save}</section>`;
};
