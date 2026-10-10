import fs from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";

import { recordBotClaim } from "@/lib/knowledge/bots/recordBotKnowledgeEvents";

/** PGlite with the real 136 migration, a user_projects stub and the lookup log columns used. */
export const createBotKnowledgeDb = async (): Promise<{
  readonly db: PGlite;
  readonly sql: (
    strings: TemplateStringsArray,
    ...values: unknown[]
  ) => Promise<unknown[]>;
}> => {
  const db = new PGlite();
  await db.exec("CREATE TABLE user_projects (id TEXT PRIMARY KEY)");
  await db.exec(`CREATE TABLE project_skill_lookup_log (
    project_id TEXT, actor_user_id TEXT, returned INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);
  await db.exec(
    fs.readFileSync(
      path.resolve(
        __dirname,
        "../../../../db/migrations/136-project-bot-knowledge-events.sql",
      ),
      "utf-8",
    ),
  );
  const sql = async (strings: TemplateStringsArray, ...values: unknown[]) => {
    const text = strings.reduce((acc, part, i) => `${acc}$${i}${part}`);
    return (await db.query(text, values)).rows;
  };
  return { db, sql };
};

export const resetBotKnowledgeDb = async (db: PGlite): Promise<void> => {
  await db.exec(
    "DELETE FROM project_bot_knowledge_events; DELETE FROM project_skill_lookup_log; DELETE FROM user_projects;",
  );
  await db.exec("INSERT INTO user_projects (id) VALUES ('p1')");
};

export const logLookup = (db: PGlite, returned: number): Promise<unknown> =>
  db.exec(
    `INSERT INTO project_skill_lookup_log (project_id, actor_user_id, returned) VALUES ('p1', 'u1', ${returned})`,
  );

export const claimTask = (taskId: string): Promise<void> =>
  recordBotClaim({
    projectId: "p1",
    taskId,
    fence: 1,
    membershipId: "m1",
    actorUserId: "u1",
    skillId: null,
    effortTier: "low",
  });

export const eventRows = async (
  db: PGlite,
): Promise<Record<string, unknown>[]> =>
  (await db.query("SELECT * FROM project_bot_knowledge_events ORDER BY id"))
    .rows as Record<string, unknown>[];
