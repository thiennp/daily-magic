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
      className="mb-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-200"
      role="status"
    >
      <p>{notice}</p>
      {showNewTaskEmptyExtra ? (
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          {NAV_CONSOLIDATION_NEW_TASK_EMPTY_EXTRA}
        </p>
      ) : null}
    </div>
  );
}
