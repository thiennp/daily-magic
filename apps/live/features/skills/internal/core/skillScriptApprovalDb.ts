import type { SkillIndexDb } from "./skillIndex.types";

export type ScriptApprovalStatus = "approved" | "denied" | "pending";

export type ScriptKey = {
  readonly projectId: string;
  readonly skillId: string;
  readonly script: string;
  readonly sha256: string;
};

/** Approval is pinned to the script hash: a new version needs a new approval. */
export const getScriptApproval = (
  db: SkillIndexDb,
  key: ScriptKey,
): ScriptApprovalStatus | null => {
  const row = db
    .prepare(
      `SELECT status FROM skill_script_approval WHERE project_id = ?
       AND skill_id = ? AND script = ? AND sha256 = ?`,
    )
    .get(key.projectId, key.skillId, key.script, key.sha256) as
    { status: string } | undefined;
  return row === undefined ? null : (row.status as ScriptApprovalStatus);
};

export const setScriptApproval = (
  db: SkillIndexDb,
  key: ScriptKey,
  status: ScriptApprovalStatus,
): void => {
  db.prepare(
    `INSERT OR REPLACE INTO skill_script_approval (project_id, skill_id,
      script, sha256, status, decided_at) VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(
    key.projectId,
    key.skillId,
    key.script,
    key.sha256,
    status,
    new Date().toISOString(),
  );
};
