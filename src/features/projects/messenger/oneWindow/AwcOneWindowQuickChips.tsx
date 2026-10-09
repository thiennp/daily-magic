import {
  buildOneWindowQuickChips,
  type OneWindowQuickChip,
} from "@/features/projects/messenger/oneWindow/oneWindowQuickChips";
import { requestOneWindowComposerPrefill } from "@/features/projects/messenger/oneWindow/oneWindowComposerPrefill";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

interface AwcOneWindowQuickChipsProps {
  readonly records: readonly ProjectTaskRecord[];
  readonly disabled: boolean;
}

/** Fast actions: click fills the box, the user reviews and sends. */
export default function AwcOneWindowQuickChips({
  records,
  disabled,
}: AwcOneWindowQuickChipsProps) {
  const chips: readonly OneWindowQuickChip[] =
    buildOneWindowQuickChips(records);
  return (
    <div className="flex flex-wrap gap-1.5" aria-label="Quick actions">
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          disabled={disabled}
          title={chip.text}
          onClick={() => requestOneWindowComposerPrefill(chip.text)}
          className="rounded-full border border-awc-border bg-awc-surface px-3 py-1 text-[12px] text-awc-fg-muted hover:text-awc-fg disabled:opacity-50"
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
