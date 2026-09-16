import AgentRunsList from "@/features/reports/AgentRunsList";
import ReportsPageHeader from "@/features/reports/ReportsPageHeader";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function ReportsPageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <ReportsPageHeader />
      <AgentRunsList />
    </div>
  );
}
