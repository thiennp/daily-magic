import Badge from "@/components/ui/badge/Badge";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

const PREVIEW_FLOW_STEPS = [
  { label: "Browser", detail: "You send a task" },
  { label: "Approval", detail: "If your company requires it" },
  { label: "Your Mac", detail: "The assistant runs" },
  { label: "Report", detail: "Results are saved" },
] as const;

export default function MarketingProductPreview() {
  return (
    <aside
      aria-label="Agent Witch task flow preview"
      className={mergeMarketingClasses(
        "overflow-hidden rounded-2xl border border-white/70 bg-white/75 shadow-theme-lg ring-1 ring-gray-200/50 backdrop-blur-xl",
        "transition duration-300 hover:border-brand-200/70 hover:shadow-theme-md",
      )}
    >
      <div className="flex items-center gap-2 border-b border-gray-200/70 bg-gray-50/80 px-4 py-3 backdrop-blur-sm">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" aria-hidden />
        <span className="ml-2 text-xs font-medium text-gray-500">
          Agent Witch · Send task
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-gray-900">New task</p>
          <Badge color="success" size="sm">
            Mac connected
          </Badge>
        </div>

        <div className="rounded-xl border border-gray-200/80 bg-gray-50/90 p-3 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            What you want done
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            Summarize this document and list anything we should fix before
            sharing it.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-9 flex-1 items-center justify-center rounded-lg bg-brand-500 text-xs font-semibold text-white shadow-theme-xs"
            aria-hidden
          >
            Send to my Mac
          </span>
        </div>

        <ol className="grid grid-cols-4 gap-2 border-t border-gray-100/80 pt-4">
          {PREVIEW_FLOW_STEPS.map((step, index) => (
            <li key={step.label} className="text-center">
              <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600 ring-1 ring-brand-100">
                {index + 1}
              </span>
              <p className="mt-2 text-[11px] font-semibold text-gray-800">
                {step.label}
              </p>
              <p className="text-[10px] leading-snug text-gray-500">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
