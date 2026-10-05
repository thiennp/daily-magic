import { getPublishedProjectSkillBodyFromDb } from "@/features/project-skill-share/internal/infrastructure/awc/getPublishedProjectSkillBodyFromDb";
import { listPublishedProjectSkillsFromDb } from "@/features/project-skill-share/internal/infrastructure/awc/listPublishedProjectSkillsFromDb";
import type { ProjectSkillAwcPublishedSource } from "@/features/project-skill-share/internal/infrastructure/awc/projectSkillAwcPublishedSource.type";

/** Default AWC source when pull runs in-process with Neon. */
export const createDbProjectSkillAwcPublishedSource =
  (): ProjectSkillAwcPublishedSource => ({
    listPublished: listPublishedProjectSkillsFromDb,
    getPublishedBody: getPublishedProjectSkillBodyFromDb,
  });
