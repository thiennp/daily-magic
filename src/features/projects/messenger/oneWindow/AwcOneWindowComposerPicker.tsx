"use client";

import AwcOneWindowComposerPickerRecipients from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerPickerRecipients";
import {
  OW_PRIMARY_BUTTON_CLASS,
  OW_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { ONE_WINDOW_COMPOSER_COPY } from "@/features/projects/messenger/oneWindow/oneWindowComposerCopy.constant";
import { useOneWindowComposerPickerEscapeTrap } from "@/features/projects/messenger/oneWindow/useOneWindowComposerPickerEscapeTrap";
import { useOneWindowComposerPickerState } from "@/features/projects/messenger/oneWindow/useOneWindowComposerPickerState";
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
  const state = useOneWindowComposerPickerState({
    assistantsCount: assistants.length,
    peopleCount,
    onConfirm,
  });

  useOneWindowComposerPickerEscapeTrap(onCancel);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <div
        className="grid w-full max-w-[440px] gap-3 rounded-[14px] bg-awc-surface p-[18px] shadow-[0_16px_40px_rgba(16,24,40,0.22)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="awc-ow-picker-title"
      >
        <h2
          id="awc-ow-picker-title"
          className="m-0 text-[17px] font-semibold text-awc-fg"
        >
          {copy.pickerTitle}
        </h2>
        <p className="m-0 overflow-wrap-anywhere rounded-lg border border-awc-border bg-awc-surface-2 px-2.5 py-2 text-[13px] text-awc-fg-muted">
          {draftText}
        </p>
        <AwcOneWindowComposerPickerRecipients
          assistants={assistants}
          subtitle={state.subtitle}
          selected={state.selected}
          setSelected={state.setSelected}
          setKeep={state.setKeep}
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="inline-flex items-center gap-1.5 text-[13px] text-awc-fg-muted">
            <input
              type="checkbox"
              checked={state.keep}
              disabled={!state.canSend}
              onChange={(event) => {
                state.setKeep(event.target.checked);
              }}
              className="h-4 w-4 accent-awc-primary"
            />
            {state.keepLab}
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              className={OW_SECONDARY_BUTTON_CLASS}
              onClick={onCancel}
            >
              {copy.pickerCancel}
            </button>
            <button
              type="button"
              className={OW_PRIMARY_BUTTON_CLASS}
              disabled={!state.canSend}
              onClick={state.confirm}
            >
              {copy.pickerSend}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
