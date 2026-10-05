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
  readonly publishedVersion: number;
  readonly contentHash: string;
  /** Present when the AWC source can resolve the version row without a second lookup. */
  readonly skillRowId?: string;
}

export interface ProjectSkillPublishedBody {
  readonly body: string;
  readonly contentHash: string;
}
