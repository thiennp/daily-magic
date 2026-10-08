import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";

const formatWhen = (iso: string): string => new Date(iso).toLocaleString();

const lastRunOutcome = (
  status: AgentAutomationRecord["lastRunStatus"],
): string | null => {
  if (status === "ok") return "Success";
  if (status === "failed") return "Failed";
  if (status === "skipped") return "Skipped";
  return null;
};

const describeNextRun = (automation: AgentAutomationRecord): string => {
  if (!automation.enabled) return "Paused";
  if (automation.nextRunAt !== null) return formatWhen(automation.nextRunAt);
  return automation.triggerType === "webhook" ? "When the webhook fires" : "—";
};

function RunCell({
  label,
  children,
}: {
  readonly label: string;
  readonly children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs text-awc-fg-muted dark:text-gray-400">{label}</dt>
      <dd className="text-sm text-awc-fg dark:text-white/90">{children}</dd>
    </div>
  );
}

export default function AutomationRunCells({
  automation,
}: {
  readonly automation: AgentAutomationRecord;
}) {
  const outcome = lastRunOutcome(automation.lastRunStatus);

  return (
    <dl className="mt-3 grid gap-3 sm:grid-cols-2">
      <RunCell label="Last run">
        {automation.lastRunAt === null ? (
          <span className="text-awc-fg-muted dark:text-gray-400">
            Not run yet
          </span>
        ) : (
          <>
            {formatWhen(automation.lastRunAt)}
            {outcome !== null ? ` · ${outcome}` : ""}
          </>
        )}
      </RunCell>
      <RunCell label="Next run">{describeNextRun(automation)}</RunCell>
    </dl>
  );
}
