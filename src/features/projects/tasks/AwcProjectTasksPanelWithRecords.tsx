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
}: {
  readonly project: UserProjectRecord;
}) {
  const records = useProjectTaskRecords(project.id);
  return (
    <div className="flex min-w-0 flex-col gap-3.5">
      <AwcProjectTaskRecordsList
        records={records.records}
        loadFailed={records.loadFailed}
      />
      <AwcProjectTasksPanel project={project} />
    </div>
  );
}
