"use client";

import type { Dispatch, SetStateAction } from "react";

import type { OneWindowPickerAssistant } from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerPicker";
import { ONE_WINDOW_COMPOSER_COPY } from "@/features/projects/messenger/oneWindow/oneWindowComposerCopy.constant";

interface AwcOneWindowComposerPickerRecipientsProps {
  readonly assistants: readonly OneWindowPickerAssistant[];
  readonly subtitle: string;
  readonly everyone: boolean;
  readonly selected: readonly string[];
  readonly setEveryone: (next: boolean) => void;
  readonly setSelected: Dispatch<SetStateAction<readonly string[]>>;
  readonly setKeep: (next: boolean) => void;
}

/** Recipient checkboxes inside the One window composer picker. */
export default function AwcOneWindowComposerPickerRecipients(
  p: AwcOneWindowComposerPickerRecipientsProps,
) {
  const copy = ONE_WINDOW_COMPOSER_COPY;
  return (
    <div className="grid gap-1" role="group" aria-label="Recipients">
      <label className="flex cursor-pointer items-start gap-2.5 rounded-lg px-2 py-2 hover:bg-awc-tile">
        <input
          type="checkbox"
          checked={p.everyone}
          onChange={(event) => {
            const next = event.target.checked;
            p.setEveryone(next);
            if (next) p.setSelected([]);
            if (!next && !p.selected.length) p.setKeep(false);
          }}
          className="mt-0.5 h-4 w-4 accent-awc-primary"
        />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-awc-fg">
            {copy.pickerEveryone}
          </span>
          <span className="block text-[12.5px] text-awc-fg-subtle">
            {p.subtitle}
          </span>
        </span>
      </label>
      {p.assistants.map((a) => {
        const checked = p.selected.includes(a.membershipId);
        return (
          <label
            key={a.membershipId}
            className="flex cursor-pointer items-start gap-2.5 rounded-lg px-2 py-2 hover:bg-awc-tile"
          >
            <input
              type="checkbox"
              checked={checked}
              disabled={p.everyone}
              onChange={(event) => {
                const on = event.target.checked;
                p.setSelected((prev) =>
                  on
                    ? [...prev, a.membershipId]
                    : prev.filter((id) => id !== a.membershipId),
                );
                if (!on && p.selected.length <= 1 && !p.everyone)
                  p.setKeep(false);
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
