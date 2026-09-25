import { GuestSessionStateProvider } from "@/features/empty-states/GuestSessionStateProvider";
import LibraryPageLayout from "@/features/pages/layouts/LibraryPageLayout";
import AppShell from "@/features/shell/AppShell";
import { resolveServerSessionHint } from "@/lib/auth/resolveServerSessionHint";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  const serverSessionHint = await resolveServerSessionHint();

  return (
    <AppShell>
      <GuestSessionStateProvider serverSessionHint={serverSessionHint}>
        <LibraryPageLayout />
      </GuestSessionStateProvider>
    </AppShell>
  );
}
