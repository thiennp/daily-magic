import {
  fillCopy,
  formatNumber,
  MUTED_CLASS,
} from "@/features/projects/knowledge-impact/knowledgeImpactFormat";
import { PROJECT_KNOWLEDGE_IMPACT_COPY as C } from "@/features/projects/knowledge-impact/projectKnowledgeImpactCopy.constant";
import type {
  KnowledgeComputerRow,
  ProjectKnowledgeImpactView,
} from "@/lib/knowledge/buildProjectKnowledgeImpactView";

const BADGE_CLASS: Record<KnowledgeComputerRow["status"], string> = {
  ready: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  degraded:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  off: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  unavailable: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  unknown: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  stale: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
};

const resolveFixHint = (
  status: KnowledgeComputerRow["status"],
): string | null =>
  status === "degraded"
    ? C["status.fix.degraded"]
    : status === "unavailable"
      ? C["status.fix.unavailable"]
      : status === "unknown"
        ? C["status.fix.unknown"]
        : status === "stale"
          ? C["status.fix.stale"]
          : null;

export default function KnowledgeComputersList({
  impact,
}: {
  readonly impact: ProjectKnowledgeImpactView;
}) {
  const computers = impact.computers;
  if (computers === null || computers.length === 0) {
    return null;
  }
  const summary = impact.computerSummary;
  return (
    <section
      aria-label={C["computers.heading"]}
      className="flex flex-col gap-2"
    >
      <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
        {C["computers.heading"]}
      </h4>
      <p className={MUTED_CLASS}>
        {fillCopy(C["computers.summary"], { ...summary })}
      </p>
      <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700">
        {computers.map((computer) => {
          const fix = resolveFixHint(computer.status);
          return (
            <li
              key={computer.deviceId}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 p-3"
            >
              <span className="min-w-0 flex-1 truncate text-sm text-gray-900 dark:text-white">
                {computer.label}
                {computer.ownerName !== null ? (
                  <span className={MUTED_CLASS}> · {computer.ownerName}</span>
                ) : null}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${BADGE_CLASS[computer.status]}`}
              >
                {C[`status.${computer.status}`]}
              </span>
              <span className={MUTED_CLASS}>
                {C["computers.col.cards"]}: {formatNumber(computer.cardCount)}
              </span>
              {fix !== null ? (
                <span className={`${MUTED_CLASS} basis-full`}>{fix}</span>
              ) : null}
            </li>
          );
        })}
      </ul>
      <p className={MUTED_CLASS}>{C["computers.visibility"]}</p>
    </section>
  );
}
