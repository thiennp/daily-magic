import type { ProjectCompositionSnapshotItemWire } from "@agent-witch/shared/protocol";

import buildSnapshotEntryFromVersion from "@/lib/projects/composition/buildSnapshotEntryFromVersion";
import resolveLatestComponentVersionId from "@/lib/projects/resolveLatestComponentVersionId";
import { asRowArray, getSql } from "@/lib/db";

const normalizeKind = (kind: string): "harness" | "workflow" | "agent" =>
  kind === "workflow" || kind === "agent" ? kind : "harness";

const resolveRunScopedSnapshotEntries = async (input: {
  readonly ownerUserId: string;
  readonly runScopedComponentIds: readonly string[];
  readonly skipComponentIds: ReadonlySet<string>;
}): Promise<
  | {
      readonly ok: true;
      readonly entries: ProjectCompositionSnapshotItemWire[];
    }
  | { readonly ok: false; readonly errorMessage: string }
> => {
  const sql = getSql();
  const entries: ProjectCompositionSnapshotItemWire[] = [];

  for (const componentId of input.runScopedComponentIds) {
    if (input.skipComponentIds.has(componentId)) {
      continue;
    }

    const componentRows = asRowArray(
      await sql`
        SELECT id, kind
        FROM components
        WHERE id = ${componentId}
          AND owner_user_id = ${input.ownerUserId}
        LIMIT 1
      `,
    );

    if (componentRows.length === 0) {
      return {
        ok: false,
        errorMessage: "Run-scoped component is not available for this account.",
      };
    }

    const versionId = await resolveLatestComponentVersionId(componentId);

    if (versionId === null) {
      return {
        ok: false,
        errorMessage: "Run-scoped component has no published version.",
      };
    }

    const entry = await buildSnapshotEntryFromVersion({
      componentId,
      kind: normalizeKind(String(componentRows[0].kind)),
      scope: "run",
      versionId,
    });

    if (entry !== null) {
      entries.push(entry);
    }
  }

  return { ok: true, entries };
};

export default resolveRunScopedSnapshotEntries;
