"use client";

import { useState } from "react";

import AwcOneWindowComposerGoneNotice from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerGoneNotice";
import AwcOneWindowComposerPicker from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerPicker";
import AwcOneWindowKeptChip from "@/features/projects/messenger/oneWindow/AwcOneWindowKeptChip";
import {
  OW_COMPOSER_BOX_CLASS,
  OW_PRIMARY_BUTTON_CLASS,
  OW_TEXTAREA_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { ONE_WINDOW_COMPOSER_COPY } from "@/features/projects/messenger/oneWindow/oneWindowComposerCopy.constant";
import type { useOneWindowComposerRouting } from "@/features/projects/messenger/oneWindow/useOneWindowComposerRouting";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import { PROJECT_MESSAGE_SUMMARY_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";

type Routing = ReturnType<typeof useOneWindowComposerRouting>;

interface AwcMessengerMessageComposerProps {
  readonly disabled: boolean;
  readonly sending: boolean;
  readonly onSend: (text: string, needsReply: boolean) => Promise<boolean>;
  readonly routing?: Routing;
  readonly assistants?: readonly {
    readonly membershipId: string;
    readonly displayName: string;
  }[];
}

/** Message mode — OW-H2 composer chrome when routing provided. */
export default function AwcMessengerMessageComposer({
  disabled,
  sending,
  onSend,
  routing,
  assistants = [],
}: AwcMessengerMessageComposerProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  const ow = ONE_WINDOW_COMPOSER_COPY;
  const [text, setText] = useState("");
  const [needsReply, setNeedsReply] = useState(false);

  const placeholder = routing?.placeholder ?? copy.composerPlaceholder;
  const busy = disabled || sending;

  const doSend = async (body: string): Promise<void> => {
    const trimmed = body.trim();
    if (trimmed.length === 0 || busy) return;
    const ok = await onSend(trimmed, needsReply);
    if (ok) {
      setText("");
      setNeedsReply(false);
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          const trimmed = text.trim();
          if (trimmed.length === 0 || busy) return;
          if (routing !== undefined && !routing.hideAllRoutingUi) {
            const hasAt = /@\S+/.test(trimmed);
            if (!hasAt) {
              const action = routing.beginSendWithoutMention(trimmed);
              if (action === "pick") return;
            }
          }
          void doSend(trimmed);
        }}
      >
        {routing?.goneName !== undefined && routing.goneName !== null ? (
          <AwcOneWindowComposerGoneNotice
            name={routing.goneName}
            onDismiss={routing.dismissGone}
          />
        ) : null}
        {routing !== undefined &&
        !routing.hideAllRoutingUi &&
        routing.mode === "KEPT" &&
        routing.chipLabel !== null ? (
          <AwcOneWindowKeptChip
            label={routing.chipLabel}
            keepChecked
            disabled={busy}
            onKeepChange={(checked) => {
              if (!checked) void routing.uncheckKeep();
            }}
          />
        ) : null}
        <div className={OW_COMPOSER_BOX_CLASS}>
          <label htmlFor="awc-messenger-message" className="sr-only">
            {copy.composerLabel}
          </label>
          <textarea
            id="awc-messenger-message"
            rows={1}
            maxLength={PROJECT_MESSAGE_SUMMARY_MAX_CHARS}
            value={text}
            disabled={busy}
            placeholder={placeholder}
            onChange={(event) => {
              setText(event.target.value);
            }}
            className={OW_TEXTAREA_CLASS}
          />
          <button
            type="submit"
            disabled={busy || text.trim().length === 0}
            className={OW_PRIMARY_BUTTON_CLASS}
          >
            {ow.pickerSend}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-1.5 text-sm text-awc-fg">
            <input
              type="checkbox"
              checked={needsReply}
              disabled={busy}
              onChange={(event) => {
                setNeedsReply(event.target.checked);
              }}
              className="h-4 w-4 accent-awc-primary"
            />
            {copy.composerNeedsReply}
          </label>
          <p className="ml-auto text-xs text-awc-fg-muted">
            {copy.taskSummaryCounter.replace("{n}", String(text.length))}
          </p>
        </div>
      </form>
      {routing !== undefined && routing.picking ? (
        <AwcOneWindowComposerPicker
          draftText={routing.draftForPicker}
          assistants={assistants}
          onCancel={routing.cancelPicker}
          onConfirm={(input) => {
            void routing.confirmPicker(input).then((draft) => {
              void doSend(draft);
            });
          }}
        />
      ) : null}
    </>
  );
}
