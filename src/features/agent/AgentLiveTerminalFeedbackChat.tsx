"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import { useAutoGrowTextarea } from "@/hooks/useAutoGrowTextarea";

interface AgentLiveTerminalFeedbackChatProps {
  readonly visible: boolean;
  readonly pendingQuestion: string | null;
  readonly queuedCount: number;
  readonly queueNotice: string | null;
  readonly isSubmitting: boolean;
  readonly autoFocus?: boolean;
  readonly onSubmit: (message: string) => void;
}

export default function AgentLiveTerminalFeedbackChat({
  visible,
  pendingQuestion,
  queuedCount,
  queueNotice,
  isSubmitting,
  autoFocus = false,
  onSubmit,
}: AgentLiveTerminalFeedbackChatProps) {
  const [message, setMessage] = useState("");
  const { textareaRef } = useAutoGrowTextarea(message);

  if (!visible) {
    return null;
  }

  const trimmedMessage = message.trim();
  const isAnswerMode = pendingQuestion !== null;

  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/40">
      {isAnswerMode ? (
        <>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
            Your Mac agent needs input
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {pendingQuestion}
          </p>
        </>
      ) : (
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          Follow up in the live terminal
        </p>
      )}
      <label className="mt-3 block text-sm text-gray-700 dark:text-gray-300">
        {isAnswerMode ? "Your answer" : "Message"}
        <textarea
          ref={textareaRef}
          value={message}
          autoFocus={autoFocus}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          rows={1}
          placeholder={
            isAnswerMode
              ? "Reply to your Mac agent…"
              : "Ask a follow-up or add context for the next step…"
          }
          className="mt-2 w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        />
      </label>
      {queuedCount > 0 ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {queuedCount} follow-up{queuedCount === 1 ? "" : "s"} queued while
          your Mac agent is working.
        </p>
      ) : null}
      {queueNotice !== null ? (
        <p className="mt-2 text-xs text-brand-600 dark:text-brand-400">
          {queueNotice}
        </p>
      ) : null}
      <div className="mt-3 flex justify-end">
        <Button
          disabled={isSubmitting || trimmedMessage.length === 0}
          onClick={() => {
            onSubmit(trimmedMessage);
            setMessage("");
          }}
        >
          {isAnswerMode ? "Send answer" : "Send feedback"}
        </Button>
      </div>
    </div>
  );
}
