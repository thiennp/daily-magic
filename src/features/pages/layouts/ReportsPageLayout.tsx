import AppPageHeader from "@/components/surfaces/AppPageHeader";
import AgentRunsList from "@/features/reports/AgentRunsList";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function ReportsPageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <AppPageHeader
        title="Job history"
        description="Every task you send is listed here. Jobs are stored on this device, so history survives refresh and restarts."
      />
      <AgentRunsList />
    </div>
  );
}
