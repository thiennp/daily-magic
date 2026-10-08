import { PGlite } from "@electric-sql/pglite";

import { GROK_WEBHOOK_STATUS_PGLITE_SCHEMA } from "@/lib/projects/acl/webhooks/grokWebhookStatusPglite.schema";

export const GROK_STATUS_PROJECT_ID = "proj-grok-status";
export const GROK_STATUS_MEMBERSHIP_ID = "mem-grok-status";
export const GROK_STATUS_USER_ID = "bot-user-grok";

export type GrokWebhookStatusDb = {
  readonly sql: (
    strings: TemplateStringsArray,
    ...values: unknown[]
  ) => Promise<unknown[]>;
  readonly saveWebhook: (input: {
    readonly agoSeconds: number;
    readonly url?: string;
  }) => Promise<void>;
  readonly attempt: (input: {
    readonly messageId: string;
    readonly result: string;
    readonly agoSeconds: number;
  }) => Promise<void>;
  readonly reset: () => Promise<void>;
};

export const createGrokWebhookStatusDb =
  async (): Promise<GrokWebhookStatusDb> => {
    const db = new PGlite();
    await db.exec(GROK_WEBHOOK_STATUS_PGLITE_SCHEMA);
    await db.query(
      "INSERT INTO project_memberships (id, project_id, user_id, status, role, project_display_name) VALUES ($1, $2, $3, 'active', 'member', 'Magi')",
      [GROK_STATUS_MEMBERSHIP_ID, GROK_STATUS_PROJECT_ID, GROK_STATUS_USER_ID],
    );
    const sql = async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const text = strings.reduce(
        (acc, part, index) => `${acc}$${index}${part}`,
      );
      return (await db.query(text, values)).rows;
    };
    const saveWebhook = async (input: {
      readonly agoSeconds: number;
      readonly url?: string;
    }) => {
      await db.query(
        `INSERT INTO project_membership_grok_routine_webhooks (membership_id, project_id, user_id, webhook_url, bearer_retained, updated_at)
         VALUES ($1, $2, $3, $4, 'sekret', NOW() - make_interval(secs => $5))
         ON CONFLICT (membership_id) DO UPDATE SET webhook_url = EXCLUDED.webhook_url, bearer_retained = EXCLUDED.bearer_retained, updated_at = NOW() - make_interval(secs => $5)`,
        [
          GROK_STATUS_MEMBERSHIP_ID,
          GROK_STATUS_PROJECT_ID,
          GROK_STATUS_USER_ID,
          input.url ?? "https://hooks.example.com/wake",
          input.agoSeconds,
        ],
      );
    };
    const attempt = async (input: {
      readonly messageId: string;
      readonly result: string;
      readonly agoSeconds: number;
    }) => {
      await db.query(
        "INSERT INTO project_grok_routine_wake_attempts (message_id, membership_id, result, created_at) VALUES ($1, $2, $3, NOW() - make_interval(secs => $4))",
        [
          input.messageId,
          GROK_STATUS_MEMBERSHIP_ID,
          input.result,
          input.agoSeconds,
        ],
      );
    };
    const reset = async () => {
      await db.exec(
        "DELETE FROM project_grok_routine_wake_attempts; DELETE FROM project_membership_grok_routine_webhooks;",
      );
    };
    return { sql, saveWebhook, attempt, reset };
  };
