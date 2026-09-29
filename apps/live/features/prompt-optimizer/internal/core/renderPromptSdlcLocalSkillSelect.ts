import type { PromptSdlcFolderSkill } from "./readPromptSdlcFolderSkills";
import { renderPromptSdlcFieldHeading } from "./renderPromptSdlcFieldTip";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const promptSdlcSkillCatalogJson = (
  skills: readonly PromptSdlcFolderSkill[],
): string =>
  JSON.stringify(
    skills.map((skill) => ({
      fileName: skill.fileName,
      promptText: skill.promptText,
    })),
  ).replaceAll("<", "\\u003c");

export const renderPromptSdlcLocalSkillSelect = (
  skills: readonly PromptSdlcFolderSkill[],
): string => {
  if (skills.length === 0) {
    return `<div class="field">${renderPromptSdlcFieldHeading("Skill", "skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;
  }

  const options = skills
    .map(
      (skill) =>
        `<option value="${escapeHtml(skill.fileName)}">${escapeHtml(skill.fileName)}</option>`,
    )
    .join("");
  return `<div class="field">${renderPromptSdlcFieldHeading("Skill", "skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${options}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${promptSdlcSkillCatalogJson(skills)}</script>`;
};

export const PROMPT_SDLC_SKILL_SELECT_SCRIPT = `<script>
(() => {
  const select = document.querySelector("[data-skill-select]");
  const catalog = document.getElementById("prompt-optimizer-skill-catalog");
  if (!(select instanceof HTMLSelectElement) || catalog === null) return;
  let skills = [];
  try {
    skills = JSON.parse(catalog.textContent || "[]");
  } catch {
    skills = [];
  }
  select.addEventListener("change", () => {
    const skill = skills.find((item) => item.fileName === select.value);
    const prompt = document.querySelector('textarea[name="prompt"]');
    if (!(prompt instanceof HTMLTextAreaElement) || skill === undefined) return;
    if (typeof skill.promptText !== "string") return;
    prompt.value = skill.promptText;
    prompt.dispatchEvent(new Event("input"));
  });
})();
</script>`;
