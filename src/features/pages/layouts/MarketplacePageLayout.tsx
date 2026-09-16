import AppPageHeader from "@/components/surfaces/AppPageHeader";
import MarketplacePanel from "@/features/marketplace/MarketplacePanel";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function MarketplacePageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <AppPageHeader
        title="Marketplace"
        description="Pick a free starter or a teammate listing, then run it on your Mac."
      />
      <MarketplacePanel variant="page" />
    </div>
  );
}
