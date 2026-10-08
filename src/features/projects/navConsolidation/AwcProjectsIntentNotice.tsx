import { APP_SURFACE_CTA_PRIMARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { AWC_PROJECTS_PAGE_COPY as COPY } from "@/features/projects/awcProjectsPageCopy.constant";
import {
  NAV_CONSOLIDATION_INTENT_NOTICE,
  NAV_CONSOLIDATION_NEW_TASK_EMPTY_EXTRA,
  type NavConsolidationIntent,
} from "@/lib/shell/navConsolidationIntent.constant";

interface AwcProjectsIntentNoticeProps {
  readonly intent: NavConsolidationIntent;
  readonly projectCount: number;
  readonly isLoading: boolean;
  readonly onDismiss?: () => void;
  readonly onNewProject?: () => void;
}

export default function AwcProjectsIntentNotice({
  intent,
  projectCount,
  isLoading,
  onDismiss,
  onNewProject,
}: AwcProjectsIntentNoticeProps) {
  const notice = NAV_CONSOLIDATION_INTENT_NOTICE[intent];
  const showNewTaskEmptyExtra =
    intent === "new-task" && !isLoading && projectCount === 0;

  return (
    <div
      className="mb-4 flex flex-wrap items-start gap-3 rounded-awc-lg border border-awc-border bg-awc-tile px-4 py-3 text-[length:var(--awc-fs-body)] text-awc-fg dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-200"
      role="status"
    >
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{notice}</p>
        {showNewTaskEmptyExtra ? (
          <p className="mt-1 text-awc-fg-muted dark:text-gray-400">
            {NAV_CONSOLIDATION_NEW_TASK_EMPTY_EXTRA}
          </p>
        ) : null}
      </div>
      {showNewTaskEmptyExtra && onNewProject !== undefined ? (
        <button
          type="button"
          className={APP_SURFACE_CTA_PRIMARY_SM_CLASS}
          onClick={onNewProject}
        >
          {COPY.newProject}
        </button>
      ) : null}
      {onDismiss !== undefined ? (
        <button
          type="button"
          aria-label={COPY.intentDismiss}
          className="awc-focus-ring size-8 rounded-awc-pill text-awc-fg-muted hover:bg-awc-tile-2"
          onClick={onDismiss}
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
