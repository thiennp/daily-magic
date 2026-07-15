import MarketplacePanel from "@/features/marketplace/MarketplacePanel";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function MarketplacePageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <p className="max-w-2xl text-sm text-gray-600 dark:text-gray-400">
        Pick a free starter or a teammate listing, then install it on your Mac.
      </p>
      <MarketplacePanel variant="page" />
    </div>
  );
}
