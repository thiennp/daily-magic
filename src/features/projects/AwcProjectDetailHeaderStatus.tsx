import { PROJECT_V5_CHIP_BASE_CLASS } from "@/features/projects/projectPageV5ChromeClasses.constant";
import type {
  ProjectHeaderStatus,
  ProjectHeaderStatusTone,
} from "@/features/projects/utils/public-api/types";

const CHIP_BY_TONE: Record<ProjectHeaderStatusTone, string> = {
  ok: `${PROJECT_V5_CHIP_BASE_CLASS} bg-awc-ok-soft text-awc-ok dark:bg-success-500/15 dark:text-success-400`,
  warn: `${PROJECT_V5_CHIP_BASE_CLASS} bg-awc-warn-soft text-awc-warn dark:bg-warning-500/15 dark:text-warning-400`,
  // Neutral states (offline): no box — muted dot + text (PLAN §1.3).
  neutral:
    "inline-flex w-fit items-center gap-1.5 text-[length:var(--awc-fs-chip)] font-semibold text-awc-fg-muted dark:text-gray-400",
};

const DOT_BY_TONE: Record<ProjectHeaderStatusTone, string> = {
  ok: "bg-awc-ok-dot",
  warn: "bg-awc-warn-dot",
  neutral: "bg-awc-fg-subtle dark:bg-gray-500",
};

/** V5-3 header status chip (online / reconnecting tinted; offline neutral). */
export default function AwcProjectDetailHeaderStatus({
  status,
}: {
  readonly status: ProjectHeaderStatus;
}) {
  return (
    <p role="status" className={CHIP_BY_TONE[status.tone]}>
      <span
        aria-hidden="true"
        className={`inline-block size-1.5 shrink-0 rounded-full ${DOT_BY_TONE[status.tone]}`}
      />
      <span>{status.text}</span>
    </p>
  );
}
