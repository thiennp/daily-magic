import type {
  CompositionSnapshotComponentKind,
  CompositionSnapshotItemScope,
  ProjectCompositionSnapshotItemWire,
  ProjectCompositionSnapshotWire,
} from "@agent-witch/shared/protocol";

import { asRowArray, getSql } from "@/lib/db";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseSnapshotEntries = (
  resolved: unknown,
): readonly ProjectCompositionSnapshotItemWire[] => {
  if (!Array.isArray(resolved)) {
    return [];
  }

  return resolved.flatMap((entry) => {
    if (!isRecord(entry)) {
      return [];
    }

    const componentId =
      typeof entry.componentId === "string" ? entry.componentId : "";
    const versionId =
      typeof entry.versionId === "string" ? entry.versionId : "";
    const kind = entry.kind;
    const scope = entry.scope;

    if (
      componentId.length === 0 ||
      versionId.length === 0 ||
      (kind !== "harness" && kind !== "workflow" && kind !== "agent") ||
      (scope !== "project" && scope !== "run")
    ) {
      return [];
    }

    if (!Array.isArray(entry.items)) {
      return [];
    }

    const items = entry.items.flatMap((item) => {
      if (!isRecord(item)) {
        return [];
      }

      const itemKey = typeof item.itemKey === "string" ? item.itemKey : "";
      const relativePath =
        typeof item.relativePath === "string" ? item.relativePath : "";
      const contentSha256 =
        typeof item.contentSha256 === "string" ? item.contentSha256 : "";

      if (itemKey.length === 0 || contentSha256.length === 0) {
        return [];
      }

      return [{ itemKey, relativePath, contentSha256 }];
    });

    if (items.length === 0) {
      return [];
    }

    return [
      {
        componentId,
        versionId,
        kind: kind as CompositionSnapshotComponentKind,
        scope: scope as CompositionSnapshotItemScope,
        items,
      },
    ];
  });
};

const loadProjectCompositionSnapshotWireById = async (
  snapshotId: string,
): Promise<ProjectCompositionSnapshotWire | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id, project_id, digest, resolved
      FROM project_composition_snapshots
      WHERE id = ${snapshotId}
      LIMIT 1
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  const row = rows[0];
  const entries = parseSnapshotEntries(row.resolved);

  return {
    id: String(row.id),
    projectId: String(row.project_id),
    digest: String(row.digest),
    entries,
  };
};

export default loadProjectCompositionSnapshotWireById;
