import AgentRunDetail from "@/features/reports/AgentRunDetail";

interface ReportDetailPageLayoutProps {
  readonly runId: string;
}

export default function ReportDetailPageLayout({
  runId,
}: ReportDetailPageLayoutProps) {
  return <AgentRunDetail runId={runId} />;
}
