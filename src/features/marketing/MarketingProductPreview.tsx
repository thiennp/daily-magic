import MarketingStatusBadge from "@/features/marketing/MarketingStatusBadge";
import {
  MARKETING_SURFACE_ELEVATED_CLASSES,
  MARKETING_TEXT_MUTED_CLASSES,
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
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
        MARKETING_SURFACE_ELEVATED_CLASSES,
        "relative overflow-hidden transition duration-300 hover:shadow-[0_12px_40px_rgb(15,23,42,0.1),0_4px_12px_rgb(15,23,42,0.05)]",
      )}
    >
      <div className="flex items-center gap-2 border-b border-slate-200/60 bg-slate-50/70 px-4 py-3 backdrop-blur-sm">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" aria-hidden />
        <span
          className={mergeMarketingClasses(
            "ml-2 text-xs font-medium",
            MARKETING_TEXT_MUTED_CLASSES,
          )}
        >
          Agent Witch · Send task
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className={mergeMarketingClasses("text-sm font-semibold", MARKETING_TEXT_PRIMARY_CLASSES)}>
            New task
          </p>
          <MarketingStatusBadge tone="success">Mac connected</MarketingStatusBadge>
        </div>

        <div className="rounded-xl bg-slate-50/90 p-3 ring-1 ring-slate-200/40 backdrop-blur-sm">
          <p
            className={mergeMarketingClasses(
              "text-xs font-semibold uppercase tracking-wide",
              MARKETING_TEXT_MUTED_CLASSES,
            )}
          >
            What you want done
          </p>
          <p
            className={mergeMarketingClasses(
              "mt-2 text-sm leading-relaxed",
              MARKETING_TEXT_SECONDARY_CLASSES,
            )}
          >
            Summarize this document and list anything we should fix before
            sharing it.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-9 flex-1 items-center justify-center rounded-lg bg-brand-500 text-xs font-semibold text-white shadow-sm"
            aria-hidden
          >
            Send to my Mac
          </span>
        </div>

        <ol className="grid grid-cols-4 gap-2 border-t border-slate-100/80 pt-4">
          {PREVIEW_FLOW_STEPS.map((step, index) => (
            <li key={step.label} className="text-center">
              <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-brand-500/10 text-xs font-semibold text-brand-700 ring-1 ring-brand-500/10">
                {index + 1}
              </span>
              <p
                className={mergeMarketingClasses(
                  "mt-2 text-[11px] font-semibold",
                  MARKETING_TEXT_PRIMARY_CLASSES,
                )}
              >
                {step.label}
              </p>
              <p
                className={mergeMarketingClasses(
                  "text-[10px] leading-snug",
                  MARKETING_TEXT_MUTED_CLASSES,
                )}
              >
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
