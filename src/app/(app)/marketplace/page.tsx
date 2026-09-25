import { Suspense } from "react";

import { GuestSessionStateProvider } from "@/features/empty-states/GuestSessionStateProvider";
import MarketplacePageLayout from "@/features/pages/layouts/MarketplacePageLayout";
import AppShell from "@/features/shell/AppShell";
import { resolveServerSessionHint } from "@/lib/auth/resolveServerSessionHint";

export const dynamic = "force-dynamic";

export default async function MarketplacePage() {
  const serverSessionHint = await resolveServerSessionHint();

  return (
    <AppShell>
      <GuestSessionStateProvider serverSessionHint={serverSessionHint}>
        <Suspense fallback={null}>
          <MarketplacePageLayout />
        </Suspense>
      </GuestSessionStateProvider>
    </AppShell>
  );
}
