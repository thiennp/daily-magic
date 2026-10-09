"use client";

import { PROJECT_TASK_BOARD_COPY as B } from "@/features/projects/tasks/projectTaskBoardCopy.constant";
import AwcProjectTaskBoardColumnsMenu from "@/features/projects/tasks/AwcProjectTaskBoardColumnsMenu";
import AwcProjectTaskRecordViewToggle, {
  type ProjectTaskRecordsView,
} from "@/features/projects/tasks/AwcProjectTaskRecordViewToggle";
import {
  AWC_TASKS_PANEL_HEADING_CLASS,
  AWC_TASKS_PRIMARY_BUTTON_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_TASK_RECORDS_COPY as C } from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import type { useBoardColumnVisibility } from "@/features/projects/tasks/useBoardColumnVisibility";

/** Planned work title + view switch, board column settings and Create task. */
export default function AwcProjectTaskRecordsHeader({
  view,
  onViewChange,
  boardColumns,
  onCreate,
}: {
  readonly view: ProjectTaskRecordsView;
  readonly onViewChange: (view: ProjectTaskRecordsView) => void;
  readonly boardColumns: ReturnType<typeof useBoardColumnVisibility>;
  readonly onCreate: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 pt-3 pb-1">
      <h3 className={`m-0 ${AWC_TASKS_PANEL_HEADING_CLASS}`}>{C.heading}</h3>
      <span className="flex flex-wrap items-center gap-2">
        <AwcProjectTaskRecordViewToggle view={view} onChange={onViewChange} />
        {view === "board" ? (
          <AwcProjectTaskBoardColumnsMenu
            hidden={boardColumns.hidden}
            onToggle={boardColumns.toggle}
          />
        ) : null}
        <button
          type="button"
          className={AWC_TASKS_PRIMARY_BUTTON_CLASS}
          onClick={onCreate}
        >
          {B.createTask}
        </button>
      </span>
    </div>
  );
}
