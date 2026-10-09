import AwcOneWindowCreateTaskToggle from "@/features/projects/messenger/oneWindow/AwcOneWindowCreateTaskToggle";
import AwcOneWindowExistingTaskConfirm from "@/features/projects/messenger/oneWindow/AwcOneWindowExistingTaskConfirm";
import AwcOneWindowQuickChips from "@/features/projects/messenger/oneWindow/AwcOneWindowQuickChips";
import type { useOneWindowCreateTask } from "@/features/projects/messenger/oneWindow/useOneWindowCreateTask";

interface AwcOneWindowComposerCreateTaskRowProps {
  readonly create: ReturnType<typeof useOneWindowCreateTask>;
  readonly send: (text: string) => Promise<boolean>;
  readonly busy: boolean;
  readonly draftEmpty: boolean;
  /** A parked send went out: clear the draft. */
  readonly onSent: () => void;
}

/** Chips (empty box), the "Create a task" checkbox, and the existing-task prompt. */
export default function AwcOneWindowComposerCreateTaskRow({
  create,
  send,
  busy,
  draftEmpty,
  onSent,
}: AwcOneWindowComposerCreateTaskRowProps) {
  const resolve = (go: Promise<boolean>): void => {
    void go.then((ok) => {
      if (ok) onSent();
    });
  };
  return (
    <>
      {create.pending !== null ? (
        <AwcOneWindowExistingTaskConfirm
          pending={create.pending}
          busy={busy}
          onUseExisting={() => resolve(create.confirmExisting())}
          onCreateNew={() => resolve(create.createAnyway(send))}
          onCancel={create.cancel}
        />
      ) : null}
      {draftEmpty && create.pending === null ? (
        <AwcOneWindowQuickChips records={create.records} disabled={busy} />
      ) : null}
      <AwcOneWindowCreateTaskToggle
        checked={create.checked}
        onChange={create.setChecked}
      />
    </>
  );
}
