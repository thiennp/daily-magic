import MarketingStatusBadge from "@/features/marketing/MarketingStatusBadge";
import { MARKETING_MOCK_SHELL_CLASSES } from "@/features/marketing/marketingPalette.constant";

const PREVIEW_FLOW_STEPS = [
  { label: "Browser", detail: "You send a task" },
  { label: "Approval", detail: "If your company requires it" },
  { label: "Your Mac", detail: "The assistant runs" },
  { label: "Report", detail: "Results are saved" },
] as const;

export default function MarketingProductPreview() {
  return (
    <figure className="opacity-80">
      <figcaption className="mb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
        Product preview
      </figcaption>

      <aside
        aria-hidden
        aria-label="Illustration of the Agent Witch task flow"
        className={MARKETING_MOCK_SHELL_CLASSES}
      >
        <header className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-900/90 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-zinc-600" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-zinc-600" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-zinc-600" aria-hidden />
          <p className="ml-2 text-[11px] font-medium text-zinc-400">
            Agent Witch · Send task
          </p>
        </header>

        <section className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium text-zinc-400">New task</p>
            <MarketingStatusBadge tone="success" onDark>
              Mac connected
            </MarketingStatusBadge>
          </div>

          <blockquote className="rounded-lg bg-zinc-900 p-3 ring-1 ring-zinc-800">
            <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-400">
              What you want done
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-200">
              Summarize this document and list anything we should fix before
              sharing it.
            </p>
          </blockquote>

          <p
            className="flex h-8 w-full items-center justify-center rounded-md border border-dashed border-zinc-600 bg-zinc-800/50 text-[11px] font-medium text-zinc-400"
            aria-hidden
          >
            Send to my Mac
          </p>

          <ol className="grid grid-cols-4 gap-1.5 border-t border-zinc-800/80 pt-3">
            {PREVIEW_FLOW_STEPS.map((step, index) => (
              <li key={step.label} className="text-center">
                <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 text-[10px] font-medium text-zinc-400 ring-1 ring-zinc-700/80">
                  {index + 1}
                </span>
                <p className="mt-1.5 text-[10px] font-medium text-zinc-400">
                  {step.label}
                </p>
                <p className="text-[9px] leading-snug text-zinc-400">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </aside>
    </figure>
  );
}
