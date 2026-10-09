import { PROJECT_TASK_BOARD_COPY as B } from "@/features/projects/tasks/projectTaskBoardCopy.constant";
import { PROJECT_TASK_RECORD_STATUS_LABEL as STATUS } from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import { PROJECT_TASK_BOARD_COLUMNS } from "@/features/projects/tasks/utils/projectTaskBoard";
import type { ProjectTaskStatus } from "@/lib/projects/tasks/projectTaskTools.constant";

/** Board settings: tick the columns to show. The last visible one stays on. */
export default function AwcProjectTaskBoardColumnsMenu({
  hidden,
  onToggle,
}: {
  readonly hidden: readonly ProjectTaskStatus[];
  readonly onToggle: (status: ProjectTaskStatus) => void;
}) {
  const shownCount = PROJECT_TASK_BOARD_COLUMNS.length - hidden.length;
  return (
    <details className="relative">
      <summary className="cursor-pointer list-none rounded-full border border-awc-border-strong bg-awc-surface px-2.5 py-1 text-[13px] font-medium text-awc-fg-muted hover:bg-awc-tile">
        {B.boardColumns}
      </summary>
      <div className="absolute right-0 z-10 mt-1.5 flex min-w-40 flex-col gap-1.5 rounded-lg border border-awc-border-strong bg-awc-surface p-2.5 shadow-lg">
        {PROJECT_TASK_BOARD_COLUMNS.map((status) => {
          const isShown = !hidden.includes(status);
          return (
            <label
              key={status}
              className="flex items-center gap-2 text-[13px] text-awc-fg"
            >
              <input
                type="checkbox"
                checked={isShown}
                disabled={isShown && shownCount === 1}
                onChange={() => onToggle(status)}
              />
              {STATUS[status]}
            </label>
          );
        })}
      </div>
    </details>
  );
}
