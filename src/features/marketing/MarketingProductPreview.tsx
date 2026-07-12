import Badge from "@/components/ui/badge/Badge";

const PREVIEW_FLOW_STEPS = [
  { label: "Browser", detail: "You send a task" },
  { label: "Approval", detail: "If your team requires it" },
  { label: "Your Mac", detail: "The assistant runs" },
  { label: "Report", detail: "Results are saved" },
] as const;

export default function MarketingProductPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-theme-md ring-1 ring-gray-200/60">
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-gray-500">
          Agent Witch · Send task
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-gray-800">New task</p>
          <Badge color="success" size="sm">
            Mac connected
          </Badge>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            What you want done
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Summarize this document and list anything we should fix before
            sharing it.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 flex-1 items-center justify-center rounded-lg bg-brand-500 text-xs font-medium text-white">
            Send to my Mac
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 border-t border-gray-100 pt-4">
          {PREVIEW_FLOW_STEPS.map((step, index) => (
            <div key={step.label} className="text-center">
              <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600">
                {index + 1}
              </span>
              <p className="mt-2 text-[11px] font-medium text-gray-800">
                {step.label}
              </p>
              <p className="text-[10px] text-gray-500">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
