import type { AgentRunInputContext } from "@/lib/dispatch/agentRunInputContext.type";

interface AgentRunInputContextSummaryProps {
  readonly context: AgentRunInputContext;
}

const ROWS = [
  { label: "Agent", read: (c: AgentRunInputContext) => c.agentLabel },
  { label: "Computer", read: (c: AgentRunInputContext) => c.computerName },
  { label: "Project", read: (c: AgentRunInputContext) => c.projectName },
  { label: "Task", read: (c: AgentRunInputContext) => c.taskTitle },
] as const;

/** Which agent is asking, in which project, for which task. */
export default function AgentRunInputContextSummary({
  context,
}: AgentRunInputContextSummaryProps) {
  return (
    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
      {ROWS.map(({ label, read }) => {
        const value = read(context);
        return value === null ? null : (
          <div key={label} className="contents">
            <dt className="text-awc-fg-muted dark:text-gray-400">{label}</dt>
            <dd className="font-medium text-awc-fg dark:text-white/90">
              {value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
