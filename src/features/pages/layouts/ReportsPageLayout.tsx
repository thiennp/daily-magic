import AgentRunsList from "@/features/reports/AgentRunsList";

export default function ReportsPageLayout() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
          Job history
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Every task sent through Agent Witch is listed here — yours,
          teammates&apos;, approvals, and results.
        </p>
      </div>
      <AgentRunsList />
    </div>
  );
}
