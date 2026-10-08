import type { DatabaseSync } from "node:sqlite";

/** Local SQLite next to knowledge.db (same handle, own tables). */
export type AutoSkillModuleDb = Pick<DatabaseSync, "exec" | "prepare">;

export type StoredModule = {
  readonly id: string;
  readonly clusterId: string;
  readonly hash: string;
  /** Full canonical text, or a 200-char preview when history is OFF. */
  readonly text: string;
  readonly vector: Float32Array | null;
};

const toVector = (blob: unknown): Float32Array | null =>
  blob instanceof Uint8Array && blob.byteLength >= 4
    ? new Float32Array(
        blob.buffer.slice(blob.byteOffset, blob.byteOffset + blob.byteLength),
      )
    : null;

const toStored = (r: Record<string, unknown>): StoredModule => ({
  id: String(r.id),
  clusterId: String(r.cluster_id),
  hash: String(r.hash),
  text: String(r.canonical),
  vector: toVector(r.vector),
});

export const findModuleByHash = (
  db: AutoSkillModuleDb,
  projectId: string,
  hash: string,
): StoredModule | null => {
  const row = db
    .prepare("SELECT * FROM module WHERE project_id = ? AND hash = ?")
    .get(projectId, hash) as Record<string, unknown> | undefined;
  return row === undefined ? null : toStored(row);
};

export const listRecentModules = (
  db: AutoSkillModuleDb,
  projectId: string,
  limit: number,
): StoredModule[] =>
  (
    db
      .prepare(
        "SELECT * FROM module WHERE project_id = ? ORDER BY created_at DESC LIMIT ?",
      )
      .all(projectId, limit) as Record<string, unknown>[]
  ).map(toStored);

export const insertModule = (
  db: AutoSkillModuleDb,
  row: StoredModule & {
    readonly projectId: string;
    readonly verb: string;
    readonly target: string;
    readonly paramsJson: string;
    readonly runId: string;
  },
): void => {
  const vector =
    row.vector === null
      ? null
      : new Uint8Array(
          row.vector.buffer,
          row.vector.byteOffset,
          row.vector.byteLength,
        );
  db.prepare(
    `INSERT OR IGNORE INTO module (id, project_id, cluster_id, hash, canonical,
      verb, target, params_json, vector, first_seen_run, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    row.id,
    row.projectId,
    row.clusterId,
    row.hash,
    row.text,
    row.verb,
    row.target,
    row.paramsJson,
    vector,
    row.runId,
    new Date().toISOString(),
  );
};
