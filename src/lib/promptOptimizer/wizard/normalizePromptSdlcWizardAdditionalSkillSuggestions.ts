import type PromptSdlcWizardAdditionalSkillSuggestion from "./types/PromptSdlcWizardAdditionalSkillSuggestion.type";

const SKILL_FILE_PATTERN = /^[a-z0-9][a-z0-9-]{0,62}$/;

const slugFileName = (value: string): string => {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "")
    .slice(0, 63);
  return SKILL_FILE_PATTERN.test(slug) ? slug : "";
};

const collapse = (value: string): string => value.replace(/\s+/gu, " ").trim();

export const normalizePromptSdlcWizardAdditionalSkillSuggestions = (input: {
  readonly suggestions: readonly PromptSdlcWizardAdditionalSkillSuggestion[];
  readonly orchestratorFileName: string | null;
}): readonly PromptSdlcWizardAdditionalSkillSuggestion[] => {
  const orchestratorKey =
    input.orchestratorFileName?.trim().toLowerCase() ?? "";
  const seen = new Set<string>();
  const kept: PromptSdlcWizardAdditionalSkillSuggestion[] = [];
  for (const item of input.suggestions) {
    const fileName = slugFileName(item.fileName.trim());
    if (fileName.length === 0) {
      continue;
    }
    if (orchestratorKey.length > 0 && fileName === orchestratorKey) {
      continue;
    }
    if (seen.has(fileName)) {
      continue;
    }
    const name = collapse(item.name);
    const description = collapse(item.description);
    const rationale = collapse(item.rationale);
    if (
      name.length === 0 ||
      description.length === 0 ||
      rationale.length === 0
    ) {
      continue;
    }
    seen.add(fileName);
    kept.push({ fileName, name, description, rationale });
    if (kept.length >= 3) {
      break;
    }
  }
  return kept;
};
