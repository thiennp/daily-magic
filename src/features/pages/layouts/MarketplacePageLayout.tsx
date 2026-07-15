import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";
import MarketplacePanel from "@/features/marketplace/MarketplacePanel";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function MarketplacePageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <p className="max-w-2xl text-sm text-gray-600 dark:text-gray-400">
        {MAC_WORKER_BENEFIT_COPY.marketplacePageDescription}
      </p>
      <MarketplacePanel variant="page" />
    </div>
  );
}
