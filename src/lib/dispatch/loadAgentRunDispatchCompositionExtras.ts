import type { ProjectCompositionSnapshotWire } from "@agent-witch/shared/protocol";

import loadProjectCompositionSnapshotWireById from "@/lib/projects/composition/loadProjectCompositionSnapshotWireById";
import { asRowArray, getSql } from "@/lib/db";

export type AgentRunDispatchCompositionExtras = {
  readonly projectId: string | null;
  readonly compositionSnapshot: ProjectCompositionSnapshotWire | null;
};

const loadAgentRunDispatchCompositionExtras = async (
  agentRunId: string,
): Promise<AgentRunDispatchCompositionExtras> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT project_id, composition_snapshot_id
      FROM agent_runs
      WHERE id = ${agentRunId}
      LIMIT 1
    `,
  );

  if (rows.length === 0) {
    return { projectId: null, compositionSnapshot: null };
  }

  const row = rows[0];
  const projectId =
    row.project_id !== null && row.project_id !== undefined
      ? String(row.project_id)
      : null;
  const snapshotId =
    row.composition_snapshot_id !== null &&
    row.composition_snapshot_id !== undefined
      ? String(row.composition_snapshot_id)
      : null;

  if (snapshotId === null) {
    return { projectId, compositionSnapshot: null };
  }

  const compositionSnapshot =
    await loadProjectCompositionSnapshotWireById(snapshotId);

  return { projectId, compositionSnapshot };
};

export default loadAgentRunDispatchCompositionExtras;
