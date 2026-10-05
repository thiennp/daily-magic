import { isValidProjectSkillId } from "@/features/project-skill-share/internal/core/isValidProjectSkillId";

/** Slug from a display name when the caller does not pass skillId. */
export const deriveProjectSkillIdFromName = (name: string): string | null => {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64)
    .replace(/-+$/g, "");
  return isValidProjectSkillId(slug) ? slug : null;
};
