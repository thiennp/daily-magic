import type { AwcMessengerStateChip } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { formatMessengerStateLabel } from "@/features/projects/messenger/utils/formatMessengerStateLabel";
import { messengerStateChipTone } from "@/features/projects/messenger/utils/messengerStateChipTone";

interface AwcMessengerStateChipsProps {
  readonly states: readonly AwcMessengerStateChip[];
}

const TONE_CLASS: Record<string, string> = {
  ok: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100",
  info: "border-gray-200 bg-gray-50 text-gray-800 dark:border-gray-700 dark:bg-white/10 dark:text-gray-100",
  warn: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100",
  err: "border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-100",
  muted:
    "border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-700 dark:bg-white/5 dark:text-gray-300",
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
