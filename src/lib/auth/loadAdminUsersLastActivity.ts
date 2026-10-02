import toAdminActivityIso from "@/lib/auth/toAdminActivityIso";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Per-user lastActivityAt from max of:
 * agent_access_tokens.last_used_at, project_api_keys.last_used_at,
 * user_projects.last_used_at (owned). Skips sessions.expires (not activity).
 */
const loadAdminUsersLastActivity = async (): Promise<
  ReadonlyMap<string, string>
> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT user_id, MAX(activity_at) AS last_activity_at
      FROM (
        SELECT user_id, last_used_at AS activity_at
        FROM agent_access_tokens
        WHERE last_used_at IS NOT NULL
        UNION ALL
        SELECT user_id, last_used_at AS activity_at
        FROM project_api_keys
        WHERE last_used_at IS NOT NULL
        UNION ALL
        SELECT owner_user_id AS user_id, last_used_at AS activity_at
        FROM user_projects
        WHERE last_used_at IS NOT NULL
      ) sources
      GROUP BY user_id
    `,
  );

  const map = new Map<string, string>();

  for (const row of rows) {
    const userId = String(row.user_id);
    const iso = toAdminActivityIso(row.last_activity_at);

    if (iso) {
      map.set(userId, iso);
    }
  }

  return map;
};

export default loadAdminUsersLastActivity;
