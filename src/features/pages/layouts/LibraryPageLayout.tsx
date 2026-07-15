import AppPageHeader from "@/components/surfaces/AppPageHeader";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";
import LibraryPageClient from "@/features/library/LibraryPageClient";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function LibraryPageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <AppPageHeader
        title="My library"
        description={MAC_WORKER_BENEFIT_COPY.libraryPageDescription}
      />
      <LibraryPageClient />
    </div>
  );
}
