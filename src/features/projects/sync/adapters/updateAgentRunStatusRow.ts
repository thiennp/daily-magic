import { asRowArray, getSql } from "@/lib/db";
import type { ProjectTaskNeonMeta } from "@/features/projects/sync/adapters/projectTasksAdapter";

/**
 * The guarded UPDATE of one agent_run from sync meta. Forward-only, scoped to the project, and
 * a non-owner only touches runs they execute; only the owner moves a pending_approval run.
 */
export const updateAgentRunStatusRow = async (input: {
  readonly runId: string;
  readonly projectId: string;
  readonly actor: { readonly userId: string; readonly isOwner: boolean };
  readonly agentStatus: string;
  readonly meta: ProjectTaskNeonMeta;
}): Promise<Record<string, unknown> | null> => {
  const { runId, agentStatus, meta } = input;
  const sql = getSql();
  const isTerminalWrite =
    agentStatus === "completed" ||
    agentStatus === "failed" ||
    agentStatus === "denied" ||
    agentStatus === "expired";
  // HARD: never SET prompt / result_output / body columns.
  // Terminal / forward-only / staleness also enforced in WHERE.
  const rows = asRowArray(
    await sql`
      UPDATE agent_runs
      SET status = ${agentStatus},
          updated_at = COALESCE(
            ${meta.updatedAt}::timestamptz,
            NOW()
          ),
          started_at = CASE
            WHEN ${agentStatus} = 'running' THEN COALESCE(
              ${meta.startedAt}::timestamptz,
              started_at,
              NOW()
            )
            ELSE COALESCE(
              ${meta.startedAt}::timestamptz,
              started_at
            )
          END,
          completed_at = CASE
            WHEN ${isTerminalWrite} THEN COALESCE(
              ${meta.endedAt}::timestamptz,
              completed_at,
              NOW()
            )
            ELSE completed_at
          END
      WHERE id = ${runId}
        AND project_id = ${input.projectId}
        AND (${input.actor.isOwner} OR executor_user_id = ${input.actor.userId})
        AND status NOT IN ('completed', 'failed', 'denied', 'expired')
        AND updated_at <= COALESCE(
          ${meta.updatedAt}::timestamptz,
          updated_at
        )
        AND (
          (
            status = 'pending_approval'
            AND ${input.actor.isOwner}
            AND ${agentStatus} IN (
              'running', 'completed', 'failed', 'denied', 'expired'
            )
          )
          OR (
            status = 'running'
            AND ${agentStatus} IN (
              'running', 'completed', 'failed', 'denied', 'expired'
            )
          )
        )
      RETURNING *
    `,
  );
  return (rows[0] as Record<string, unknown> | undefined) ?? null;
};
