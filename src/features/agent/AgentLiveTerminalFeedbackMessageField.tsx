"use client";

import { useAutoGrowTextarea } from "@/hooks/useAutoGrowTextarea";

interface AgentLiveTerminalFeedbackMessageFieldProps {
  readonly isAnswerMode: boolean;
  readonly isSteppedComposer: boolean;
  readonly message: string;
  readonly hasMessageError: boolean;
  readonly messageError: string | null;
  readonly autoFocus: boolean;
  readonly onMessageChange: (value: string) => void;
}

export default function AgentLiveTerminalFeedbackMessageField({
  isAnswerMode,
  isSteppedComposer,
  message,
  hasMessageError,
  messageError,
  autoFocus,
  onMessageChange,
}: AgentLiveTerminalFeedbackMessageFieldProps) {
  const { textareaRef } = useAutoGrowTextarea(message);
  const textareaClassName = hasMessageError
    ? "w-full rounded-lg border border-rose-500 bg-white px-3 py-2 text-sm outline-none focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10 dark:border-rose-500 dark:bg-gray-800"
    : "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800";

  const field = (
    <textarea
      ref={textareaRef}
      value={message}
      autoFocus={autoFocus}
      aria-label={
        isAnswerMode ? undefined : "Follow-up message for the live terminal"
      }
      onChange={(event) => onMessageChange(event.target.value)}
      rows={1}
      className={`resize-none ${isAnswerMode ? `mt-2 ${textareaClassName}` : textareaClassName}`}
      placeholder={
        isAnswerMode
          ? "Reply to your Mac agent…"
          : "Ask a follow-up or add context for the next step…"
      }
      aria-invalid={hasMessageError}
    />
  );

  return (
    <>
      {isAnswerMode ? (
        <label className="mt-3 block text-sm text-gray-700 dark:text-gray-300">
          Your answer{field}
        </label>
      ) : (
        <div className={isSteppedComposer ? "" : "mt-3"}>{field}</div>
      )}
      {hasMessageError ? (
        <span className="mt-1 block text-sm text-rose-600 dark:text-rose-400">
          {messageError}
        </span>
      ) : null}
    </>
  );
}
