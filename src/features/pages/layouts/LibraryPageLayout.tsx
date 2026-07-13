import AppPageHeader from "@/components/surfaces/AppPageHeader";
import LibraryPageClient from "@/features/library/LibraryPageClient";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function LibraryPageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <AppPageHeader
        title="My library"
        description="Your saved playbooks. Run on your Mac opens Agent — connect your computer first if Send is disabled."
      />
      <LibraryPageClient />
    </div>
  );
}
