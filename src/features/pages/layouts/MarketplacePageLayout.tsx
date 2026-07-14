import MarketplacePanel from "@/features/marketplace/MarketplacePanel";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function MarketplacePageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <p className="max-w-2xl text-sm text-gray-600 dark:text-gray-400">
        Discover agents and workflows teammates published for your company.
        Preview each listing, save a copy to your library, or install the linked
        rules bundle on your Mac.
      </p>
      <MarketplacePanel variant="page" />
    </div>
  );
}
