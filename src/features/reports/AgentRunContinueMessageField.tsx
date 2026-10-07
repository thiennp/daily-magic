"use client";

import { useState, type KeyboardEvent } from "react";

import { useAutoGrowTextarea } from "@/hooks/useAutoGrowTextarea";
import shouldSubmitContinueMessageOnKeyDown from "@/features/reports/utils/shouldSubmitContinueMessageOnKeyDown";

interface AgentRunContinueMessageFieldProps {
  readonly disabled?: boolean;
  readonly onSubmit: (message: string) => void;
}

export default function AgentRunContinueMessageField({
  disabled = false,
  onSubmit,
}: AgentRunContinueMessageFieldProps) {
  const [message, setMessage] = useState("");
  const { textareaRef } = useAutoGrowTextarea(message);

  const submit = () => {
    const trimmed = message.trim();
    if (trimmed.length === 0 || disabled) {
      return;
    }
    onSubmit(trimmed);
    setMessage("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      !shouldSubmitContinueMessageOnKeyDown({
        key: event.key,
        shiftKey: event.shiftKey,
        isComposing: event.nativeEvent.isComposing,
      })
    ) {
      return;
    }
    event.preventDefault();
    submit();
  };

  return (
    <div className="mt-3">
      <label className="sr-only" htmlFor="agent-run-continue-message">
        Continue the conversation
      </label>
      <textarea
        id="agent-run-continue-message"
        ref={textareaRef}
        value={message}
        disabled={disabled}
        rows={1}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Continue the conversation…"
        className="w-full resize-none overflow-hidden rounded-lg border border-awc-border bg-white px-3 py-2 text-sm text-awc-fg outline-none focus:border-awc-blue-300 focus:ring-3 focus:ring-awc-blue-600/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 dark:focus:border-brand-800"
      />
      <p className="mt-1 text-xs text-awc-fg-muted dark:text-gray-400">
        Press Enter to send · Shift+Enter for a new line
      </p>
    </div>
  );
}
