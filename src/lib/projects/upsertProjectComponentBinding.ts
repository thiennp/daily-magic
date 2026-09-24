import type { ProjectCompositionSnapshotItemWire } from "@agent-witch/shared/protocol";

import { getSql } from "@/lib/db";

const upsertProjectComponentBinding = async (input: {
  readonly projectId: string;
  readonly componentId: string;
  readonly kind: ProjectCompositionSnapshotItemWire["kind"];
  readonly pinnedVersionId: string | null;
}): Promise<void> => {
  const sql = getSql();

  await sql`
    UPDATE project_components
    SET removed_at = NOW(), updated_at = NOW()
    WHERE project_id = ${input.projectId}
      AND component_id = ${input.componentId}
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
      ${input.componentId},
      ${input.kind},
      ${input.pinnedVersionId !== null ? "pinned" : "latest"},
      ${input.pinnedVersionId},
      true,
      'repo'
    )
  `;
};

export default upsertProjectComponentBinding;
