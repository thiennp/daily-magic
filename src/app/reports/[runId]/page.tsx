import AppShell from "@/features/shell/AppShell";
import AgentRunDetail from "@/features/reports/AgentRunDetail";

export const dynamic = "force-dynamic";

interface ReportsRunPageProps {
  readonly params: Promise<{
    readonly runId: string;
  }>;
}

export default async function ReportsRunPage({ params }: ReportsRunPageProps) {
  const { runId } = await params;

  return (
    <AppShell contentClassName="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <AgentRunDetail runId={runId} />
    </AppShell>
  );
}
