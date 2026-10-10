/** What the owner lets members do with skills (project member permissions). */
export type ProjectSkillMemberRights = {
  readonly publish: boolean;
  readonly delete: boolean;
};

export const PROJECT_SKILL_ALL_RIGHTS: ProjectSkillMemberRights = {
  publish: true,
  delete: true,
};

export const PROJECT_SKILL_NO_RIGHTS: ProjectSkillMemberRights = {
  publish: false,
  delete: false,
};
