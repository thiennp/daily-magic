"use client";

import { useMemo, useState } from "react";

import {
  OW_PRIMARY_BUTTON_CLASS,
  OW_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { keepCheckboxLabel } from "@/features/projects/messenger/oneWindow/formatOneWindowComposerCopy";
import { ONE_WINDOW_COMPOSER_COPY } from "@/features/projects/messenger/oneWindow/oneWindowComposerCopy.constant";
import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";

export type OneWindowPickerAssistant = {
  readonly membershipId: string;
  readonly displayName: string;
};

interface AwcOneWindowComposerPickerProps {
  readonly draftText: string;
  readonly assistants: readonly OneWindowPickerAssistant[];
  readonly peopleCount?: number;
  readonly onCancel: () => void;
  readonly onConfirm: (input: {
    readonly recipient: MessengerKeptRecipient;
    readonly keepSending: boolean;
  }) => void;
}

/** PICKING dialog — Who should get this? (COMPOSER-LOCK). */
export default function AwcOneWindowComposerPicker({
  draftText,
  assistants,
  peopleCount = 0,
  onCancel,
  onConfirm,
}: AwcOneWindowComposerPickerProps) {
  const copy = ONE_WINDOW_COMPOSER_COPY;
  const [everyone, setEveryone] = useState(false);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [keep, setKeep] = useState(false);

  const selectedCount = everyone ? 1 : selected.length;
  const keepLab = keepCheckboxLabel({ everyone, selectedCount });

  const canSend = everyone || selected.length > 0;

  const subtitle = useMemo(
    () =>
      `${assistants.length} assistants${peopleCount > 0 ? `, ${peopleCount} people` : ""}`,
    [assistants.length, peopleCount],
  );

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") onCancel();
      }}
    >
      <div
        className="grid w-full max-w-[440px] gap-3 rounded-[14px] bg-awc-surface p-[18px] shadow-[0_16px_40px_rgba(16,24,40,0.22)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="awc-ow-picker-title"
      >
        <h2 id="awc-ow-picker-title" className="m-0 text-[17px] font-semibold text-awc-fg">
          {copy.pickerTitle}
        </h2>
        <p className="m-0 overflow-wrap-anywhere rounded-lg border border-awc-border bg-awc-surface-2 px-2.5 py-2 text-[13px] text-awc-fg-muted">
          {draftText}
        </p>
        <div className="grid gap-1" role="group" aria-label="Recipients">
          <label className="flex cursor-pointer items-start gap-2.5 rounded-lg px-2 py-2 hover:bg-awc-tile">
            <input
              type="checkbox"
              checked={everyone}
              onChange={(event) => {
                const next = event.target.checked;
                setEveryone(next);
                if (next) setSelected([]);
                if (!next && !selected.length) setKeep(false);
              }}
              className="mt-0.5 h-4 w-4 accent-awc-primary"
            />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-awc-fg">
                {copy.pickerEveryone}
              </span>
              <span className="block text-[12.5px] text-awc-fg-subtle">{subtitle}</span>
            </span>
          </label>
          {assistants.map((a) => {
            const checked = selected.includes(a.membershipId);
            return (
              <label
                key={a.membershipId}
                className="flex cursor-pointer items-start gap-2.5 rounded-lg px-2 py-2 hover:bg-awc-tile"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={everyone}
                  onChange={(event) => {
                    const on = event.target.checked;
                    setSelected((prev) =>
                      on
                        ? [...prev, a.membershipId]
                        : prev.filter((id) => id !== a.membershipId),
                    );
                    if (!on && selected.length <= 1 && !everyone) setKeep(false);
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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="inline-flex items-center gap-1.5 text-[13px] text-awc-fg-muted">
            <input
              type="checkbox"
              checked={keep}
              disabled={!canSend}
              onChange={(event) => {
                setKeep(event.target.checked);
              }}
              className="h-4 w-4 accent-awc-primary"
            />
            {keepLab}
          </label>
          <div className="flex gap-2">
            <button type="button" className={OW_SECONDARY_BUTTON_CLASS} onClick={onCancel}>
              {copy.pickerCancel}
            </button>
            <button
              type="button"
              className={OW_PRIMARY_BUTTON_CLASS}
              disabled={!canSend}
              onClick={() => {
                if (!canSend) return;
                const recipient: MessengerKeptRecipient = everyone
                  ? { kind: "everyone" }
                  : { kind: "assistants", membershipIds: selected };
                onConfirm({ recipient, keepSending: keep });
              }}
            >
              {copy.pickerSend}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
