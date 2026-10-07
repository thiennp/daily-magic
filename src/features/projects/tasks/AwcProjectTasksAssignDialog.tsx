"use client";

import AwcProjectTasksAssignGitFields from "@/features/projects/tasks/AwcProjectTasksAssignGitFields";
import AwcProjectTasksAssignTaskFields from "@/features/projects/tasks/AwcProjectTasksAssignTaskFields";
import {
  AWC_TASKS_PRIMARY_BUTTON_CLASS,
  AWC_TASKS_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import {
  useAwcProjectTasksAssignForm,
  type AwcProjectTasksAssignFormInput,
} from "@/features/projects/tasks/useAwcProjectTasksAssignForm";

/**
 * Assign dialog — Screen D (EN PASS). Submits via existing
 * POST /api/projects/:id/inbox/dispatch (sendMessengerTask → task.assign).
 * Branch/Worktree UI stays meta-only (names); allowlisted refs do not include
 * branch/worktree, so they are not POSTed (no new schema on this tip).
 */
export default function AwcProjectTasksAssignDialog(
  props: AwcProjectTasksAssignFormInput,
) {
  const { open, hasGit, onClose } = props;
  const form = useAwcProjectTasksAssignForm(props);
  const { pending, peersError, error, canSubmit, submit } = form;

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={C.assignTitle}
      className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(16,24,40,0.35)] p-4"
    >
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-awc-border-strong bg-awc-surface shadow-[0_12px_32px_rgba(16,24,40,0.18)]">
        <div className="flex items-center gap-2 border-b border-awc-border px-4 py-3.5">
          <h3 className="m-0 flex-1 text-[16px] font-semibold text-awc-fg">{C.assignTitle}</h3>
          <button
            type="button"
            className={AWC_TASKS_SECONDARY_BUTTON_CLASS}
            aria-label="Close"
            disabled={pending}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="max-h-[60vh] overflow-auto px-4 py-4">
          <AwcProjectTasksAssignTaskFields form={form} />
          {hasGit ? (
            <AwcProjectTasksAssignGitFields form={form} />
          ) : null}
          {peersError !== null ? (
            <p role="alert" className="mt-2 text-[13px] text-red-600">
              {peersError}
            </p>
          ) : null}
          {error !== null ? (
            <p role="alert" className="mt-2 text-[13px] text-red-600">
              {error}
            </p>
          ) : null}
        </div>
        <div className="flex justify-end gap-2 border-t border-awc-border bg-awc-surface-2 px-4 py-3">
          <button
            type="button"
            className={AWC_TASKS_SECONDARY_BUTTON_CLASS}
            disabled={pending}
            onClick={onClose}
          >
            {C.assignCancel}
          </button>
          <button
            type="button"
            className={AWC_TASKS_PRIMARY_BUTTON_CLASS}
            disabled={!canSubmit}
            onClick={submit}
          >
            {pending ? C.assignPending : C.assignSubmit}
          </button>
        </div>
      </div>
    </div>
  );
}
