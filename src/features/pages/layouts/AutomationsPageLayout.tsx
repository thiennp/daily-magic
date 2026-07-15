import AppPageHeader from "@/components/surfaces/AppPageHeader";
import AutomationsPageClient from "@/features/automations/AutomationsPageClient";
import { AUTOMATIONS_PAGE_COPY } from "@/features/automations/automationsPageCopy.constant";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function AutomationsPageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <AppPageHeader
        title={AUTOMATIONS_PAGE_COPY.title}
        description={AUTOMATIONS_PAGE_COPY.description}
      />
      <AutomationsPageClient />
    </div>
  );
}
