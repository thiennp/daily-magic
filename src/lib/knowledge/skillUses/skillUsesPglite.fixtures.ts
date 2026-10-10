import type { PGlite } from "@electric-sql/pglite";

export const publishSkill = (
  db: PGlite,
  skillId: string,
  version: number,
  state = "published",
): Promise<unknown> =>
  db.exec(
    `INSERT INTO project_skills (project_id, skill_id, state, published_version) VALUES ('p1', '${skillId}', '${state}', ${version})`,
  );

export const logSkillGet = (db: PGlite, skillId: string): Promise<unknown> =>
  db.exec(
    `INSERT INTO project_skill_lookup_log (project_id, actor_user_id, returned, tool, skill_id) VALUES ('p1', 'u1', 1, 'get', '${skillId}')`,
  );

export const skillUseRows = async (
  db: PGlite,
): Promise<Record<string, unknown>[]> =>
  (
    await db.query(
      "SELECT skill_id, skill_version, task_id, source, outcome, reason_fingerprint FROM project_skill_uses ORDER BY task_id, skill_id",
    )
  ).rows as Record<string, unknown>[];

export const skillCheckRows = async (
  db: PGlite,
): Promise<Record<string, unknown>[]> =>
  (
    await db.query(
      "SELECT skill_id, skill_version, uses_at_check, trigger, status FROM project_skill_checks ORDER BY skill_id, uses_at_check",
    )
  ).rows as Record<string, unknown>[];
