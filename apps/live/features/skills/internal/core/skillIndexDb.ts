import type {
  IndexedSkill,
  SkillDescriptor,
  SkillIndexDb,
} from "./skillIndex.types";

type Row = Record<string, unknown>;

const toVector = (blob: unknown): Float32Array | null =>
  blob instanceof Uint8Array && blob.byteLength >= 4
    ? new Float32Array(
        blob.buffer.slice(blob.byteOffset, blob.byteOffset + blob.byteLength),
      )
    : null;

const toIndexed = (r: Row): IndexedSkill => ({
  skillId: String(r.skill_id),
  projectId: String(r.project_id),
  name: String(r.name),
  description: String(r.description),
  whenToUse: String(r.when_to_use),
  keywords: String(r.keywords),
  version: Number(r.version),
  hasScripts: Number(r.has_scripts) === 1,
  vector: toVector(r.embedding),
  updatedAt: String(r.updated_at),
});

export const upsertSkillRow = (
  db: SkillIndexDb,
  skill: SkillDescriptor,
  vector: Float32Array | null,
): void => {
  const blob =
    vector === null
      ? null
      : new Uint8Array(vector.buffer, vector.byteOffset, vector.byteLength);
  db.prepare(
    `INSERT OR REPLACE INTO skill_index (skill_id, project_id, name,
      description, when_to_use, keywords, embedding, version, has_scripts,
      updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    skill.skillId,
    skill.projectId,
    skill.name,
    skill.description,
    skill.whenToUse,
    skill.keywords,
    blob,
    skill.version,
    skill.hasScripts ? 1 : 0,
    new Date().toISOString(),
  );
};

export const deleteSkillRow = (
  db: SkillIndexDb,
  projectId: string,
  skillId: string,
): void => {
  db.prepare(
    "DELETE FROM skill_index WHERE project_id = ? AND skill_id = ?",
  ).run(projectId, skillId);
};

export const getSkillRow = (
  db: SkillIndexDb,
  projectId: string,
  skillId: string,
): IndexedSkill | null => {
  const row = db
    .prepare("SELECT * FROM skill_index WHERE project_id = ? AND skill_id = ?")
    .get(projectId, skillId) as Row | undefined;
  return row === undefined ? null : toIndexed(row);
};

export const listSkillRows = (
  db: SkillIndexDb,
  projectId: string,
): IndexedSkill[] =>
  (
    db
      .prepare("SELECT * FROM skill_index WHERE project_id = ?")
      .all(projectId) as Row[]
  ).map(toIndexed);

/** Cheap change stamp: count + newest update (cache key for the search corpus). */
export const readSkillIndexStamp = (
  db: SkillIndexDb,
  projectId: string,
): string => {
  const row = db
    .prepare(
      "SELECT COUNT(*) AS n, MAX(updated_at) AS u FROM skill_index WHERE project_id = ?",
    )
    .get(projectId) as Row;
  return `${Number(row.n)}:${String(row.u ?? "")}`;
};

export const countIndexedSkills = (
  db: SkillIndexDb,
  projectId: string,
): number => Number(readSkillIndexStamp(db, projectId).split(":")[0]);
