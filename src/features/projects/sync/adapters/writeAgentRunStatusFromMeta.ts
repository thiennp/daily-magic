import { asRowArray, getSql } from "@/lib/db";
import { updateAgentRunStatusRow } from "@/features/projects/sync/adapters/updateAgentRunStatusRow";
import { registerAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type { ProjectTaskNeonMeta } from "@/features/projects/sync/adapters/projectTasksAdapter";
import {
  decideAgentRunSyncStatusWrite,
  mapProjectTaskUiStatusToAgentRun,
} from "@/features/projects/sync/adapters/projectTasksNeonMeta";

/**
 * One allowlisted meta row → forward-only status + timestamps on its agent_run.
 * Returns the updated row, or null when nothing was written (no mapped status, run not
 * in this project, caller may not touch it, stale or illegal transition).
 */
export const writeAgentRunStatusFromMeta = async (input: {
  readonly projectId: string;
  readonly actor: { readonly userId: string; readonly isOwner: boolean };
  readonly meta: ProjectTaskNeonMeta;
}): Promise<Record<string, unknown> | null> => {
  const { meta } = input;
  const sql = getSql();
  const runId = meta.agentRunId ?? meta.id;
  const mapped = mapProjectTaskUiStatusToAgentRun(meta.status);
  // queued / no mapped status → no-op (never write pending_approval).
  if (mapped === null) {
    return null;
  }

  const currentRows = asRowArray(
    await sql`
      SELECT id, status,
        to_char(updated_at AT TIME ZONE 'UTC',
          'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS updated_at
      FROM agent_runs
      WHERE id = ${runId}
        AND project_id = ${input.projectId}
      LIMIT 1
    `,
  );
  if (currentRows.length === 0) {
    return null;
  }
  const current = currentRows[0]!;
  const decision = decideAgentRunSyncStatusWrite({
    currentStatus: String(current.status ?? ""),
    currentUpdatedAt:
      typeof current.updated_at === "string" ? current.updated_at : null,
    incomingUiStatus: meta.status,
    incomingUpdatedAt: meta.updatedAt,
    incomingVersion: meta.version,
  });
  if (decision.action !== "write") {
    return null;
  }

  const row = await updateAgentRunStatusRow({
    runId,
    projectId: input.projectId,
    actor: input.actor,
    agentStatus: decision.status,
    meta,
  });
  if (row !== null) {
    try {
      registerAgentRunSession(mapAgentRunRow(row));
    } catch {
      // Cache sync best-effort — Neon write already committed.
    }
  }
  return row;
};
