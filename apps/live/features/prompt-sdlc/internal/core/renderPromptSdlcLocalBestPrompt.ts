import {
  isPromptSdlcTerminalStatus,
  selectPromptSdlcBestPrompt,
} from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { describePromptSdlcWriterTerminalFailure } from "./readPromptSdlcWriterOutput";
import { promptSdlcSkillSlug } from "./writePromptSdlcLocalSkill";

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
  const reasons =
    best.reasons === null || best.reasons.trim().length === 0
      ? ""
      : `<p>${escapeHtml(best.reasons.trim())}</p>`;
  const body =
    failure === null
      ? renderPromptSdlcLocalSkillForm({
          cycleId: cycle.id,
          goal: cycle.goal,
          promptText: best.promptText,
        })
      : `<div class="alert-error">${escapeHtml(failure)}</div>`;

  return `<section class="card" id="prompt-sdlc-best"><p class="eyebrow">Best prompt</p><h2>Round ${best.roundNumber} · Score ${best.score} / 100</h2>${reasons}${body}</section>`;
};

const renderPromptSdlcLocalSkillForm = (input: {
  readonly cycleId: string;
  readonly goal: string;
  readonly promptText: string;
}): string => {
  const name = promptSdlcSkillSlug(input.goal);
  return `<form class="sdlc-manual" method="POST" action="/prompt-sdlc"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${escapeHtml(input.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${escapeHtml(name)}" required><span class="muted">Letters and numbers. This becomes the folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${escapeHtml(input.goal)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${escapeHtml(input.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save as a skill</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, and the prompt before saving.</p></form>`;
};
