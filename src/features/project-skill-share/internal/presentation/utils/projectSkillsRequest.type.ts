import type { ProjectSkillView } from "@/features/project-skill-share/internal/core/projectSkill.type";

export type FetchProjectSkillsResult =
  | { readonly ok: true; readonly skills: readonly ProjectSkillView[] }
  | {
      readonly ok: false;
      readonly forbidden: boolean;
      readonly errorMessage: string;
    };

export type ProjectSkillMutationResult =
  { readonly ok: true } | { readonly ok: false; readonly errorMessage: string };
