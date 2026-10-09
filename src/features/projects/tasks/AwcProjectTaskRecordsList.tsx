"use client";

import { PROJECT_TASK_BOARD_COPY as B } from "@/features/projects/tasks/projectTaskBoardCopy.constant";
import { useState } from "react";

import useAwcProjectHashDeepLink from "@/features/projects/hooks/useAwcProjectHashDeepLink";
import AwcProjectTaskRecordDetail from "@/features/projects/tasks/AwcProjectTaskRecordDetail";
import AwcProjectTaskCreateDialog from "@/features/projects/tasks/AwcProjectTaskCreateDialog";
import AwcProjectTaskBoard from "@/features/projects/tasks/AwcProjectTaskBoard";
import AwcProjectTaskRecordListView from "@/features/projects/tasks/AwcProjectTaskRecordListView";
import AwcProjectTaskRecordsHeader from "@/features/projects/tasks/AwcProjectTaskRecordsHeader";
import { type ProjectTaskRecordsView } from "@/features/projects/tasks/AwcProjectTaskRecordViewToggle";
import { useBoardColumnVisibility } from "@/features/projects/tasks/useBoardColumnVisibility";
import {
  AWC_TASKS_CARD_CLASS,
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
  const boardColumns = useBoardColumnVisibility();
  const listView = useProjectTaskRecordView(records);
  const [creating, setCreating] = useState(false);
  const [view, setView] = useState<ProjectTaskRecordsView>(initialView);
  const [recordId, setRecordId] = useAwcProjectHashDeepLink("tasks", "record");
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
      <AwcProjectTaskRecordsHeader
        view={view}
        onViewChange={setView}
        boardColumns={boardColumns}
        onCreate={() => setCreating(true)}
      />
      {creating ? (
        <AwcProjectTaskCreateDialog
          projectId={projectId}
          reload={reload}
          onClose={() => setCreating(false)}
        />
      ) : null}
      {loadFailed ? (
        <p className={`px-3.5 ${AWC_TASKS_STATUS_CLASS}`}>{C.loadError}</p>
      ) : records.length === 0 ? (
        <p className={`px-3.5 pb-3 ${AWC_TASKS_STATUS_CLASS}`}>
          {B.createEmpty}
        </p>
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
