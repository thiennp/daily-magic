"use client";

import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

export type AwcHumanInviteNicknameFieldProps = {
  readonly value: string;
  readonly error?: string | null;
  readonly disabled?: boolean;
  readonly onChange?: (value: string) => void;
};

/** Project nickname input on human accept — mirrors bot Approve nickname field. */
export default function AwcHumanInviteNicknameField({
  value,
  error = null,
  disabled = false,
  onChange,
}: AwcHumanInviteNicknameFieldProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  return (
    <label className="mt-4 block text-xs text-gray-600 dark:text-gray-300">
      {copy.nicknameLabel}
      <input
        className="mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-950"
        name="projectDisplayName"
        autoComplete="nickname"
        maxLength={32}
        value={value}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        onChange={(event) => onChange?.(event.target.value)}
      />
      <span className="mt-1 block text-[11px] text-gray-500">
        {copy.nicknameHint}
      </span>
      {error ? (
        <span role="alert" className="mt-1 block text-[11px] text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}
