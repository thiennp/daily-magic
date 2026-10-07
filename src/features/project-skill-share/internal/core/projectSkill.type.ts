import type {
  PROJECT_SKILL_KINDS,
  PROJECT_SKILL_STATES,
} from "@/features/project-skill-share/internal/core/projectSkillShare.constant";

export type ProjectSkillState = (typeof PROJECT_SKILL_STATES)[number];

/** "skill" (default) or "playbook" — same table, lifecycle, ACL and caps. */
export type ProjectSkillKind = (typeof PROJECT_SKILL_KINDS)[number];

/** owner = user_projects.owner_user_id; member = active membership; viewer = read-only list/get published. */
export type ProjectSkillActorRole = "owner" | "member" | "viewer" | "none";

export type ProjectSkillShareErrorCode =
  | "forbidden"
  | "not_found"
  | "invalid_arguments"
  | "invalid_skill_id"
  | "body_required"
  | "body_too_large"
  | "no_draft"
  | "version_conflict";

export type ProjectSkillMirrorStatus =
  "not_applicable" | "mirrored" | "hash_mismatch" | "unavailable";

export interface ProjectSkillRecord {
  readonly rowId: string;
  readonly projectId: string;
  readonly skillId: string;
  readonly kind: ProjectSkillKind;
  readonly name: string;
  readonly description: string | null;
  readonly publisherUserId: string;
  readonly state: ProjectSkillState;
  readonly publishedVersion: number | null;
  readonly latestVersion: number;
  readonly contentHash: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly revokedAt: string | null;
  /** Author of latest_version (list queries only). */
  readonly latestAuthorUserId?: string | null;
  readonly latestAuthorName?: string | null;
}

export interface ProjectSkillVersionRecord {
  readonly skillRowId: string;
  readonly version: number;
  readonly body: string;
  readonly contentHash: string;
  readonly byteSize: number;
  readonly isDraft: boolean;
  readonly createdByUserId: string;
  readonly createdAt: string;
}

/** List row: meta only, never the body. */
export interface ProjectSkillView {
  readonly skillId: string;
  readonly kind: ProjectSkillKind;
  readonly name: string;
  readonly description: string | null;
  readonly state: ProjectSkillState;
  readonly publishedVersion: number | null;
  readonly latestVersion: number;
  readonly contentHash: string | null;
  readonly updatedAt: string;
  readonly isPublisher: boolean;
  readonly canRevoke: boolean;
  /** Owner only: may publish / promote the latest draft. */
  readonly canPublish: boolean;
  /** Who saved the latest version (shown on draft rows); null when unknown. */
  readonly latestAuthorName: string | null;
}

export interface ProjectSkillDetail extends ProjectSkillView {
  readonly version: number;
  readonly body: string;
  readonly versionContentHash: string;
  readonly byteSize: number;
  readonly isDraftVersion: boolean;
}

export type ProjectSkillFailure = {
  readonly ok: false;
  readonly code: ProjectSkillShareErrorCode;
  /** Human-readable reason (e.g. owner-only publish); optional. */
  readonly message?: string;
};
