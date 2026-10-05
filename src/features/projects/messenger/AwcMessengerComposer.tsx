"use client";

import { useState } from "react";

import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";

interface AwcMessengerComposerProps {
  readonly disabled: boolean;
  readonly sending: boolean;
  readonly onSend: (text: string, needsReply: boolean) => Promise<boolean>;
}

export default function AwcMessengerComposer({
  disabled,
  sending,
  onSend,
}: AwcMessengerComposerProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  const [text, setText] = useState("");
  const [needsReply, setNeedsReply] = useState(false);

  return (
    <form
      className="flex flex-col gap-2 border-t border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-950"
      onSubmit={(event) => {
        event.preventDefault();
        const trimmed = text.trim();
        if (trimmed.length === 0 || disabled || sending) return;
        void onSend(trimmed, needsReply).then((ok) => {
          if (ok) {
            setText("");
            setNeedsReply(false);
          }
        });
      }}
    >
      <div>
        <label
          htmlFor="awc-messenger-message"
          className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300"
        >
          {copy.composerLabel}
        </label>
        <textarea
          id="awc-messenger-message"
          rows={2}
          value={text}
          disabled={disabled || sending}
          placeholder={copy.composerPlaceholder}
          onChange={(event) => {
            setText(event.target.value);
          }}
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-2.5 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={needsReply}
            disabled={disabled || sending}
            onChange={(event) => {
              setNeedsReply(event.target.checked);
            }}
            className="h-4 w-4 accent-blue-600"
          />
          {copy.composerNeedsReply}
        </label>
        <span className="text-xs text-gray-500">{copy.composerHint}</span>
        <button
          type="submit"
          disabled={disabled || sending || text.trim().length === 0}
          className="ml-auto rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {copy.composerSend}
        </button>
      </div>
    </form>
  );
}
