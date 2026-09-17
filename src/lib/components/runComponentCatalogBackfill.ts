import backfillHarnessCatalogSnapshotsToComponents from "@/lib/components/backfillHarnessCatalogSnapshotsToComponents";
import backfillPublishedCapabilitiesToComponents from "@/lib/components/backfillPublishedCapabilitiesToComponents";

export type RunComponentCatalogBackfillResult = {
  readonly capabilities: Awaited<
    ReturnType<typeof backfillPublishedCapabilitiesToComponents>
  >;
  readonly harnessCatalog: Awaited<
    ReturnType<typeof backfillHarnessCatalogSnapshotsToComponents>
  >;
};

const runComponentCatalogBackfill =
  async (): Promise<RunComponentCatalogBackfillResult> => {
    const capabilities = await backfillPublishedCapabilitiesToComponents();
    const harnessCatalog = await backfillHarnessCatalogSnapshotsToComponents();

    return { capabilities, harnessCatalog };
  };

export default runComponentCatalogBackfill;
