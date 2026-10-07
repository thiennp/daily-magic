import type {
  ProjectSkillRecord,
  ProjectSkillState,
} from "@/features/project-skill-share/internal/core/projectSkill.type";

export interface ProjectSkillPublishTransition {
  readonly state: ProjectSkillState;
  readonly publishedVersion: number | null;
  readonly contentHash: string | null;
}

/**
 * draft → published → revoked. A draft on an already published skill keeps the
 * published version live; a draft on a new or revoked skill stays hidden.
 */
export const decideProjectSkillPublishTransition = (input: {
  readonly existing: ProjectSkillRecord | null;
  readonly newVersion: number;
  readonly asDraft: boolean;
  readonly contentHash: string;
  /** Member draft: keep state / published version / hash exactly as they are. */
  readonly draftOnly?: boolean;
}): ProjectSkillPublishTransition => {
  if (input.draftOnly === true && input.existing !== null) {
    return {
      state: input.existing.state,
      publishedVersion: input.existing.publishedVersion,
      contentHash: input.existing.contentHash,
    };
  }
  if (!input.asDraft) {
    return {
      state: "published",
      publishedVersion: input.newVersion,
      contentHash: input.contentHash,
    };
  }
  if (input.existing?.state === "published") {
    return {
      state: "published",
      publishedVersion: input.existing.publishedVersion,
      contentHash: input.existing.contentHash,
    };
  }
  return {
    state: "draft",
    publishedVersion: input.existing?.publishedVersion ?? null,
    contentHash: input.existing?.contentHash ?? null,
  };
};
