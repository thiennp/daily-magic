"use client";

import { PROJECT_TASK_BOARD_COPY as B } from "@/features/projects/tasks/projectTaskBoardCopy.constant";
import AwcProjectTaskCreateFields from "@/features/projects/tasks/AwcProjectTaskCreateFields";
import {
  AWC_TASKS_PRIMARY_BUTTON_CLASS,
  AWC_TASKS_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { useCreateTaskForm } from "@/features/projects/tasks/useCreateTaskForm";

/** "Create task" dialog on the Tasks tab. */
export default function AwcProjectTaskCreateDialog({
  projectId,
  reload,
  onClose,
}: {
  readonly projectId: string;
  readonly reload: () => void;
  readonly onClose: () => void;
}) {
  const form = useCreateTaskForm({ projectId, reload, onCreated: onClose });
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={B.createTitle}
      className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(16,24,40,0.35)] p-4"
    >
      <form
        className="flex w-full max-w-md flex-col gap-3 rounded-xl border border-awc-border-strong bg-awc-surface p-4 shadow-[0_12px_32px_rgba(16,24,40,0.18)]"
        onSubmit={(e) => {
          e.preventDefault();
          void form.submit();
        }}
      >
        <h3 className="m-0 text-[16px] font-semibold text-awc-fg">
          {B.createTitle}
        </h3>
        <AwcProjectTaskCreateFields projectId={projectId} form={form} />
        {form.error !== null ? (
          <p role="alert" className="m-0 text-[12.5px] text-awc-bad">
            {form.error}
          </p>
        ) : null}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className={AWC_TASKS_SECONDARY_BUTTON_CLASS}
            disabled={form.pending}
            onClick={onClose}
          >
            {B.createCancel}
          </button>
          <button
            type="submit"
            className={AWC_TASKS_PRIMARY_BUTTON_CLASS}
            disabled={form.pending}
          >
            {form.pending ? B.createPending : B.createSubmit}
          </button>
        </div>
      </form>
    </div>
  );
}
