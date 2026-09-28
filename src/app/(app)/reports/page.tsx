import { GuestSessionStateProvider } from "@/features/empty-states/GuestSessionStateProvider";
import ReportsPageLayout from "@/features/pages/layouts/ReportsPageLayout";
import AppShell from "@/features/shell/AppShell";
import { resolveServerSessionHint } from "@/lib/auth/resolveServerSessionHint";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const serverSessionHint = await resolveServerSessionHint();

  return (
    <AppShell>
      <GuestSessionStateProvider serverSessionHint={serverSessionHint}>
        <ReportsPageLayout />
      </GuestSessionStateProvider>
    </AppShell>
  );
}
