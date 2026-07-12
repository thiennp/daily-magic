import AgentRunDetail from "@/features/reports/AgentRunDetail";

interface ReportDetailPageLayoutProps {
  readonly runId: string;
}

export default function ReportDetailPageLayout({
  runId,
}: ReportDetailPageLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <AgentRunDetail runId={runId} />
    </div>
  );
}
