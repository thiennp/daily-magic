import { AWC_TASKS_CARD_CLASS, AWC_TASKS_PANEL_HEADING_CLASS } from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import {
  PROJECT_PAGE_TASKS_COPY as C,
  PROJECT_TASK_STATUS_LABEL,
} from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { ProjectTaskDisplayStatus } from "@/features/projects/tasks/projectTaskDisplayStatus";
import {
  buildProjectTaskTimelineSteps,
  projectTaskTimelineStepClass,
  type ProjectTaskTimelineStepClass,
} from "@/features/projects/tasks/utils/projectTaskTimeline";

const NODE: Record<ProjectTaskTimelineStepClass, string> = {
  ok: "✓",
  "end-failed": "!",
  "end-cancelled": "–",
  cur: "",
  pend: "",
};

const NODE_TONE: Record<ProjectTaskTimelineStepClass, string> = {
  ok: "border-awc-fg bg-awc-fg text-awc-surface",
  cur: "border-awc-fg bg-awc-info-soft",
  "end-failed": "border-awc-fg bg-awc-surface text-awc-fg",
  "end-cancelled": "border-awc-control-border bg-awc-fill text-awc-fg-subtle",
  pend: "border-awc-border-strong bg-awc-surface text-awc-fg-subtle",
};

/** Task detail "Status" card: design step timeline for the current status. */
export default function AwcProjectTaskTimeline({
  status,
}: {
  readonly status: ProjectTaskDisplayStatus;
}) {
  const steps = buildProjectTaskTimelineSteps(status);
  return (
    <div className={`${AWC_TASKS_CARD_CLASS} p-4`}>
      <h3 className={`${AWC_TASKS_PANEL_HEADING_CLASS} mb-3`}>{C.statusTimeline}</h3>
      <ol className="m-0 flex list-none flex-col p-0">
        {steps.map((s, idx) => {
          const cls = projectTaskTimelineStepClass(s, status);
          const labelTone =
            cls === "pend" ? "font-medium text-awc-fg-subtle" : "font-semibold text-awc-fg";
          const isLast = idx === steps.length - 1;
          return (
            <li
              key={`${s}-${idx}`}
              className={`relative grid grid-cols-[22px_1fr] items-center gap-2.5 ${isLast ? "" : "pb-4"}`}
            >
              {!isLast ? (
                <span
                  className={`absolute bottom-0.5 left-[10px] top-[22px] w-0.5 ${
                    cls === "ok" ? "bg-awc-fg" : "bg-awc-border-strong"
                  }`}
                  aria-hidden="true"
                />
              ) : null}
              <span
                className={`relative z-[1] inline-grid h-[22px] w-[22px] place-items-center rounded-full border-2 text-[11px] font-extrabold ${NODE_TONE[cls]}`}
                aria-hidden="true"
              >
                {NODE[cls]}
              </span>
              <span className={`text-[13px] ${labelTone}`}>
                {PROJECT_TASK_STATUS_LABEL[s]}
                {cls === "cur" ? <span className="sr-only"> (now)</span> : null}
                {cls === "pend" ? <span className="sr-only"> (not yet)</span> : null}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
