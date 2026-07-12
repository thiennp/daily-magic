import MarketplacePanel from "@/features/harness/MarketplacePanel";

export default function MarketplacePageLayout() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <p className="max-w-2xl text-sm text-gray-600 dark:text-gray-400">
        Discover agents and workflows teammates published for your company.
        Preview each listing, save a copy to your library, or install the linked
        rules bundle on your Mac.
      </p>
      <div className="mt-6">
        <MarketplacePanel variant="page" />
      </div>
    </div>
  );
}
