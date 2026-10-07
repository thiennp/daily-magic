"use client";

import { useId } from "react";

import AwcProjectAskBoxBar from "@/features/projects/askBox/AwcProjectAskBoxBar";
import AwcProjectAskBoxOptions from "@/features/projects/askBox/AwcProjectAskBoxOptions";
import { PROJECT_ASK_BOX_COPY } from "@/features/projects/askBox/projectAskBoxCopy.constant";
import { useAwcProjectAskBox } from "@/features/projects/askBox/useAwcProjectAskBox";
import AwcProjectAskBoxSendToChips from "@/features/projects/askBox/AwcProjectAskBoxSendToChips";
import type { AwcMessengerBotThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { PROJECT_MESSAGE_SUMMARY_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";

interface AwcProjectAskBoxProps {
  readonly projectId: string;
  readonly bots: readonly AwcMessengerBotThread[];
  readonly computers?: readonly { readonly key: string; readonly label: string }[];
  readonly onSent: (threadKey: string) => void;
  readonly layout?: "inline" | "dock";
  readonly disabled?: boolean;
}

const FORM_INLINE =
  "flex flex-col gap-2 rounded-[22px] bg-white px-4 pb-3 pt-4 ring-1 ring-awc-border dark:bg-gray-900 dark:ring-white/10";
const FORM_DOCK = "flex flex-col gap-2 rounded-2xl bg-awc-tile px-2 pb-2 pt-2";

/** Ask composer — messenger send / inbox dispatch (inline or Chat dock). */
export default function AwcProjectAskBox({
  projectId,
  bots,
  computers,
  onSent,
  layout = "inline",
  disabled = false,
}: AwcProjectAskBoxProps) {
  const copy = PROJECT_ASK_BOX_COPY;
  const textId = useId();
  const ask = useAwcProjectAskBox({ projectId, bots, computers, onSent });
  const { draft, targets } = ask;
  const dock = layout === "dock";
  const busy = disabled || ask.sending;
  return (
    <form
      aria-label={copy.formLabel}
      className={dock ? FORM_DOCK : FORM_INLINE}
      onSubmit={(event) => {
        event.preventDefault();
        if (disabled) return;
        void ask.submit();
      }}
    >
      {dock ? (
        <AwcProjectAskBoxSendToChips
          targets={targets}
          value={draft.to}
          disabled={busy}
          onChange={(to) => {
            ask.update({ to });
          }}
        />
      ) : null}
      <label htmlFor={textId} className="sr-only">
        {copy.label}
      </label>
      <textarea
        id={textId}
        rows={2}
        value={draft.text}
        maxLength={PROJECT_MESSAGE_SUMMARY_MAX_CHARS}
        disabled={busy}
        placeholder={copy.placeholder}
        onChange={(event) => {
          ask.update({ text: event.target.value });
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter" || !(event.metaKey || event.ctrlKey)) return;
          event.preventDefault();
          event.currentTarget.form?.requestSubmit();
        }}
        className="max-h-[220px] min-h-16 w-full resize-none border-0 bg-transparent p-0 text-lg leading-snug text-awc-fg outline-none placeholder:text-awc-fg-muted focus:ring-0 dark:text-white dark:placeholder:text-gray-500 [field-sizing:content]"
      />
      <AwcProjectAskBoxBar
        disabled={busy}
        canSend={!disabled && draft.text.trim().length > 0}
        showCounter={draft.assignAsTask}
        textLength={draft.text.length}
        to={draft.to}
        targets={targets}
        hideSendTo={dock}
        onTo={(to) => {
          ask.update({ to });
        }}
      />
      <AwcProjectAskBoxOptions
        disabled={busy}
        draft={draft}
        onUpdate={ask.update}
        onAssignAsTask={ask.setAssignAsTask}
      />
      {ask.notice !== null ? (
        <p
          role={ask.notice.tone === "error" ? "alert" : "status"}
          className={`text-sm ${ask.notice.tone === "error" ? "font-medium text-awc-fg dark:text-white" : "text-awc-fg-muted dark:text-gray-300"}`}
        >
          {ask.notice.text}
        </p>
      ) : null}
    </form>
  );
}
