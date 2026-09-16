import AppPageHeader from "@/components/surfaces/AppPageHeader";
import AgentRunsList from "@/features/reports/AgentRunsList";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function ReportsPageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <AppPageHeader
        title="Reports"
        description="History of jobs you sent to your Mac — status, approvals, and results."
      />
      <AgentRunsList />
    </div>
  );
}
