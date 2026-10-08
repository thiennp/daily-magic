"use client";

import {
  AWC_TASKS_PRIMARY_BUTTON_CLASS,
  AWC_TASKS_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_TASK_RECORDS_COPY as C } from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import type { ProjectTaskRecordPatch } from "@/features/projects/tasks/utils/projectTaskRecordChange";

/** Inline confirm step, saving state and server error for a record edit. */
export default function AwcProjectTaskRecordPatchNotice({
  pending,
  error,
  confirming,
  onConfirm,
  onCancel,
}: {
  readonly pending: boolean;
  readonly error: string | null;
  readonly confirming: ProjectTaskRecordPatch | null;
  readonly onConfirm: (patch: ProjectTaskRecordPatch) => void;
  readonly onCancel: () => void;
}) {
  return (
    <>
      {confirming !== null ? (
        <div
          role="alertdialog"
          className="flex flex-col gap-2 text-[13px] text-awc-fg"
        >
          <p className="m-0">{C.stopWarning}</p>
          <div className="flex gap-2">
            <button
              type="button"
              className={AWC_TASKS_PRIMARY_BUTTON_CLASS}
              onClick={() => {
                onConfirm(confirming);
              }}
            >
              {C.confirmApply}
            </button>
            <button
              type="button"
              className={AWC_TASKS_SECONDARY_BUTTON_CLASS}
              onClick={onCancel}
            >
              {C.confirmCancel}
            </button>
          </div>
        </div>
      ) : null}
      {pending ? (
        <p className="m-0 text-[12.5px] text-awc-fg-muted" role="status">
          {C.saving}
        </p>
      ) : null}
      {error !== null ? (
        <p className="m-0 text-[12.5px] text-awc-fg" role="alert">
          {error}
        </p>
      ) : null}
    </>
  );
}
