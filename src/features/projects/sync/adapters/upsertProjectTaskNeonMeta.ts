/**
 * Allowlisted Neon meta upsert port — History reconcile calls this (SPEC §3.2 / §7).
 * Meta fields only. Rejects body denylist; strips unknown keys.
 * Interim: maps status/timestamps onto agent_runs; never writes prompt/result_output.
 * Implements PushNeonMetaPort from History reconcile (imported, not re-declared).
 */

import type { PushNeonMetaPort } from "@agent-witch/live-project-history";
import { asRowArray, getSql } from "@/lib/db";
import { registerAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import type { ProjectTaskNeonMeta } from "@/features/projects/sync/adapters/projectTasksAdapter";
import {
  decideAgentRunSyncStatusWrite,
  mapProjectTaskUiStatusToAgentRun,
  pickProjectTaskNeonMetaAllowlist,
} from "@/features/projects/sync/adapters/projectTasksNeonMeta";
import { PROJECT_SYNC_RECONCILE_BATCH_SIZE } from "@/features/projects/sync/projectSync.types";

export type { PushNeonMetaPort };

export type UpsertProjectTaskNeonMetaResult =
  | {
      readonly ok: true;
      readonly upserted: readonly ProjectTaskNeonMeta[];
      readonly updatedAgentRunIds: readonly string[];
    }
  | {
      readonly ok: false;
      readonly reason: string;
      readonly offenders?: readonly string[];
    };

/**
 * Pure allowlist gate used by the I/O upsert and by conflict tests.
 * Throws on body fields; returns stripped meta batch otherwise.
 */
export const gateProjectTaskNeonMetaBatch = (
  batch: readonly Readonly<Record<string, unknown>>[],
): ProjectTaskNeonMeta[] =>
  batch.map((row) => pickProjectTaskNeonMetaAllowlist(row));

/**
 * Allowlisted upsert. Rejects any row carrying body fields.
 * Interim agent_runs writeback: forward-only status + timestamps (no prompt/body).
 * All-or-nothing: validate every row before any UPDATE.
 */
export const upsertProjectTaskNeonMeta = async (input: {
  readonly projectId: string;
  readonly batch: readonly Readonly<Record<string, unknown>>[];
  readonly batchSize?: number;
}): Promise<UpsertProjectTaskNeonMetaResult> => {
  let gated: ProjectTaskNeonMeta[];
  try {
    gated = gateProjectTaskNeonMetaBatch(input.batch);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Neon meta reject";
    return { ok: false, reason: message };
  }

  // Validate ALL rows before ANY UPDATE (all-or-nothing).
  for (const meta of gated) {
    if (meta.projectId !== input.projectId) {
      return {
        ok: false,
        reason: `projectId mismatch for meta ${meta.id}`,
      };
    }
  }

  const size = Math.max(
    1,
    Math.floor(input.batchSize ?? PROJECT_SYNC_RECONCILE_BATCH_SIZE),
  );
  const updatedAgentRunIds: string[] = [];
  const sql = getSql();

  for (let offset = 0; offset < gated.length; offset += size) {
    const chunk = gated.slice(offset, offset + size);
    for (const meta of chunk) {
      const runId = meta.agentRunId ?? meta.id;
      const mapped = mapProjectTaskUiStatusToAgentRun(meta.status);
      // queued / no mapped status → no-op (never write pending_approval).
      if (mapped === null) {
        continue;
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
        continue;
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
        continue;
      }

      const agentStatus = decision.status;
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
            AND status NOT IN ('completed', 'failed', 'denied', 'expired')
            AND updated_at <= COALESCE(
              ${meta.updatedAt}::timestamptz,
              updated_at
            )
            AND (
              (
                status = 'pending_approval'
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
      if (rows.length > 0) {
        const row = rows[0] as Record<string, unknown>;
        updatedAgentRunIds.push(String(row.id ?? runId));
        try {
          registerAgentRunSession(mapAgentRunRow(row));
        } catch {
          // Cache sync best-effort — Neon write already committed.
        }
      }
    }
  }

  return {
    ok: true,
    upserted: gated,
    updatedAgentRunIds,
  };
};

/**
 * History reconcile `PushNeonMetaPort` — wires allowlisted upsert.
 * Prefer this over `stubPushNeonMetaPort` when AWC_PROJECT_SYNC_MODULE is on.
 */
export const createPushNeonMetaPort = (
  projectId: string,
): PushNeonMetaPort => ({
  pushNeonMeta: async (batch) => {
    const result = await upsertProjectTaskNeonMeta({
      projectId,
      batch,
    });
    if (!result.ok) {
      return { ok: false, reason: result.reason };
    }
    return { ok: true };
  },
});
