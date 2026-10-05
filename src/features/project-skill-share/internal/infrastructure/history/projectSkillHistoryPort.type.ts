/**
 * Contract implemented by AW History (AWL, `<profileDir>/project-data/…`).
 * We never write mirror files directly; History owns atomic writes,
 * dirs 0700 / files 0600, `vNNNN.md` + `meta.json { skillId, version, contentHash, updatedAt }`.
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
}
