import AgentPageLayout from "@/features/pages/layouts/AgentPageLayout";
import AppShell from "@/features/shell/AppShell";

export default function AgentPage() {
  return (
    <AppShell sectionTitle="Send a task">
      <AgentPageLayout />
    </AppShell>
  );
}
