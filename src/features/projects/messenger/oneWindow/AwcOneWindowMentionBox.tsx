"use client";

import AwcOneWindowMentionPicker from "@/features/projects/messenger/oneWindow/AwcOneWindowMentionPicker";
import {
  OW_COMPOSER_BOX_CLASS,
  OW_GHOST_BUTTON_CLASS,
  OW_PRIMARY_BUTTON_CLASS,
  OW_TEXTAREA_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { ONE_WINDOW_COMPOSER_COPY } from "@/features/projects/messenger/oneWindow/oneWindowComposerCopy.constant";
import type { useOneWindowComposerDraft } from "@/features/projects/messenger/oneWindow/useOneWindowComposerDraft";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import { PROJECT_MESSAGE_SUMMARY_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";

interface AwcOneWindowMentionBoxProps {
  readonly draft: ReturnType<typeof useOneWindowComposerDraft>;
  readonly busy: boolean;
  /** SINGLE: no @ button, no picker; "@" is plain text. */
  readonly single: boolean;
  readonly placeholder?: string;
}

/** P1-S4b composer box: textarea + @ button + Send, inline @ picker above. */
export default function AwcOneWindowMentionBox({
  draft,
  busy,
  single,
  placeholder,
}: AwcOneWindowMentionBoxProps) {
  const copy = ONE_WINDOW_COMPOSER_COPY;
  const { textareaRef } = draft;
  return (
    <div className="relative">
      {draft.open ? (
        <AwcOneWindowMentionPicker options={draft.options} active={draft.active} onPick={draft.pick} />
      ) : null}
      <div className={OW_COMPOSER_BOX_CLASS}>
        <label htmlFor="awc-messenger-message" className="sr-only">
          {AWC_PROJECT_MESSENGER_COPY.composerLabel}
        </label>
        <textarea
          id="awc-messenger-message"
          ref={textareaRef}
          rows={1}
          maxLength={PROJECT_MESSAGE_SUMMARY_MAX_CHARS}
          value={draft.text}
          disabled={busy}
          placeholder={placeholder ?? AWC_PROJECT_MESSENGER_COPY.composerPlaceholder}
          aria-autocomplete={single ? "none" : "list"}
          aria-controls={single || !draft.open ? undefined : "awc-ow-mention-picker"}
          aria-expanded={single ? undefined : draft.open}
          onChange={draft.onChange}
          onKeyDown={draft.onKeyDown}
          onSelect={(event) => draft.onCaret(event.currentTarget.selectionStart ?? 0)}
          className={OW_TEXTAREA_CLASS}
        />
        {single ? null : (
          <button type="button" className={OW_GHOST_BUTTON_CLASS} aria-label={copy.atButton} disabled={busy} onClick={draft.insertAt}>
            @
          </button>
        )}
        <button
          type="button"
          disabled={busy || draft.text.trim().length === 0}
          className={OW_PRIMARY_BUTTON_CLASS}
          onClick={draft.submit}
        >
          {copy.pickerSend}
        </button>
      </div>
    </div>
  );
}
