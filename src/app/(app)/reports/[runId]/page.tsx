import ReportDetailPageLayout from "@/features/pages/layouts/ReportDetailPageLayout";
import AppShell from "@/features/shell/AppShell";

export const dynamic = "force-dynamic";

interface ReportsRunPageProps {
  readonly params: Promise<{
    readonly runId: string;
  }>;
}

export default async function ReportsRunPage({ params }: ReportsRunPageProps) {
  const { runId } = await params;

  return (
    <AppShell>
      <ReportDetailPageLayout runId={runId} />
    </AppShell>
  );
}
