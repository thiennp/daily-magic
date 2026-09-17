import type { ProjectCompositionSnapshotItemWire } from "@agent-witch/shared/protocol";

import { getSql } from "@/lib/db";

const keepRunScopedComponentsInProject = async (input: {
  readonly ownerUserId: string;
  readonly projectId: string;
  readonly runScopedEntries: readonly ProjectCompositionSnapshotItemWire[];
}): Promise<{ readonly ok: true; readonly boundCount: number }> => {
  const sql = getSql();
  const runEntries = input.runScopedEntries.filter(
    (entry) => entry.scope === "run",
  );

  for (const entry of runEntries) {
    await sql`
      UPDATE project_components
      SET removed_at = NOW(), updated_at = NOW()
      WHERE project_id = ${input.projectId}
        AND component_id = ${entry.componentId}
        AND removed_at IS NULL
    `;

    await sql`
      INSERT INTO project_components (
        project_id,
        component_id,
        kind,
        channel,
        pinned_version_id,
        enabled,
        materialize_target
      )
      VALUES (
        ${input.projectId},
        ${entry.componentId},
        ${entry.kind},
        'pinned',
        ${entry.versionId},
        true,
        'repo'
      )
    `;
  }

  return { ok: true, boundCount: runEntries.length };
};

export default keepRunScopedComponentsInProject;
