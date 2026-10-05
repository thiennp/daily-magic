"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  const generationRef = useRef(0);

  // Clear cached thread when the selection becomes empty (render-time adjust).
  const [selectedKey, setSelectedKey] = useState(threadKey);
  if (threadKey !== selectedKey) {
    setSelectedKey(threadKey);
    setThread(null);
    setUnavailable(false);
    setMessage(null);
    setIsLoading(threadKey !== null);
  }

  const applyResult = useCallback(
    (result: Awaited<ReturnType<typeof fetchMessengerThread>>) => {
      if (!result.ok) {
        setThread(null);
        setUnavailable(result.unavailable);
        setMessage(result.errorMessage);
        return;
      }
      setThread(result.thread);
      setUnavailable(false);
      setMessage(null);
    },
    [],
  );

  const reload = useCallback(async () => {
    if (threadKey === null) {
      return;
    }
    setIsLoading(true);
    const result = await fetchMessengerThread({ projectId, threadKey });
    applyResult(result);
    setIsLoading(false);
  }, [projectId, threadKey, applyResult]);

  useEffect(() => {
    if (threadKey === null) {
      return;
    }
    const generation = generationRef.current + 1;
    generationRef.current = generation;
    const load = async (): Promise<void> => {
      setIsLoading(true);
      const result = await fetchMessengerThread({ projectId, threadKey });
      if (generationRef.current !== generation) {
        return;
      }
      applyResult(result);
      setIsLoading(false);
    };
    void load();
  }, [projectId, threadKey, applyResult]);

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
    thread: threadKey === null ? null : thread,
    isLoading: threadKey === null ? false : isLoading,
    unavailable,
    message,
    sending,
    reload,
    send,
  };
};
