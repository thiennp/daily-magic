"use client";

import { HUMAN_INVITE_EMAIL_COPY } from "@/features/projects/access/humanInvites/humanInviteEmailCopy.constant";

export type AwcHumanInviteApprovalFieldProps = {
  readonly checked: boolean;
  readonly disabled?: boolean;
  readonly onChange: (checked: boolean) => void;
};

/** Checkbox: Approve before they join (default on; same pattern as email lock). */
export default function AwcHumanInviteApprovalField({
  checked,
  disabled = false,
  onChange,
}: AwcHumanInviteApprovalFieldProps) {
  return (
    <label className="flex cursor-pointer items-start gap-2 text-sm text-awc-fg dark:text-gray-300">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 rounded border-awc-border-strong text-brand-600 focus:ring-brand-500"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{HUMAN_INVITE_EMAIL_COPY.approvalCheckbox}</span>
    </label>
  );
}
