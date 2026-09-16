import LibraryPageClient from "@/features/library/LibraryPageClient";
import LibraryPageHeader from "@/features/library/LibraryPageHeader";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function LibraryPageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <LibraryPageHeader />
      <LibraryPageClient />
    </div>
  );
}
