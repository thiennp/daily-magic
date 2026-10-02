import ConnectionLabPageLayout from "@/features/agent-witch/connection-lab/ConnectionLabPageLayout";
import AppShell from "@/features/shell/AppShell";
import { requireStaffPageAccess } from "@/lib/auth/requireStaffPageAccess";

export default async function ConnectionLabPage() {
  await requireStaffPageAccess();

  return (
    <AppShell>
      <ConnectionLabPageLayout />
    </AppShell>
  );
}
