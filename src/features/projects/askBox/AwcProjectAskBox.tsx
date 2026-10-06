"use client";

import { useId, useMemo } from "react";

import AwcProjectAskBoxBar from "@/features/projects/askBox/AwcProjectAskBoxBar";
import AwcProjectAskBoxOptions from "@/features/projects/askBox/AwcProjectAskBoxOptions";
import { askBoxSendTargets } from "@/features/projects/askBox/askBoxSendTarget";
import { PROJECT_ASK_BOX_COPY } from "@/features/projects/askBox/projectAskBoxCopy.constant";
import { useAwcProjectAskBox } from "@/features/projects/askBox/useAwcProjectAskBox";
import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { PROJECT_MESSAGE_SUMMARY_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";

interface AwcProjectAskBoxProps {
  readonly projectId: string;
  /** Hidden until threads load, and for viewers who cannot send. */
  readonly threads: AwcMessengerThreadList | null;
  /** After a successful send: refresh threads + open that thread in Activity. */
  readonly onSent: (threadKey: string) => void;
}

/** Layout v2 L2: main-column ask box above tabs (messenger send / inbox dispatch). */
export default function AwcProjectAskBox({ projectId, threads, onSent }: AwcProjectAskBoxProps) {
  const copy = PROJECT_ASK_BOX_COPY;
  const textId = useId();
  const bots = threads?.bots;
  const targets = useMemo(() => askBoxSendTargets(bots ?? []), [bots]);
  const ask = useAwcProjectAskBox({ projectId, targets, onSent });
  const { draft } = ask;
  if (threads === null || !threads.canSend) return null;

  return (
    <form
      aria-label={copy.formLabel}
      className="flex flex-col gap-2 rounded-[22px] bg-white px-4 pb-3 pt-4 ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-white/10"
      onSubmit={(event) => {
        event.preventDefault();
        void ask.submit();
      }}
    >
      <label htmlFor={textId} className="sr-only">
        {copy.label}
      </label>
      <textarea
        id={textId}
        rows={2}
        value={draft.text}
        maxLength={PROJECT_MESSAGE_SUMMARY_MAX_CHARS}
        disabled={ask.sending}
        placeholder={copy.placeholder}
        onChange={(event) => {
          ask.update({ text: event.target.value });
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter" || !(event.metaKey || event.ctrlKey)) return;
          event.preventDefault();
          event.currentTarget.form?.requestSubmit();
        }}
        className="max-h-[220px] min-h-16 w-full resize-none border-0 bg-transparent p-0 text-lg leading-snug text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 dark:text-white dark:placeholder:text-gray-500 [field-sizing:content]"
      />
      <AwcProjectAskBoxBar
        disabled={ask.sending}
        canSend={draft.text.trim().length > 0}
        showCounter={draft.assignAsTask}
        textLength={draft.text.length}
        to={draft.to}
        targets={targets}
        onTo={(to) => {
          ask.update({ to });
        }}
      />
      <AwcProjectAskBoxOptions
        disabled={ask.sending}
        draft={draft}
        onUpdate={ask.update}
        onAssignAsTask={ask.setAssignAsTask}
      />
      {ask.notice !== null ? (
        <p
          role={ask.notice.tone === "error" ? "alert" : "status"}
          className={`text-sm ${ask.notice.tone === "error" ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"}`}
        >
          {ask.notice.text}
        </p>
      ) : null}
    </form>
  );
}
