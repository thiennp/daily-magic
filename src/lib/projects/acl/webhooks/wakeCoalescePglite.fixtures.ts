import { PGlite } from "@electric-sql/pglite";

/**
 * Test-only real Postgres (PGlite, in-memory WASM) with the columns the wake
 * coalesce SQL reads. Times are seconds before NOW().
 */
export type WakeCoalesceDb = {
  readonly sql: (
    strings: TemplateStringsArray,
    ...values: unknown[]
  ) => Promise<unknown[]>;
  readonly message: (input: {
    readonly id: string;
    readonly kind?: string;
    readonly agoSeconds: number;
    readonly read?: boolean;
  }) => Promise<void>;
  readonly attempt: (input: {
    readonly messageId: string;
    readonly result: string;
    readonly agoSeconds: number;
  }) => Promise<void>;
  readonly reset: () => Promise<void>;
};

const SCHEMA = `
  CREATE TABLE project_messages (
    id TEXT PRIMARY KEY, project_id TEXT NOT NULL, kind TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    read_at TIMESTAMPTZ, acked_at TIMESTAMPTZ
  );
  CREATE TABLE project_message_deliveries (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    message_id TEXT NOT NULL, membership_id TEXT NOT NULL
  );
  CREATE TABLE project_grok_routine_wake_attempts (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    message_id TEXT NOT NULL, membership_id TEXT NOT NULL,
    result TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

export const WAKE_COALESCE_PROJECT_ID = "proj-1";
export const WAKE_COALESCE_MEMBERSHIP_ID = "mem-a";

export const createWakeCoalesceDb = async (): Promise<WakeCoalesceDb> => {
  const db = new PGlite();
  await db.exec(SCHEMA);
  const sql = async (strings: TemplateStringsArray, ...values: unknown[]) => {
    const text = strings.reduce((acc, part, index) => `${acc}$${index}${part}`);
    const result = await db.query(text, values);
    return result.rows;
  };
  return {
    sql,
    message: async (input) => {
      await db.query(
        `INSERT INTO project_messages (id, project_id, kind, created_at, read_at)
         VALUES ($1, $2, $3, NOW() - make_interval(secs => $4),
           CASE WHEN $5 THEN NOW() ELSE NULL END)`,
        [
          input.id,
          WAKE_COALESCE_PROJECT_ID,
          input.kind ?? "task.ping",
          input.agoSeconds,
          input.read === true,
        ],
      );
      await db.query(
        `INSERT INTO project_message_deliveries (message_id, membership_id)
         VALUES ($1, $2)`,
        [input.id, WAKE_COALESCE_MEMBERSHIP_ID],
      );
    },
    attempt: async (input) => {
      await db.query(
        `INSERT INTO project_grok_routine_wake_attempts
           (message_id, membership_id, result, created_at)
         VALUES ($1, $2, $3, NOW() - make_interval(secs => $4))`,
        [
          input.messageId,
          WAKE_COALESCE_MEMBERSHIP_ID,
          input.result,
          input.agoSeconds,
        ],
      );
    },
    reset: async () => {
      await db.exec(`
        DELETE FROM project_grok_routine_wake_attempts;
        DELETE FROM project_message_deliveries;
        DELETE FROM project_messages;
      `);
    },
  };
};
