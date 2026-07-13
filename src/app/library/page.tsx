import LibraryPageLayout from "@/features/pages/layouts/LibraryPageLayout";
import AppShell from "@/features/shell/AppShell";

export const dynamic = "force-dynamic";

export default function LibraryPage() {
  return (
    <AppShell>
      <LibraryPageLayout />
    </AppShell>
  );
}
