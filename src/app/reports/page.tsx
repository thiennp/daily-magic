import ReportsPageLayout from "@/features/pages/layouts/ReportsPageLayout";
import AppShell from "@/features/shell/AppShell";

export const dynamic = "force-dynamic";

export default function ReportsPage() {
  return (
    <AppShell>
      <ReportsPageLayout />
    </AppShell>
  );
}
