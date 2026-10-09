import AwcProjectTaskBoardCard from "@/features/projects/tasks/AwcProjectTaskBoardCard";
import { PROJECT_TASK_RECORD_STATUS_LABEL as STATUS } from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import type { ProjectTaskStatus } from "@/lib/projects/tasks/projectTaskTools.constant";

/** One status column; it accepts a dropped card only when `droppable`. */
export default function AwcProjectTaskBoardColumn({
  status,
  tasks,
  droppable,
  dragging,
  onOpen,
  onDragStart,
  onDragEnd,
  onDrop,
}: {
  readonly status: ProjectTaskStatus;
  readonly tasks: readonly ProjectTaskRecord[];
  readonly droppable: boolean;
  readonly dragging: boolean;
  readonly onOpen: (id: string) => void;
  readonly onDragStart: (task: ProjectTaskRecord) => void;
  readonly onDragEnd: () => void;
  readonly onDrop: (status: ProjectTaskStatus) => void;
}) {
  const tone = !dragging
    ? "bg-awc-tile"
    : droppable
      ? "bg-awc-tile ring-2 ring-awc-blue-600/50"
      : "bg-awc-tile opacity-50";
  return (
    <section
      aria-label={STATUS[status]}
      data-board-column={status}
      className={`flex w-64 shrink-0 flex-col gap-2 rounded-xl p-2 ${tone}`}
      onDragOver={(event) => {
        if (droppable) event.preventDefault();
      }}
      onDrop={(event) => {
        event.preventDefault();
        if (droppable) onDrop(status);
      }}
    >
      <h4 className="m-0 flex items-baseline justify-between px-1 text-[13px] font-semibold text-awc-fg">
        {STATUS[status]}
        <span className="tabular-nums font-normal text-awc-fg-subtle">
          {tasks.length}
        </span>
      </h4>
      <ul className="m-0 flex min-h-12 flex-col gap-2 p-0">
        {tasks.map((task) => (
          <AwcProjectTaskBoardCard
            key={task.id}
            task={task}
            onOpen={onOpen}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </ul>
    </section>
  );
}
