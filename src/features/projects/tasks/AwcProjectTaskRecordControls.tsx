"use client";

import {
  AWC_TASKS_CARD_CLASS,
  AWC_TASKS_INPUT_CLASS,
  AWC_TASKS_PANEL_HEADING_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import AwcProjectTaskRecordPatchNotice from "@/features/projects/tasks/AwcProjectTaskRecordPatchNotice";
import {
  PROJECT_TASK_RECORD_PRIORITY_LABEL as PRIORITY,
  PROJECT_TASK_RECORD_STATUS_LABEL as STATUS,
  PROJECT_TASK_RECORDS_COPY as C,
} from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import { usePatchProjectTaskRecord } from "@/features/projects/tasks/usePatchProjectTaskRecord";
import { useProjectTaskSeats } from "@/features/projects/tasks/useProjectTaskSeats";
import { projectTaskStatusChoices } from "@/features/projects/tasks/utils/projectTaskRecordChange";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import {
  PROJECT_TASK_PRIORITIES,
  type ProjectTaskPriority,
  type ProjectTaskStatus,
} from "@/lib/projects/tasks/projectTaskTools.constant";

const asPriority = (value: string): ProjectTaskPriority | null =>
  (PROJECT_TASK_PRIORITIES as readonly string[]).includes(value)
    ? (value as ProjectTaskPriority)
    : null;

/** Status / priority / assignee selects; each change PATCHes then reloads. */
export default function AwcProjectTaskRecordControls({
  projectId,
  task,
  reload,
}: {
  readonly projectId: string;
  readonly task: ProjectTaskRecord;
  readonly reload: () => void;
}) {
  const seats = useProjectTaskSeats(projectId);
  const patch = usePatchProjectTaskRecord({ projectId, task, reload });
  const owner = task.ownerMembershipId;
  const ownerKnown = seats?.some((s) => s.id === owner) ?? false;
  const field = (label: string, control: React.ReactNode) => (
    <label className="flex flex-col gap-1 text-[12.5px] text-awc-fg-muted">
      {label}
      {control}
    </label>
  );
  return (
    <div className={`${AWC_TASKS_CARD_CLASS} flex flex-col gap-3 p-4`}>
      <h3 className={AWC_TASKS_PANEL_HEADING_CLASS}>{C.controlsHeading}</h3>
      {field(
        C.controlStatus,
        <select
          className={AWC_TASKS_INPUT_CLASS}
          value={task.status}
          disabled={patch.pending}
          onChange={(e) => {
            patch.request({ status: e.target.value as ProjectTaskStatus });
          }}
        >
          {projectTaskStatusChoices(task.status).map((s) => (
            <option key={s} value={s}>
              {STATUS[s]}
            </option>
          ))}
        </select>,
      )}
      {field(
        C.controlPriority,
        <select
          className={AWC_TASKS_INPUT_CLASS}
          value={task.priority ?? ""}
          disabled={patch.pending}
          onChange={(e) => {
            patch.request({ priority: asPriority(e.target.value) });
          }}
        >
          <option value="">{C.noPriority}</option>
          {PROJECT_TASK_PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p.toUpperCase()} {PRIORITY[p]}
            </option>
          ))}
        </select>,
      )}
      {field(
        C.controlAssignee,
        <select
          className={AWC_TASKS_INPUT_CLASS}
          value={owner ?? ""}
          disabled={patch.pending || seats === null}
          onChange={(e) => {
            patch.request({ ownerMembershipId: e.target.value || null });
          }}
        >
          <option value="">
            {seats === null ? C.seatsLoading : C.unassigned}
          </option>
          {owner !== null && !ownerKnown ? (
            <option value={owner}>{task.ownerDisplayName ?? owner}</option>
          ) : null}
          {(seats ?? []).map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>,
      )}
      <AwcProjectTaskRecordPatchNotice
        pending={patch.pending}
        error={patch.error}
        confirming={patch.confirming}
        onConfirm={(p) => {
          void patch.send(p);
        }}
        onCancel={patch.cancel}
      />
    </div>
  );
}
