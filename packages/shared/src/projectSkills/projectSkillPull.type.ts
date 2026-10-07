/** Outcome of one skill in pullPublishedProjectSkillsToMirror. */
export type ProjectSkillPullAction = "skip" | "fetch_write" | "remove";

export type ProjectSkillPullRowAction =
  | "skipped"
  | "mirrored"
  | "removed"
  | "hash_mismatch"
  | "unavailable"
  | "missing_awc";

export interface ProjectSkillPullRow {
  readonly skillId: string;
  readonly version: number;
  readonly action: ProjectSkillPullRowAction;
}

export interface ProjectSkillPublishedMeta {
  readonly skillId: string;
  /** "skill" | "playbook" (AWC project_skills.kind); absent from older sources = "skill". */
  readonly kind?: "skill" | "playbook";
  readonly publishedVersion: number;
  readonly contentHash: string;
  /** Present when the AWC source can resolve the version row without a second lookup. */
  readonly skillRowId?: string;
}

export interface ProjectSkillPublishedBody {
  readonly body: string;
  readonly contentHash: string;
}

export type PullPublishedProjectSkillsToMirrorResult = {
  readonly ok: boolean;
  /** History OFF for this project — nothing to pull. */
  readonly skipped: boolean;
  readonly skills: readonly ProjectSkillPullRow[];
};
