import type { PromptSdlcFolderSkill } from "./readPromptSdlcFolderSkills";

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
    return `<label class="field"><span class="field-label">Skill</span><span class="muted">No skills in .cursor/skills for this folder.</span></label>`;
  }

  const options = skills
    .map(
      (skill) =>
        `<option value="${escapeHtml(skill.fileName)}">${escapeHtml(skill.fileName)}</option>`,
    )
    .join("");
  return `<label class="field"><span class="field-label">Skill</span><select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${options}</select><span class="muted">Fills the prompt from that skill.</span></label><script type="application/json" id="prompt-sdlc-skill-catalog">${promptSdlcSkillCatalogJson(skills)}</script>`;
};

export const PROMPT_SDLC_SKILL_SELECT_SCRIPT = `<script>
(() => {
  const select = document.querySelector("[data-skill-select]");
  const catalog = document.getElementById("prompt-sdlc-skill-catalog");
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
