import { GuestAwarePageStack } from "@/features/empty-states/public-api/presentation";
import { AgentRunsList } from "@/features/reports/public-api/presentation";
import { ReportsPageHeader } from "@/features/reports/public-api/presentation";

export default function ReportsPageLayout() {
  return (
    <GuestAwarePageStack>
      <ReportsPageHeader />
      <AgentRunsList />
    </GuestAwarePageStack>
  );
}
