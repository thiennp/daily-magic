/** Test-only fake DB for the guarded Grok webhook write/read. */
export type GrokWebhookSqlState = {
  /** Guarded INSERT … SELECT finds an active, named, in-scope row. */
  writable: boolean;
  /** Row exists in scope (used to explain a miss: naming_required vs not_found). */
  present: boolean;
  /** Status SELECT row, or null when no in-scope membership. */
  statusRow: Record<string, unknown> | null;
  /** HMAC status SELECT row; omit or null → empty (no membership) when statusRow is null. */
  hmacStatusRow?: Record<string, unknown> | null;
};

export const GUARDED_INSERT =
  "INSERT INTO project_membership_grok_routine_webhooks";

export const grokWebhookSql =
  (state: GrokWebhookSqlState) =>
  async (strings: TemplateStringsArray, ...values: unknown[]) => {
    const text = strings.join("?");
    if (text.includes(GUARDED_INSERT)) {
      return state.writable ? [{ webhook_url: values[0] }] : [];
    }
    if (text.includes("SELECT member_kind, invited_by_user_id")) {
      return state.present
        ? [{ member_kind: "human", invited_by_user_id: null }]
        : [];
    }
    if (text.includes("SELECT 1 AS present")) {
      return state.present ? [{ present: 1 }] : [];
    }
    if (text.includes("LEFT JOIN project_membership_grok_routine_webhooks")) {
      return state.statusRow === null ? [] : [state.statusRow];
    }
    if (text.includes("LEFT JOIN project_membership_webhooks")) {
      if (state.statusRow === null) {
        return [];
      }
      if (state.hmacStatusRow === undefined || state.hmacStatusRow === null) {
        return [{ webhook_url: null, secret_set: false }];
      }
      return [state.hmacStatusRow];
    }
    return [];
  };
