"use client";

import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

export type AwcHumanInviteEmailLockFieldProps = {
  readonly checked: boolean;
  readonly disabled?: boolean;
  readonly onChange: (checked: boolean) => void;
};

/** Checkbox: Only this email can join (default off). */
export default function AwcHumanInviteEmailLockField({
  checked,
  disabled = false,
  onChange,
}: AwcHumanInviteEmailLockFieldProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  return (
    <label className="flex cursor-pointer items-start gap-2 text-sm text-awc-fg dark:text-gray-300">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 rounded border-awc-border-strong text-brand-600 focus:ring-brand-500"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{copy.emailLockCheckbox}</span>
    </label>
  );
}
