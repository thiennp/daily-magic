import {
  NAV_CONSOLIDATION_INTENT_NOTICE,
  NAV_CONSOLIDATION_NEW_TASK_EMPTY_EXTRA,
  type NavConsolidationIntent,
} from "@/lib/shell/navConsolidationIntent.constant";

interface AwcProjectsIntentNoticeProps {
  readonly intent: NavConsolidationIntent;
  readonly projectCount: number;
  readonly isLoading: boolean;
}

export default function AwcProjectsIntentNotice({
  intent,
  projectCount,
  isLoading,
}: AwcProjectsIntentNoticeProps) {
  const notice = NAV_CONSOLIDATION_INTENT_NOTICE[intent];
  const showNewTaskEmptyExtra =
    intent === "new-task" && !isLoading && projectCount === 0;

  return (
    <div
      className="mb-4 rounded-awc-lg border border-awc-border bg-awc-tile px-4 py-3 text-[length:var(--awc-fs-body)] text-awc-fg dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-200"
      role="status"
    >
      <p>{notice}</p>
      {showNewTaskEmptyExtra ? (
        <p className="mt-1 text-awc-fg-muted dark:text-gray-400">
          {NAV_CONSOLIDATION_NEW_TASK_EMPTY_EXTRA}
        </p>
      ) : null}
    </div>
  );
}
