/**
 * Allowlisted Neon meta upsert port — History reconcile calls this (SPEC §3.2 / §7).
 * Meta fields only. Rejects body denylist; strips unknown keys.
 * Interim: maps status/timestamps onto agent_runs; never writes prompt/result_output.
 * Implements PushNeonMetaPort shape from History reconcile.
 */

import { asRowArray, getSql } from "@/lib/db";
import type { ProjectTaskNeonMeta } from "@/features/projects/sync/adapters/projectTasksAdapter";
import {
  mapProjectTaskUiStatusToAgentRun,
  pickProjectTaskNeonMetaAllowlist,
} from "@/features/projects/sync/adapters/projectTasksNeonMeta";
import { PROJECT_SYNC_RECONCILE_BATCH_SIZE } from "@/features/projects/sync/projectSync.types";

/** Same shape as History `PushNeonMetaPort` (structural — wire into reconcile). */
export type PushNeonMetaPort = {
  readonly pushNeonMeta: (
    batch: readonly ProjectTaskNeonMeta[],
  ) => Promise<
    { readonly ok: true } | { readonly ok: false; readonly reason: string }
  >;
};

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
 * Interim agent_runs writeback: status + timestamps only (no prompt/body).
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

  const size = Math.max(
    1,
    Math.floor(input.batchSize ?? PROJECT_SYNC_RECONCILE_BATCH_SIZE),
  );
  const updatedAgentRunIds: string[] = [];
  const sql = getSql();

  for (let offset = 0; offset < gated.length; offset += size) {
    const chunk = gated.slice(offset, offset + size);
    for (const meta of chunk) {
      if (meta.projectId !== input.projectId) {
        return {
          ok: false,
          reason: `projectId mismatch for meta ${meta.id}`,
        };
      }
      const runId = meta.agentRunId ?? meta.id;
      const agentStatus = mapProjectTaskUiStatusToAgentRun(meta.status);
      // HARD: never SET prompt / result_output / body columns.
      const rows = asRowArray(
        await sql`
          UPDATE agent_runs
          SET status = ${agentStatus},
              updated_at = COALESCE(
                ${meta.updatedAt}::timestamptz,
                NOW()
              ),
              started_at = COALESCE(
                ${meta.startedAt}::timestamptz,
                started_at
              ),
              completed_at = COALESCE(
                ${meta.endedAt}::timestamptz,
                completed_at
              )
          WHERE id = ${runId}
            AND project_id = ${input.projectId}
          RETURNING id
        `,
      );
      if (rows.length > 0) {
        updatedAgentRunIds.push(String(rows[0]?.id ?? runId));
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
