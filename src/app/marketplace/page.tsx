import { Suspense } from "react";

import MarketplacePageLayout from "@/features/pages/layouts/MarketplacePageLayout";
import AppShell from "@/features/shell/AppShell";

export const dynamic = "force-dynamic";

export default function MarketplacePage() {
  return (
    <AppShell>
      <Suspense fallback={null}>
        <MarketplacePageLayout />
      </Suspense>
    </AppShell>
  );
}
