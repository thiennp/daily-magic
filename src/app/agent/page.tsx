import WsTestPanel from "@/features/wsTest/WsTestPanel";
import AppShell from "@/features/shell/AppShell";

export default function AgentPage() {
  return (
    <AppShell sectionTitle="Send a task">
      <WsTestPanel />
    </AppShell>
  );
}
