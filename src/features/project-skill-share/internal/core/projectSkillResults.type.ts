import type {
  ProjectSkillDetail,
  ProjectSkillFailure,
  ProjectSkillMirrorStatus,
  ProjectSkillShareErrorCode,
  ProjectSkillView,
} from "@/features/project-skill-share/internal/core/projectSkill.type";
export type { PullPublishedProjectSkillsToMirrorResult } from "@agent-witch/shared/projectSkills";

export type PublishProjectSkillResult =
  | {
      readonly ok: true;
      readonly skill: ProjectSkillView;
      readonly version: number;
      readonly contentHash: string;
      readonly prunedVersions: readonly number[];
      readonly mirror: ProjectSkillMirrorStatus;
    }
  | ProjectSkillFailure;

export type ListProjectSkillsResult =
  | {
      readonly ok: true;
      readonly skills: readonly ProjectSkillView[];
      /** Matches before `limit`; only set when `query` or `limit` was given. */
      readonly total?: number;
    }
  | ProjectSkillFailure;

export type GetProjectSkillResult =
  | { readonly ok: true; readonly skill: ProjectSkillDetail }
  | ProjectSkillFailure;

export type RevokeProjectSkillResult =
  { readonly ok: true; readonly skill: ProjectSkillView } | ProjectSkillFailure;

export type ProjectSkillRehomeRow = {
  readonly skillId: string;
  readonly version: number;
  readonly action:
    "verified" | "uploaded" | "local_diverged" | "missing" | "upload_failed";
};

export type RehomeProjectSkillsToCloudResult =
  | {
      readonly ok: true;
      readonly purgeReady: true;
      readonly skills: readonly ProjectSkillRehomeRow[];
    }
  | {
      readonly ok: false;
      readonly purgeReady: false;
      readonly code: "rehome_failed" | ProjectSkillShareErrorCode;
      readonly skills: readonly ProjectSkillRehomeRow[];
    };
