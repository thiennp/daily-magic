"use client";

import useAwcProjectHashDeepLink from "@/features/projects/hooks/useAwcProjectHashDeepLink";
import AwcProjectTaskRecordDetail from "@/features/projects/tasks/AwcProjectTaskRecordDetail";
import AwcProjectTaskRecordRow from "@/features/projects/tasks/AwcProjectTaskRecordRow";
import AwcProjectTaskRecordSort from "@/features/projects/tasks/AwcProjectTaskRecordSort";
import AwcProjectTaskRecordTabs from "@/features/projects/tasks/AwcProjectTaskRecordTabs";
import {
  AWC_TASKS_CARD_CLASS,
  AWC_TASKS_LIST_CLASS,
  AWC_TASKS_PANEL_HEADING_CLASS,
  AWC_TASKS_STATUS_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_TASK_RECORDS_COPY as C } from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import { useProjectTaskRecordView } from "@/features/projects/tasks/useProjectTaskRecordView";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

/** DF-024: task records split into status tabs, sortable (meta only). */
export default function AwcProjectTaskRecordsList({
  projectId,
  records,
  loadFailed,
  reload,
}: {
  readonly projectId: string;
  readonly records: readonly ProjectTaskRecord[];
  readonly loadFailed: boolean;
  readonly reload: () => void;
}) {
  const view = useProjectTaskRecordView(records);
  const [recordId, setRecordId] = useAwcProjectHashDeepLink("tasks", "record");
  if (!loadFailed && records.length === 0) return null;
  const selected = records.find((r) => r.id === recordId) ?? null;
  if (selected !== null) {
    return (
      <section aria-label={C.aria} className={AWC_TASKS_CARD_CLASS}>
        <AwcProjectTaskRecordDetail
          projectId={projectId}
          task={selected}
          records={records}
          reload={reload}
          onBack={() => {
            setRecordId(null);
          }}
        />
      </section>
    );
  }
  return (
    <section aria-label={C.aria} className={AWC_TASKS_CARD_CLASS}>
      <h3 className={`px-3.5 pt-3 pb-1 ${AWC_TASKS_PANEL_HEADING_CLASS}`}>
        {C.heading}
      </h3>
      {loadFailed ? (
        <p className={`px-3.5 ${AWC_TASKS_STATUS_CLASS}`}>{C.loadError}</p>
      ) : (
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
                  onOpen={setRecordId}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
