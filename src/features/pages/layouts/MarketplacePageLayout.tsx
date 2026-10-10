import { MarketplacePanel } from "@/features/marketplace/public-api/presentation";
import {
  MK_DESC_CLASS,
  MK_HEAD_ROW_CLASS,
  MK_TITLE_CLASS,
} from "@/features/marketplace/public-api/types";
import {
  MARKETPLACE_PAGE_DESCRIPTION,
  MARKETPLACE_PAGE_TITLE,
} from "@/features/marketplace/public-api/types";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/public-api/types";

export default function MarketplacePageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <div className={MK_HEAD_ROW_CLASS}>
        <header className="min-w-0 flex-1">
          <h1 className={MK_TITLE_CLASS}>{MARKETPLACE_PAGE_TITLE}</h1>
          <p className={MK_DESC_CLASS}>{MARKETPLACE_PAGE_DESCRIPTION}</p>
        </header>
      </div>
      <MarketplacePanel variant="page" />
    </div>
  );
}
