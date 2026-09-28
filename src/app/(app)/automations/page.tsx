import { Suspense } from "react";

import AutomationsPageLayout from "@/features/pages/layouts/AutomationsPageLayout";
import AppShell from "@/features/shell/AppShell";

export const dynamic = "force-dynamic";

export default function AutomationsPage() {
  return (
    <AppShell>
      <Suspense fallback={null}>
        <AutomationsPageLayout />
      </Suspense>
    </AppShell>
  );
}
