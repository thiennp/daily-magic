"use client";

import { useState } from "react";

import {
  OW_MENTION_OPTION_CLASS,
  OW_MENTION_PICKER_CLASS,
  OW_RECIPIENT_SWITCH_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { formatChipLabel } from "@/features/projects/messenger/oneWindow/formatOneWindowComposerCopy";
import { ONE_WINDOW_COMPOSER_COPY } from "@/features/projects/messenger/oneWindow/oneWindowComposerCopy.constant";
import type { OneWindowMentionAssistant } from "@/features/projects/messenger/oneWindow/oneWindowMentions";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY as WHOLE } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";

interface AwcOneWindowRecipientSwitchProps {
  readonly feedKey: string;
  readonly assistants: readonly OneWindowMentionAssistant[];
  readonly onSelect: (feedKey: string) => void;
}

/**
 * P1-S4b "To X" chip (AW Lead): "To everyone" on the whole-project feed,
 * "To {name}" on an assistant's private feed; pick another to switch feeds.
 */
export default function AwcOneWindowRecipientSwitch({
  feedKey,
  assistants,
  onSelect,
}: AwcOneWindowRecipientSwitchProps) {
  const copy = ONE_WINDOW_COMPOSER_COPY;
  const [open, setOpen] = useState(false);
  const current = assistants.find((a) => a.membershipId === feedKey);
  const label = current === undefined ? copy.chipEveryone : formatChipLabel(current.displayName);
  const options = [{ membershipId: WHOLE, displayName: copy.pickerEveryone }, ...assistants];
  return (
    <div className="relative">
      <button
        type="button"
        className={OW_RECIPIENT_SWITCH_CLASS}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${copy.recipientSwitch}: ${label}`}
        onClick={() => setOpen((shown) => !shown)}
      >
        {label}
        <span aria-hidden>▾</span>
      </button>
      {open ? (
        <div className={`${OW_MENTION_PICKER_CLASS} left-0`} role="listbox" aria-label={copy.recipientSwitch}>
          {options.map((option) => (
            <button
              key={option.membershipId}
              type="button"
              role="option"
              aria-selected={option.membershipId === (current?.membershipId ?? WHOLE)}
              className={OW_MENTION_OPTION_CLASS}
              onClick={() => {
                setOpen(false);
                onSelect(option.membershipId);
              }}
            >
              {option.displayName}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
