import WsTestPanel from "@/features/wsTest/WsTestPanel";
import AppShell from "@/features/shell/AppShell";

export default function AgentPage() {
  return (
    <AppShell sectionTitle="Send a test task">
      <WsTestPanel />
    </AppShell>
  );
}
