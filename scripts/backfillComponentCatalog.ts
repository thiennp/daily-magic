import runComponentCatalogBackfill from "@/lib/components/runComponentCatalogBackfill";

const main = async (): Promise<void> => {
  const result = await runComponentCatalogBackfill();
  console.log(
    JSON.stringify(
      {
        ok: true,
        capabilities: result.capabilities,
        harnessCatalog: result.harnessCatalog,
      },
      null,
      2,
    ),
  );
};

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(JSON.stringify({ ok: false, errorMessage: message }));
  process.exitCode = 1;
});
