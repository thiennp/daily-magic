"use client";

interface AccountSwitchProps {
  readonly checked: boolean;
  readonly label: string;
  readonly disabled?: boolean;
  readonly onToggle: () => void;
}

/** Design switch: role=switch, stays focusable when blocked. */
export default function AccountSwitch({
  checked,
  label,
  disabled = false,
  onToggle,
}: AccountSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      aria-disabled={disabled || undefined}
      onClick={() => {
        if (!disabled) {
          onToggle();
        }
      }}
      className={`inline-flex h-[26px] w-11 shrink-0 items-center rounded-full p-[3px] transition-colors ${
        checked ? "bg-awc-ok-dot" : "bg-awc-control-border"
      } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <i
        className={`size-5 rounded-full bg-awc-surface transition-transform ${
          checked ? "translate-x-[18px]" : ""
        }`}
      />
    </button>
  );
}
