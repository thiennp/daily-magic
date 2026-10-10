import type { MemberPermissionRowCopy } from "@/features/projects/settings/memberPermissions/memberPermissionsCopy.constant";

interface AwcMemberPermissionSwitchProps {
  readonly row: MemberPermissionRowCopy;
  readonly on: boolean;
  readonly disabled: boolean;
  readonly onToggle: () => void;
}

/** One "members can …" switch row: label, hint, and the pill. */
export default function AwcMemberPermissionSwitch({
  row,
  on,
  disabled,
  onToggle,
}: AwcMemberPermissionSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={onToggle}
      className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-all hover:bg-awc-tile/70 disabled:cursor-wait disabled:opacity-60 dark:hover:bg-white/10"
    >
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-awc-fg dark:text-white/90">
          {row.label}
        </span>
        <span className="mt-0.5 block text-[13px] text-awc-fg-muted dark:text-gray-400">
          {row.hint}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={`relative inline-flex h-7 w-[46px] shrink-0 rounded-full transition-colors ${
          on ? "bg-gray-800 dark:bg-white/80" : "bg-gray-200 dark:bg-white/15"
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-[18px]" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}
