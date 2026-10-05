import type { ProjectCompositionSnapshotItemWire } from "@agent-witch/shared/protocol";

import { getSql } from "@/lib/db";

/**
 * Idempotent bind upsert.
 * Rule: a bind always leaves the active row enabled=true (insert and conflict-update).
 * Relies on unique index project_components_active_project_component_idx
 * (project_id, component_id) WHERE removed_at IS NULL.
 */
const upsertProjectComponentBinding = async (input: {
  readonly projectId: string;
  readonly componentId: string;
  readonly kind: ProjectCompositionSnapshotItemWire["kind"];
  readonly pinnedVersionId: string | null;
}): Promise<void> => {
  const sql = getSql();
  const channel = input.pinnedVersionId !== null ? "pinned" : "latest";

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
      ${input.componentId},
      ${input.kind},
      ${channel},
      ${input.pinnedVersionId},
      true,
      'repo'
    )
    ON CONFLICT (project_id, component_id) WHERE removed_at IS NULL
    DO UPDATE SET
      kind = EXCLUDED.kind,
      channel = EXCLUDED.channel,
      pinned_version_id = EXCLUDED.pinned_version_id,
      enabled = true,
      materialize_target = EXCLUDED.materialize_target,
      updated_at = NOW()
  `;
};

export default upsertProjectComponentBinding;
