import MarketingStatusBadge from "@/features/marketing/MarketingStatusBadge";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";
import { MARKETING_MOCK_SHELL_CLASSES } from "@/features/marketing/marketingPalette.constant";

const PREVIEW_TASKS = [
  {
    title: "Weekly status summary",
    runner: "runner: mac-eng-04",
    tone: "success" as const,
    status: "Delivered",
    time: "2m ago",
  },
  {
    title: "Client proposal draft",
    runner: "runner: mac-sales-02",
    tone: "info" as const,
    status: "Pending",
    time: "Just now",
  },
  {
    title: "Inbox reply batch",
    runner: "runner: mac-ops-01",
    tone: "neutral" as const,
    status: "Running",
    time: "Live",
  },
] as const;

export default function MarketingProductPreview() {
  return (
    <figure>
      <figcaption className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-700">
        Product preview
      </figcaption>

      <aside
        aria-hidden
        aria-label="Illustration of Agent Witch task queue on organization Macs"
        className={MARKETING_MOCK_SHELL_CLASSES}
      >
        <header
          className="flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3"
        >
          <p className="text-xs font-semibold text-gray-900">Macs online</p>
          <MarketingStatusBadge tone="success">
            {MAC_WORKER_BENEFIT_COPY.macReadyBadge}
          </MarketingStatusBadge>
        </header>

        <ul className="divide-y divide-gray-200 bg-white">
          {PREVIEW_TASKS.map((task) => (
            <li
              key={task.title}
              className="flex items-center justify-between gap-3 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {task.title}
                </p>
                <p className="font-mono text-[11px] text-brand-600">
                  {task.runner}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <MarketingStatusBadge tone={task.tone}>
                  {task.status}
                </MarketingStatusBadge>
                <span className="text-[10px] text-gray-500">{task.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </figure>
  );
}
