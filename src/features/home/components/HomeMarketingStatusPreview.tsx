import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import MarketingCard from "@/features/marketing/MarketingCard";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

const ROWS = [
  { title: "Weekly status summary", state: "Delivered 2 min ago", tone: "ok" },
  { title: "Client proposal draft", state: "Pending", tone: "warn" },
  { title: "Inbox reply batch", state: "Running", tone: "info" },
] as const;

const TONE: Record<(typeof ROWS)[number]["tone"], string> = {
  ok: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100",
  warn: "bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100",
  info: "bg-brand-50 text-brand-800 dark:bg-brand-950/40 dark:text-brand-100",
};

/** Decorative signed-out hero status card (not interactive). */
export default function HomeMarketingStatusPreview() {
  return (
    <div aria-hidden="true">
      <MarketingCard as="div" className="space-y-4" interactive={false}>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <h3
            className={mergeMarketingClasses(
              "text-sm font-semibold",
              MARKETING_TEXT_PRIMARY_CLASSES,
            )}
          >
            This computer is online
          </h3>
        </div>
        <ul className="space-y-2">
          {ROWS.map((row) => (
            <li
              key={row.title}
              className="flex items-center justify-between gap-3"
            >
              <span
                className={mergeMarketingClasses(
                  "truncate text-sm font-medium",
                  MARKETING_TEXT_PRIMARY_CLASSES,
                )}
              >
                {row.title}
              </span>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${TONE[row.tone]}`}
              >
                {row.state}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={MARKETING_TEXT_SECONDARY_CLASSES}>
            Bots handing over work
          </span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
            WB
          </span>
          <span>→</span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
            MG
          </span>
          <span className="rounded-full border border-gray-200 px-2 py-0.5 text-gray-600 dark:border-gray-700 dark:text-gray-300">
            Approved by you
          </span>
        </div>
        <dl className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-3 text-sm dark:border-gray-800">
          <div>
            <dt className={MARKETING_TEXT_SECONDARY_CLASSES}>Setup</dt>
            <dd className={MARKETING_TEXT_PRIMARY_CLASSES}>~15 min</dd>
          </div>
          <div>
            <dt className={MARKETING_TEXT_SECONDARY_CLASSES}>Run history</dt>
            <dd className={MARKETING_TEXT_PRIMARY_CLASSES}>100% local</dd>
          </div>
          <div>
            <dt className={MARKETING_TEXT_SECONDARY_CLASSES}>Secrets in cloud</dt>
            <dd className={MARKETING_TEXT_PRIMARY_CLASSES}>0</dd>
          </div>
        </dl>
      </MarketingCard>
    </div>
  );
}
