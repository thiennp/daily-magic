import AppPageHeader from "@/components/surfaces/AppPageHeader";
import LibraryPageClient from "@/features/library/LibraryPageClient";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function LibraryPageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <AppPageHeader
        title="My library"
        description="Your saved and published playbooks. Run on your Mac from Agent, or copy a prompt for ChatGPT and Gemini."
      />
      <LibraryPageClient />
    </div>
  );
}
