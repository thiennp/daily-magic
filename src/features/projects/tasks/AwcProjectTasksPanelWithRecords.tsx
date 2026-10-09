"use client";

import AwcProjectTaskRecordsList from "@/features/projects/tasks/AwcProjectTaskRecordsList";
import AwcProjectTasksPanel from "@/features/projects/tasks/AwcProjectTasksPanel";
import useProjectTaskRecords from "@/features/projects/tasks/useProjectTaskRecords";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/**
 * Tasks tab (DF-024): stand-alone task records ("Planned work", meta only)
 * above the existing assistant-run list. Records hide when there are none.
 */
export default function AwcProjectTasksPanelWithRecords({
  project,
  readOnly = false,
}: {
  readonly project: UserProjectRecord;
  /** A viewer reads tasks but cannot create or change them (the server answers 403). */
  readonly readOnly?: boolean;
}) {
  const records = useProjectTaskRecords(project.id);
  return (
    <div className="flex min-w-0 flex-col gap-3.5">
      <AwcProjectTaskRecordsList
        projectId={project.id}
        records={records.records}
        loadFailed={records.loadFailed}
        reload={records.reload}
        readOnly={readOnly}
      />
      <AwcProjectTasksPanel project={project} />
    </div>
  );
}
