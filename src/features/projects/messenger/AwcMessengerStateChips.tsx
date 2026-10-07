import type { AwcMessengerStateChip } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { formatMessengerStateLabel } from "@/features/projects/messenger/utils/formatMessengerStateLabel";
import { messengerStateChipTone } from "@/features/projects/messenger/utils/messengerStateChipTone";

interface AwcMessengerStateChipsProps {
  readonly states: readonly AwcMessengerStateChip[];
}

const TONE_CLASS: Record<string, string> = {
  ok: "border-awc-border bg-awc-ok-soft text-awc-ok dark:border-gray-700 dark:bg-white/10 dark:text-gray-100",
  info: "border-awc-border bg-awc-info-soft text-awc-info dark:border-gray-700 dark:bg-white/10 dark:text-gray-100",
  warn: "border-awc-border bg-awc-warn-soft text-awc-warn dark:border-gray-700 dark:bg-white/10 dark:text-gray-100",
  err: "border-awc-border bg-awc-bad-soft text-awc-bad dark:border-gray-700 dark:bg-white/10 dark:text-gray-100",
  muted:
    "border-awc-border bg-awc-tile-2 text-awc-fg-muted dark:border-gray-700 dark:bg-white/5 dark:text-gray-300",
};

export default function AwcMessengerStateChips({
  states,
}: AwcMessengerStateChipsProps) {
  if (states.length === 0) return null;
  return (
    <div className="mt-1 flex flex-wrap gap-1.5">
      {states.map((chip) => {
        const tone = messengerStateChipTone(chip.state);
        const label = formatMessengerStateLabel(chip.state, chip.displayName);
        const reason =
          chip.state === "blocked" && chip.reason !== null
            ? ` — ${chip.reason}`
            : "";
        const namePrefix =
          chip.displayName !== null && chip.displayName.trim().length > 0
            ? `${chip.displayName}: `
            : "";
        return (
          <span
            key={`${chip.membershipId}-${chip.state}`}
            className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${TONE_CLASS[tone]}`}
          >
            {namePrefix}
            {label}
            {reason}
          </span>
        );
      })}
    </div>
  );
}
