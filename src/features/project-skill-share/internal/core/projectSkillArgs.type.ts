import type { ProjectSkillKind } from "@/features/project-skill-share/internal/core/projectSkill.type";

export interface PublishProjectSkillArgs {
  readonly projectId: string;
  readonly skillId?: string;
  readonly name?: string;
  readonly description?: string;
  /** Omit to promote the latest draft of an existing skill. */
  readonly body?: string;
  /** Save as a draft (publisher + owner only) instead of publishing. */
  readonly asDraft?: boolean;
  /** "skill" (default for new rows) or "playbook"; omit to keep an existing row's kind. */
  readonly kind?: ProjectSkillKind;
}

export interface ProjectSkillRefArgs {
  readonly projectId: string;
  readonly skillId: string;
  readonly version?: number;
}

export interface ListProjectSkillsArgs {
  readonly projectId: string;
  /** Omit to list every kind. */
  readonly kind?: ProjectSkillKind;
}
