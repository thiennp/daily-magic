import AwcProjectTaskRecordRow from "@/features/projects/tasks/AwcProjectTaskRecordRow";
import AwcProjectTaskRecordSort from "@/features/projects/tasks/AwcProjectTaskRecordSort";
import AwcProjectTaskRecordTabs from "@/features/projects/tasks/AwcProjectTaskRecordTabs";
import {
  AWC_TASKS_LIST_CLASS,
  AWC_TASKS_STATUS_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_TASK_RECORDS_COPY as C } from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import type { useProjectTaskRecordView } from "@/features/projects/tasks/useProjectTaskRecordView";

/** The status-tab + sortable list of planned work. */
export default function AwcProjectTaskRecordListView({
  view,
  onOpen,
}: {
  readonly view: ReturnType<typeof useProjectTaskRecordView>;
  readonly onOpen: (id: string) => void;
}) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-awc-border px-3.5 pb-2.5">
        <AwcProjectTaskRecordTabs
          tab={view.tab}
          counts={view.counts}
          onChange={view.setTab}
        />
        <AwcProjectTaskRecordSort
          sortKey={view.sortKey}
          sortDir={view.sortDir}
          onKeyChange={view.setSortKey}
          onToggleDir={view.toggleSortDir}
        />
      </div>
      {view.visible.length === 0 ? (
        <p className={`px-3.5 ${AWC_TASKS_STATUS_CLASS}`}>{C.tabEmpty}</p>
      ) : (
        <ul className={AWC_TASKS_LIST_CLASS}>
          {view.visible.map((task) => (
            <AwcProjectTaskRecordRow
              key={task.id}
              task={task}
              onOpen={onOpen}
            />
          ))}
        </ul>
      )}
    </>
  );
}
