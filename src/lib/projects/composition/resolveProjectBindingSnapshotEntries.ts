import type {
  CompositionSnapshotComponentKind,
  ProjectCompositionSnapshotItemWire,
} from "@agent-witch/shared/protocol";

import buildSnapshotEntryFromVersion from "@/lib/projects/composition/buildSnapshotEntryFromVersion";
import resolveLatestComponentVersionId from "@/lib/projects/resolveLatestComponentVersionId";
import { asRowArray, getSql } from "@/lib/db";

const normalizeKind = (kind: string): CompositionSnapshotComponentKind => {
  if (kind === "workflow" || kind === "agent" || kind === "harness") {
    return kind;
  }

  return "harness";
};

const resolveProjectBindingSnapshotEntries = async (
  projectId: string,
): Promise<readonly ProjectCompositionSnapshotItemWire[]> => {
  const sql = getSql();
  const bindingRows = asRowArray(
    await sql`
      SELECT
        pc.component_id,
        pc.kind,
        pc.channel,
        pc.pinned_version_id
      FROM project_components pc
      WHERE pc.project_id = ${projectId}
        AND pc.removed_at IS NULL
        AND pc.enabled = true
    `,
  );

  const entries: ProjectCompositionSnapshotItemWire[] = [];

  for (const row of bindingRows) {
    const componentId = String(row.component_id);
    const channel = String(row.channel);
    const pinned =
      row.pinned_version_id !== null && row.pinned_version_id !== undefined
        ? String(row.pinned_version_id)
        : "";

    const versionId =
      channel === "latest"
        ? await resolveLatestComponentVersionId(componentId)
        : pinned.length > 0
          ? pinned
          : null;

    if (versionId === null) {
      continue;
    }

    const entry = await buildSnapshotEntryFromVersion({
      componentId,
      kind: normalizeKind(String(row.kind)),
      scope: "project",
      versionId,
    });

    if (entry !== null) {
      entries.push(entry);
    }
  }

  return entries;
};

export default resolveProjectBindingSnapshotEntries;
