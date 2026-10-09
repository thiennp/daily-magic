import type { ProjectSkillView } from "@/features/project-skill-share/public-api/types";

export interface ProjectLibrarySkillDeleteUi {
  readonly show: boolean;
  readonly canDelete: boolean;
  readonly isDraft: boolean;
}

/** Library detail delete: skill-backed rows only; uses API `canRevoke`. */
export const resolveProjectLibrarySkillDelete = (
  skill: ProjectSkillView | undefined,
  itemSkillId: string | null,
): ProjectLibrarySkillDeleteUi => {
  if (itemSkillId === null || skill === undefined) {
    return { show: false, canDelete: false, isDraft: false };
  }
  if (skill.state === "revoked") {
    return { show: false, canDelete: false, isDraft: false };
  }
  return {
    show: true,
    canDelete: skill.canRevoke,
    isDraft: skill.state === "draft",
  };
};
