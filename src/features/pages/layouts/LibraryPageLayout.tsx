import AppPageHeader from "@/components/surfaces/AppPageHeader";
import LibraryPageClient from "@/features/library/LibraryPageClient";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function LibraryPageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <AppPageHeader
        title="Library"
        description="Save workflows you reuse — then run them on your Mac."
      />
      <LibraryPageClient />
    </div>
  );
}
