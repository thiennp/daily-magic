"use client";

import { useMemo, useState } from "react";

import AwcProjectTaskBoardColumn from "@/features/projects/tasks/AwcProjectTaskBoardColumn";
import AwcProjectTaskRecordPatchNotice from "@/features/projects/tasks/AwcProjectTaskRecordPatchNotice";
import { PROJECT_TASK_RECORDS_COPY as C } from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import { useProjectTaskBoardMove } from "@/features/projects/tasks/useProjectTaskBoardMove";
import {
  canMoveProjectTask,
  groupProjectTasksForBoard,
  PROJECT_TASK_BOARD_COLUMNS,
} from "@/features/projects/tasks/utils/projectTaskBoard";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

/** Jira-style board: one column per status; drag a card to change its status. */
export default function AwcProjectTaskBoard({
  projectId,
  records,
  reload,
  onOpen,
}: {
  readonly projectId: string;
  readonly records: readonly ProjectTaskRecord[];
  readonly reload: () => void;
  readonly onOpen: (id: string) => void;
}) {
  const columns = useMemo(() => groupProjectTasksForBoard(records), [records]);
  const [dragged, setDragged] = useState<ProjectTaskRecord | null>(null);
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
      <p className="m-0 text-[12.5px] text-awc-fg-subtle">{C.boardHint}</p>
      <div className="flex gap-3 overflow-x-auto pb-1" aria-label={C.boardAria}>
        {PROJECT_TASK_BOARD_COLUMNS.map((status) => (
          <AwcProjectTaskBoardColumn
            key={status}
            status={status}
            tasks={columns[status]}
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
