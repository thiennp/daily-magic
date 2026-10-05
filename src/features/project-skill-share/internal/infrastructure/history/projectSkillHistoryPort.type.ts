/**
 * Contract implemented by AW History (AWL, `<profileDir>/project-data/…`).
 * Share never writes, unlinks, or tombstones mirror files directly; History owns
 * atomic writes, tombstones, dirs 0700 / files 0600,
 * `vNNNN.md` + `meta.json { skillId, version, contentHash, updatedAt }`.
 */
export interface ProjectSkillVersionWriteInput {
  readonly projectId: string;
  readonly skillId: string;
  readonly version: number;
  readonly body: string;
}

export interface ProjectSkillVersionReadInput {
  readonly projectId: string;
  readonly skillId: string;
  readonly version: number;
}

export interface ProjectSkillVersionWriteResult {
  readonly path: string;
  readonly contentHash: string;
}

export interface ProjectSkillVersionReadResult {
  readonly body: string;
  readonly contentHash: string;
}

export interface ProjectSkillTombstoneInput {
  readonly projectId: string;
  readonly skillId: string;
  /** From local meta.json contentHash when known. */
  readonly lastContentHash: string;
  readonly revokedAt?: string;
}

export interface ProjectSkillTombstoneResult {
  readonly removed: boolean;
}

export interface ProjectSkillTombstoneRecord {
  readonly skillId: string;
  readonly revokedAt: string;
  readonly lastContentHash: string;
}

export interface ProjectSkillLocalMirrorRef {
  readonly skillId: string;
  /** Local meta.json contentHash when History could read it. */
  readonly contentHash: string;
}

type MaybePromise<T> = T | Promise<T>;

export interface ProjectSkillHistoryPort {
  /** History ON for this project (pending: History owns the flag source). */
  readonly isHistoryEnabled: (projectId: string) => MaybePromise<boolean>;
  readonly resolveProjectDataDir: (projectId: string) => MaybePromise<string>;
  readonly writeProjectSkillVersion: (
    input: ProjectSkillVersionWriteInput,
  ) => MaybePromise<ProjectSkillVersionWriteResult>;
  readonly readProjectSkillVersion: (
    input: ProjectSkillVersionReadInput,
  ) => MaybePromise<ProjectSkillVersionReadResult | null>;
  /**
   * Tombstone + clear skill mirror (History owns FS). Write clears tombstone.
   * Rejects `_`-prefixed skillIds. Idempotent when already gone.
   */
  readonly tombstoneProjectSkill: (
    input: ProjectSkillTombstoneInput,
  ) => MaybePromise<ProjectSkillTombstoneResult>;
  readonly readProjectSkillTombstone: (input: {
    readonly projectId: string;
    readonly skillId: string;
  }) => MaybePromise<ProjectSkillTombstoneRecord | null>;
  /** Local mirrors under project-data/<projectId>/skills/ (no `_`-prefixed). */
  readonly listProjectSkillIds: (input: {
    readonly projectId: string;
  }) => MaybePromise<readonly ProjectSkillLocalMirrorRef[]>;
}
