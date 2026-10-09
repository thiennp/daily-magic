"use client";

import { PROJECT_TASK_BOARD_COPY as B } from "@/features/projects/tasks/projectTaskBoardCopy.constant";
import { useMemo, useState } from "react";

import AwcProjectTaskBoardColumn from "@/features/projects/tasks/AwcProjectTaskBoardColumn";
import AwcProjectTaskRecordPatchNotice from "@/features/projects/tasks/AwcProjectTaskRecordPatchNotice";
import { useProjectTaskBoardMove } from "@/features/projects/tasks/useProjectTaskBoardMove";
import {
  canMoveProjectTask,
  groupProjectTasksForBoard,
  nextBoardVisibleCount,
  PROJECT_TASK_BOARD_PAGE_SIZE,
  PROJECT_TASK_BOARD_COLUMNS,
} from "@/features/projects/tasks/utils/projectTaskBoard";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import type { ProjectTaskStatus } from "@/lib/projects/tasks/projectTaskTools.constant";

/** Jira-style board: one column per status; drag a card to change its status. */
export default function AwcProjectTaskBoard({
  projectId,
  records,
  reload,
  onOpen,
  columns: shownColumns,
}: {
  readonly projectId: string;
  readonly records: readonly ProjectTaskRecord[];
  readonly reload: () => void;
  readonly onOpen: (id: string) => void;
  /** Statuses to draw, in order (the user may hide some). */
  readonly columns?: readonly ProjectTaskStatus[];
}) {
  const columns = useMemo(() => groupProjectTasksForBoard(records), [records]);
  const [dragged, setDragged] = useState<ProjectTaskRecord | null>(null);
  const [shown, setShown] = useState<
    Partial<Record<ProjectTaskStatus, number>>
  >({});
  const board = useProjectTaskBoardMove({ projectId, reload });
  return (
    <div className="flex flex-col gap-2.5 px-3.5 pb-3.5 pt-3">
      <AwcProjectTaskRecordPatchNotice
        pending={board.pending}
        error={board.error}
        confirming={
          board.confirming === null ? null : { status: board.confirming.to }
        }
        onConfirm={() => {
          if (board.confirming !== null) void board.confirm(board.confirming);
        }}
        onCancel={board.cancel}
      />
      <p className="m-0 text-[12.5px] text-awc-fg-subtle">{B.boardHint}</p>
      <div className="flex gap-3 overflow-x-auto pb-1" aria-label={B.boardAria}>
        {(shownColumns ?? PROJECT_TASK_BOARD_COLUMNS).map((status) => (
          <AwcProjectTaskBoardColumn
            key={status}
            status={status}
            tasks={columns[status]}
            visibleCount={shown[status] ?? PROJECT_TASK_BOARD_PAGE_SIZE}
            onShowMore={() =>
              setShown((prev) => ({
                ...prev,
                [status]: nextBoardVisibleCount(
                  prev[status],
                  columns[status].length,
                ),
              }))
            }
            dragging={dragged !== null}
            droppable={
              dragged !== null && canMoveProjectTask(dragged.status, status)
            }
            onOpen={onOpen}
            onDragStart={setDragged}
            onDragEnd={() => setDragged(null)}
            onDrop={(to) => {
              if (dragged !== null) board.move({ task: dragged, to });
              setDragged(null);
            }}
          />
        ))}
      </div>
    </div>
  );
}
