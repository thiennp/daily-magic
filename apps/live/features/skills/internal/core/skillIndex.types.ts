import type { DatabaseSync } from "node:sqlite";

/** Local SQLite next to knowledge.db (same handle, own tables). */
export type SkillIndexDb = Pick<DatabaseSync, "exec" | "prepare">;

/** Returns null when embeddings are unavailable (Ollama down): keyword-only. */
export type SkillEmbedder = (text: string) => Promise<Float32Array | null>;

export type SkillDescriptor = {
  readonly skillId: string;
  readonly projectId: string;
  readonly name: string;
  readonly description: string;
  readonly whenToUse: string;
  readonly keywords: string;
  readonly version: number;
  readonly hasScripts: boolean;
};

export type IndexedSkill = SkillDescriptor & {
  readonly vector: Float32Array | null;
  readonly updatedAt: string;
};

/** Search result: never carries the skill body. */
export type SkillHit = {
  readonly skillId: string;
  readonly name: string;
  readonly description: string;
  readonly score: number;
};
