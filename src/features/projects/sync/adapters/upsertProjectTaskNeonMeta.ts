/**
 * Allowlisted Neon meta upsert port — History reconcile calls this (SPEC §3.2 / §7).
 * Meta fields only. Rejects body denylist; strips unknown keys.
 * Interim: maps status/timestamps onto agent_runs; never writes prompt/result_output.
 * Implements PushNeonMetaPort from History reconcile (imported, not re-declared).
 */

import type { PushNeonMetaPort } from "@agent-witch/live-project-history";
import type { ProjectTaskNeonMeta } from "@/features/projects/sync/adapters/projectTasksAdapter";
import { pickProjectTaskNeonMetaAllowlist } from "@/features/projects/sync/adapters/projectTasksNeonMeta";
import { writeAgentRunStatusFromMeta } from "@/features/projects/sync/adapters/writeAgentRunStatusFromMeta";

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
  /** Who writes: only the owner moves a pending run; a member only touches runs they execute. */
  readonly actor: { readonly userId: string; readonly isOwner: boolean };
  readonly batch: readonly Readonly<Record<string, unknown>>[];
}): Promise<UpsertProjectTaskNeonMetaResult> => {
  const gate = gateBatch(input.batch);
  if (!gate.ok) {
    return gate;
  }
  const gated = gate.metas;

  // Validate ALL rows before ANY UPDATE (all-or-nothing).
  const foreign = gated.find((meta) => meta.projectId !== input.projectId);
  if (foreign !== undefined) {
    return {
      ok: false,
      reason: `projectId mismatch for meta ${foreign.id}`,
    };
  }

  const updatedAgentRunIds: string[] = [];
  for (const meta of gated) {
    const row = await writeAgentRunStatusFromMeta({
      projectId: input.projectId,
      actor: input.actor,
      meta,
    });
    if (row !== null) {
      updatedAgentRunIds.push(String(row.id ?? meta.agentRunId ?? meta.id));
    }
  }

  return {
    ok: true,
    upserted: gated,
    updatedAgentRunIds,
  };
};

const gateBatch = (
  batch: readonly Readonly<Record<string, unknown>>[],
):
  | { readonly ok: true; readonly metas: ProjectTaskNeonMeta[] }
  | { readonly ok: false; readonly reason: string } => {
  try {
    return { ok: true, metas: gateProjectTaskNeonMetaBatch(batch) };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Neon meta reject";
    return { ok: false, reason: message };
  }
};

/**
 * History reconcile `PushNeonMetaPort` — wires allowlisted upsert.
 * Prefer this over `stubPushNeonMetaPort` when AWC_PROJECT_SYNC_MODULE is on.
 */
export const createPushNeonMetaPort = (
  projectId: string,
  actor: { readonly userId: string; readonly isOwner: boolean },
): PushNeonMetaPort => ({
  pushNeonMeta: async (batch) => {
    const result = await upsertProjectTaskNeonMeta({
      projectId,
      actor,
      batch,
    });
    if (!result.ok) {
      return { ok: false, reason: result.reason };
    }
    return { ok: true };
  },
});
