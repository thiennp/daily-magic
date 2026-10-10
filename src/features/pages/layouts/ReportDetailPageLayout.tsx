import { AgentRunDetail } from "@/features/reports/public-api/presentation";

interface ReportDetailPageLayoutProps {
  readonly runId: string;
}

export default function ReportDetailPageLayout({
  runId,
}: ReportDetailPageLayoutProps) {
  return <AgentRunDetail runId={runId} />;
}
