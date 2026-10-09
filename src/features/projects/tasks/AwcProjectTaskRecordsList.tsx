"use client";

import { useState } from "react";

import useAwcProjectHashDeepLink from "@/features/projects/hooks/useAwcProjectHashDeepLink";
import AwcProjectTaskRecordDetail from "@/features/projects/tasks/AwcProjectTaskRecordDetail";
import AwcProjectTaskBoard from "@/features/projects/tasks/AwcProjectTaskBoard";
import AwcProjectTaskRecordListView from "@/features/projects/tasks/AwcProjectTaskRecordListView";
import AwcProjectTaskRecordViewToggle, {
  type ProjectTaskRecordsView,
} from "@/features/projects/tasks/AwcProjectTaskRecordViewToggle";
import {
  AWC_TASKS_CARD_CLASS,
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
  initialView = "board",
}: {
  readonly projectId: string;
  readonly records: readonly ProjectTaskRecord[];
  readonly loadFailed: boolean;
  readonly reload: () => void;
  readonly initialView?: ProjectTaskRecordsView;
}) {
  const listView = useProjectTaskRecordView(records);
  const [view, setView] = useState<ProjectTaskRecordsView>(initialView);
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
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 pt-3 pb-1">
        <h3 className={`m-0 ${AWC_TASKS_PANEL_HEADING_CLASS}`}>{C.heading}</h3>
        <AwcProjectTaskRecordViewToggle view={view} onChange={setView} />
      </div>
      {loadFailed ? (
        <p className={`px-3.5 ${AWC_TASKS_STATUS_CLASS}`}>{C.loadError}</p>
      ) : view === "board" ? (
        <AwcProjectTaskBoard
          projectId={projectId}
          records={records}
          reload={reload}
          onOpen={setRecordId}
        />
      ) : (
        <AwcProjectTaskRecordListView view={listView} onOpen={setRecordId} />
      )}
    </section>
  );
}
