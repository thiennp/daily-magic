import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";

/**
 * Which of these project memberships already have a wake link (owner-entered
 * Grok wake link, or a bot-registered other wake link). Flags only — never
 * selects URLs, bearer_retained, or secret_retained.
 */
export const loadProjectMemberWakeLinkSet = async (input: {
  readonly projectId: string;
  readonly membershipIds: readonly string[];
}): Promise<ReadonlyMap<string, boolean>> => {
  const result = new Map<string, boolean>();
  if (input.membershipIds.length === 0) {
    return result;
  }
  await ensureProjectAclSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT
        m.id,
        EXISTS (
          SELECT 1 FROM project_membership_grok_routine_webhooks g
          WHERE g.membership_id = m.id
            AND length(coalesce(g.webhook_url, '')) > 0
        ) AS grok_wake_link_set,
        EXISTS (
          SELECT 1 FROM project_membership_webhooks w
          WHERE w.membership_id = m.id
            AND w.enabled = TRUE
            AND length(coalesce(w.webhook_url, '')) > 0
        ) AS other_wake_link_set
      FROM project_memberships m
      WHERE m.project_id = ${input.projectId}::text
        AND m.id = ANY(${[...input.membershipIds]}::text[])
    `,
  );
  const truthy = (value: unknown): boolean => value === true || value === "t";
  for (const row of rows) {
    result.set(
      String(row.id),
      truthy(row.grok_wake_link_set) || truthy(row.other_wake_link_set),
    );
  }
  return result;
};
