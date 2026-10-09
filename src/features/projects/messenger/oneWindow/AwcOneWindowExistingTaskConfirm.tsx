import type { PendingExistingTask } from "@/features/projects/messenger/oneWindow/useOneWindowCreateTask";

interface AwcOneWindowExistingTaskConfirmProps {
  readonly pending: PendingExistingTask;
  readonly busy: boolean;
  readonly onUseExisting: () => void;
  readonly onCreateNew: () => void;
  readonly onCancel: () => void;
}

const BUTTON =
  "rounded-lg border border-awc-border px-3 py-1.5 text-[13px] font-medium text-awc-fg disabled:opacity-50";

/** The assistant already has open work: reuse it or start a new task. */
export default function AwcOneWindowExistingTaskConfirm({
  pending,
  busy,
  onUseExisting,
  onCreateNew,
  onCancel,
}: AwcOneWindowExistingTaskConfirmProps) {
  const count = pending.tasks.length;
  return (
    <div
      role="alertdialog"
      aria-label="Task already exists"
      className="rounded-xl border border-awc-border bg-awc-surface-2 p-3 text-sm text-awc-fg dark:bg-white/[0.03]"
    >
      <p className="m-0 font-medium">
        {count === 1
          ? "This assistant already has an open task:"
          : "This assistant already has open tasks:"}
      </p>
      <ul className="my-1.5 list-disc pl-5 text-[13px] text-awc-fg-muted">
        {pending.tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={BUTTON}
          disabled={busy}
          onClick={onUseExisting}
        >
          {count === 1 ? "Use that task" : "Add to current work"}
        </button>
        <button
          type="button"
          className={BUTTON}
          disabled={busy}
          onClick={onCreateNew}
        >
          Create a new task
        </button>
        <button
          type="button"
          className={BUTTON}
          disabled={busy}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
