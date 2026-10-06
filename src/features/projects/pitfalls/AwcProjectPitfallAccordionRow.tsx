import { AWC_PROJECT_PITFALLS_COPY as C } from "@/features/projects/pitfalls/awcProjectPitfallsCopy.constant";
import type { AwcProjectPitfallRow } from "@/features/projects/pitfalls/buildAwcProjectPitfallRows";
import {
  PITFALL_FIX_BOX_CLASS,
  PITFALL_SEVERITY_PILL_CLASS,
  PITFALL_TRIGGER_CHIP_CLASS,
} from "@/features/projects/pitfalls/pitfallsChrome.constant";

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="m6 3.5 4.5 4.5L6 12.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** One rule as a `<details>` accordion (Important/Warning pill | title | chevron). */
export default function AwcProjectPitfallAccordionRow({
  row,
}: {
  readonly row: AwcProjectPitfallRow;
}) {
  return (
    <li className="border-t border-gray-200 first:border-t-0 dark:border-gray-800">
      <details className="group">
        <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_16px] items-center gap-3 rounded-lg px-1 py-3 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 dark:hover:bg-white/[0.03] min-[881px]:grid-cols-[82px_minmax(0,1fr)_16px] [&::-webkit-details-marker]:hidden">
          <span className="flex min-w-0 flex-col items-start gap-1.5 min-[881px]:contents">
            <span
              className={`${PITFALL_SEVERITY_PILL_CLASS[row.severity]} justify-self-start whitespace-nowrap`}
            >
              {row.severityLabel}
            </span>
            <span className="min-w-0 text-sm text-gray-900 dark:text-gray-100">
              {row.title}
            </span>
          </span>
          <span className="text-gray-400 transition-transform group-open:rotate-90 motion-reduce:transition-none dark:text-gray-500">
            <ChevronIcon />
          </span>
        </summary>
        <div className="flex flex-col gap-2.5 px-1 pb-4 min-[881px]:pl-[106px]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {C.avoidSituationPrefix} {row.situation}
          </p>
          <p className={PITFALL_FIX_BOX_CLASS}>
            <b className="font-semibold">{C.howToLabel}</b> {row.fix}
          </p>
          {row.triggers.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <span>{C.triggersWhenLabel}</span>
              {row.triggers.map((trigger) => (
                <code key={trigger} className={PITFALL_TRIGGER_CHIP_CLASS}>
                  {trigger}
                </code>
              ))}
            </div>
          ) : null}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {[C.availableMeta, row.lastHitLabel, row.updatedLabel].join(" · ")}
          </p>
        </div>
      </details>
    </li>
  );
}
