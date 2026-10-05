"use client";

import { useCallback, useEffect, useState } from "react";

import type { AwcMessengerOpenThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { fetchMessengerThread } from "@/features/projects/messenger/utils/fetchMessengerThread";
import { sendMessengerMessage } from "@/features/projects/messenger/utils/sendMessengerMessage";

export const useAwcProjectMessengerThread = (input: {
  readonly projectId: string;
  readonly threadKey: string | null;
}) => {
  const { projectId, threadKey } = input;
  const [thread, setThread] = useState<AwcMessengerOpenThread | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const reload = useCallback(async () => {
    if (threadKey === null) {
      setThread(null);
      return;
    }
    setIsLoading(true);
    const result = await fetchMessengerThread({ projectId, threadKey });
    if (!result.ok) {
      setThread(null);
      setUnavailable(result.unavailable);
      setMessage(result.errorMessage);
      setIsLoading(false);
      return;
    }
    setThread(result.thread);
    setUnavailable(false);
    setMessage(null);
    setIsLoading(false);
  }, [projectId, threadKey]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const send = useCallback(
    async (text: string, needsReply: boolean): Promise<boolean> => {
      if (threadKey === null) return false;
      setSending(true);
      const result = await sendMessengerMessage({
        projectId,
        threadKey,
        text,
        needsReply,
      });
      setSending(false);
      if (!result.ok) {
        setMessage(result.errorMessage);
        return false;
      }
      await reload();
      return true;
    },
    [projectId, reload, threadKey],
  );

  return {
    thread,
    isLoading,
    unavailable,
    message,
    sending,
    reload,
    send,
  };
};
