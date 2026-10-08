"use client";

import type { OneWindowPickerAssistant } from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerPicker";

interface AwcOneWindowComposerPickerRecipientsProps {
  readonly assistants: readonly OneWindowPickerAssistant[];
  readonly subtitle: string;
  readonly selected: string | null;
  readonly setSelected: (next: string | null) => void;
  readonly setKeep: (next: boolean) => void;
}

/** Recipient radios inside the One window composer picker. */
export default function AwcOneWindowComposerPickerRecipients(
  p: AwcOneWindowComposerPickerRecipientsProps,
) {
  return (
    <div className="grid gap-1" role="radiogroup" aria-label="Recipients">
      <span className="px-2 text-[12.5px] text-awc-fg-subtle">
        {p.subtitle}
      </span>
      {p.assistants.map((a) => {
        const checked = p.selected === a.membershipId;
        return (
          <label
            key={a.membershipId}
            className="flex cursor-pointer items-start gap-2.5 rounded-lg px-2 py-2 hover:bg-awc-tile"
          >
            <input
              type="radio"
              name="recipient"
              checked={checked}
              onChange={() => {
                p.setSelected(a.membershipId);
              }}
              className="mt-0.5 h-4 w-4 accent-awc-primary"
            />
            <span className="min-w-0 flex-1 text-sm font-medium text-awc-fg">
              {a.displayName}
            </span>
          </label>
        );
      })}
    </div>
  );
}
