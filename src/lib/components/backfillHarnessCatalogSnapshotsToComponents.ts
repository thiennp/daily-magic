import backfillOneHarnessCatalogSetToComponents from "@/lib/components/backfillOneHarnessCatalogSetToComponents";
import extractHarnessSetsFromCatalogManifest from "@/lib/components/extractHarnessSetsFromCatalogManifest";
import { asRowArray, getSql } from "@/lib/db";

export type BackfillHarnessCatalogSnapshotsResult = {
  readonly componentsInserted: number;
  readonly versionsInserted: number;
};

const backfillHarnessCatalogSnapshotsToComponents =
  async (): Promise<BackfillHarnessCatalogSnapshotsResult> => {
    const sql = getSql();
    const snapshotRows = asRowArray(
      await sql`
        SELECT owner_user_id, visibility, manifest_json
        FROM harness_catalog_snapshots
      `,
    );

    const counts = await Promise.all(
      snapshotRows.flatMap((row) => {
        const ownerUserId = String(row.owner_user_id);
        const visibility = String(row.visibility);
        const sets = extractHarnessSetsFromCatalogManifest(row.manifest_json);

        return sets.map((set) =>
          backfillOneHarnessCatalogSetToComponents({
            ownerUserId,
            visibility,
            set,
          }),
        );
      }),
    );

    return counts.reduce<BackfillHarnessCatalogSnapshotsResult>(
      (totals, rowCounts) => ({
        componentsInserted:
          totals.componentsInserted + rowCounts.componentsInserted,
        versionsInserted: totals.versionsInserted + rowCounts.versionsInserted,
      }),
      { componentsInserted: 0, versionsInserted: 0 },
    );
  };

export default backfillHarnessCatalogSnapshotsToComponents;
