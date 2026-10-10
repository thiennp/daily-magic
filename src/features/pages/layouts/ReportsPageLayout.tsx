import { GuestAwarePageStack } from "@/features/empty-states/public-api/presentation";
import AgentRunsList from "@/features/reports/AgentRunsList";
import ReportsPageHeader from "@/features/reports/ReportsPageHeader";

export default function ReportsPageLayout() {
  return (
    <GuestAwarePageStack>
      <ReportsPageHeader />
      <AgentRunsList />
    </GuestAwarePageStack>
  );
}
