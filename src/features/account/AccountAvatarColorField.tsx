"use client";

import { ACCOUNT_LABEL_CLASS } from "@/features/account/accountClasses.constant";
import {
  ACCOUNT_AVATAR_COLORS,
  ACCOUNT_COPY,
} from "@/features/account/accountCopy.constant";

interface AccountAvatarColorFieldProps {
  readonly avatarId: string;
  readonly offline: boolean;
  readonly onChange: (id: string) => void;
}

export default function AccountAvatarColorField({
  avatarId,
  offline,
  onChange,
}: AccountAvatarColorFieldProps) {
  return (
    <fieldset className="space-y-2">
      <legend className={ACCOUNT_LABEL_CLASS}>
        {ACCOUNT_COPY.profile.avatarColor}
      </legend>
      <div className="flex flex-wrap gap-2">
        {ACCOUNT_AVATAR_COLORS.map((color) => (
          <label
            key={color.id}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-awc-border px-2 py-1.5 text-xs dark:border-gray-700"
          >
            <input
              type="radio"
              name="account-avatar-color"
              value={color.id}
              checked={avatarId === color.id}
              disabled={offline}
              onChange={() => {
                onChange(color.id);
              }}
            />
            <span
              className={`inline-block size-4 rounded-full ${color.className}`}
              aria-hidden
            />
            {color.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
