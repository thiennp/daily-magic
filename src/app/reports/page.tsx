import AppShell from "@/features/shell/AppShell";
import AgentRunsList from "@/features/reports/AgentRunsList";

export const dynamic = "force-dynamic";

export default function ReportsPage() {
  return (
    <AppShell contentClassName="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            Agent run reports
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Every dispatch from Daily Magic is tracked here — self tasks, team
            dispatches, approvals, and results.
          </p>
        </div>
        <AgentRunsList />
      </div>
    </AppShell>
  );
}
