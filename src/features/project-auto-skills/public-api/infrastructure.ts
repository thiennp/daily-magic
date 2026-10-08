/** Server-only. Never import from 'use client' files. */
export { answerAutoSkillSuggestion } from "@/features/project-auto-skills/internal/infrastructure/answerAutoSkillSuggestion";
export {
  getAutoSkillsDeviceView,
  getAutoSkillsOverview,
} from "@/features/project-auto-skills/internal/infrastructure/getAutoSkillsOverview";
export {
  patchAutoSkillsSettings,
  recordAutoSkillsStatus,
} from "@/features/project-auto-skills/internal/infrastructure/autoSkillsSettingsDb";
export { upsertAutoSkillSuggestion } from "@/features/project-auto-skills/internal/infrastructure/autoSkillsSuggestionsDb";
export { ensureProjectAutoSkillsSchema } from "@/features/project-auto-skills/internal/infrastructure/ensureProjectAutoSkillsSchema";
