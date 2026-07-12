import ReportDetailPageLayout from "@/features/pages/layouts/ReportDetailPageLayout";

interface DemoReportDetailPageProps {
  readonly params: Promise<{ runId: string }>;
}

export default async function DemoReportDetailPage({
  params,
}: DemoReportDetailPageProps) {
  const { runId } = await params;

  return <ReportDetailPageLayout runId={runId} />;
}
