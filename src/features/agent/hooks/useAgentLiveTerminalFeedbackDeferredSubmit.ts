"use client";

import { useState } from "react";

const MESSAGE_REQUIRED_ERROR = "Message is required.";

export const useAgentLiveTerminalFeedbackDeferredSubmit = (input: {
  readonly onSubmit: (message: string) => void;
}): {
  readonly message: string;
  readonly messageError: string | null;
  readonly hasMessageError: boolean;
  readonly handleMessageChange: (value: string) => void;
  readonly handleSubmit: () => void;
} => {
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState<string | null>(null);

  return {
    message,
    messageError,
    hasMessageError: messageError !== null,
    handleMessageChange: (value: string) => {
      setMessage(value);
      if (messageError !== null) setMessageError(null);
    },
    handleSubmit: () => {
      const trimmedMessage = message.trim();
      if (trimmedMessage.length === 0) {
        setMessageError(MESSAGE_REQUIRED_ERROR);
        return;
      }
      input.onSubmit(trimmedMessage);
      setMessage("");
      setMessageError(null);
    },
  };
};
