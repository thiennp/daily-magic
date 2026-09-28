import {
  isPromptSdlcTerminalStatus,
  selectPromptSdlcBestPrompt,
} from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { promptSdlcLocalWorkingDirectory } from "./promptSdlcLocalFolder";
import { describePromptSdlcWriterTerminalFailure } from "./readPromptSdlcWriterOutput";
import {
  promptSdlcSkillExists,
  promptSdlcSkillFileName,
  promptSdlcSkillSlug,
} from "./writePromptSdlcLocalSkill";

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
          workingDirectory: promptSdlcLocalWorkingDirectory(cycle),
          sourceSkill: cycle.sourceSkill,
        })
      : `<div class="alert-error">${escapeHtml(failure)}</div>`;

  return `<section class="card" id="prompt-sdlc-best"><p class="eyebrow">Best prompt</p><h2>Round ${best.roundNumber} · Score ${best.score} / 100</h2>${reasons}${body}</section>`;
};

const renderPromptSdlcLocalSkillForm = (input: {
  readonly cycleId: string;
  readonly goal: string;
  readonly promptText: string;
  readonly workingDirectory: string;
  readonly sourceSkill?: {
    readonly fileName: string;
    readonly name: string;
    readonly description: string;
  };
}): string => {
  const fileName =
    input.sourceSkill?.fileName ?? promptSdlcSkillSlug(input.goal);
  const name = input.sourceSkill?.name ?? fileName;
  const description = input.sourceSkill?.description ?? input.goal;
  const skillSlug = promptSdlcSkillFileName(fileName, name);
  const exists =
    skillSlug.length > 0 &&
    promptSdlcSkillExists(input.workingDirectory, skillSlug);
  const replace = exists
    ? `<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${escapeHtml(skillSlug)}/SKILL.md</label>`
    : "";
  return `<form class="sdlc-manual" method="POST" action="/prompt-sdlc"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${escapeHtml(input.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${escapeHtml(name)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${escapeHtml(description)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${escapeHtml(fileName)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${escapeHtml(input.promptText)}</textarea></label>${replace}<div class="actions"><button class="btn btn-primary" type="submit">${exists ? "Replace skill" : "Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`;
};
