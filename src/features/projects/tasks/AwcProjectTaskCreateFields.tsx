"use client";

import { PROJECT_TASK_BOARD_COPY as B } from "@/features/projects/tasks/projectTaskBoardCopy.constant";
import { AWC_TASKS_INPUT_CLASS } from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import {
  PROJECT_TASK_RECORD_PRIORITY_LABEL as PRIORITY,
  PROJECT_TASK_RECORD_STATUS_LABEL as STATUS,
  PROJECT_TASK_RECORDS_COPY as C,
} from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import type { useCreateTaskForm } from "@/features/projects/tasks/useCreateTaskForm";
import { useProjectTaskSeats } from "@/features/projects/tasks/useProjectTaskSeats";
import {
  PROJECT_TASK_DESCRIPTION_MAX_CHARS,
  PROJECT_TASK_PRIORITIES,
  PROJECT_TASK_TITLE_MAX_CHARS,
  type ProjectTaskPriority,
} from "@/lib/projects/tasks/projectTaskTools.constant";

const field = (label: string, control: React.ReactNode) => (
  <label className="flex flex-col gap-1 text-[12.5px] text-awc-fg-muted">
    {label}
    {control}
  </label>
);

/** Inputs of the Create task dialog. */
export default function AwcProjectTaskCreateFields({
  projectId,
  form,
}: {
  readonly projectId: string;
  readonly form: ReturnType<typeof useCreateTaskForm>;
}) {
  const seats = useProjectTaskSeats(projectId);
  return (
    <>
      {field(
        B.createFieldTitle,
        <input
          autoFocus
          className={AWC_TASKS_INPUT_CLASS}
          maxLength={PROJECT_TASK_TITLE_MAX_CHARS}
          value={form.title}
          onChange={(e) => {
            form.setTitle(e.target.value);
          }}
        />,
      )}
      {form.missingTitle ? (
        <p role="alert" className="m-0 text-[12.5px] text-awc-bad">
          {B.createTitleRequired}
        </p>
      ) : null}
      {field(
        B.createFieldDescription,
        <textarea
          className={AWC_TASKS_INPUT_CLASS}
          rows={3}
          maxLength={PROJECT_TASK_DESCRIPTION_MAX_CHARS}
          value={form.description}
          onChange={(e) => form.setDescription(e.target.value)}
        />,
      )}
      <div className="grid grid-cols-2 gap-3">
        {field(
          C.controlPriority,
          <select
            className={AWC_TASKS_INPUT_CLASS}
            value={form.priority}
            onChange={(e) =>
              form.setPriority(e.target.value as ProjectTaskPriority | "")
            }
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
          B.createFieldStatus,
          <select
            className={AWC_TASKS_INPUT_CLASS}
            value={form.status}
            onChange={(e) =>
              form.setStatus(e.target.value as "queued" | "planned")
            }
          >
            <option value="queued">{STATUS.queued}</option>
            <option value="planned">{STATUS.planned}</option>
          </select>,
        )}
      </div>
      {field(
        C.controlAssignee,
        <select
          className={AWC_TASKS_INPUT_CLASS}
          value={form.owner}
          disabled={seats === null}
          onChange={(e) => form.setOwner(e.target.value)}
        >
          <option value="">
            {seats === null ? C.seatsLoading : C.unassigned}
          </option>
          {(seats ?? []).map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>,
      )}
    </>
  );
}
