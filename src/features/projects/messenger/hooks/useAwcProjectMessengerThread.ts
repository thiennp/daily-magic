"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useAwcProjectMessengerThreadSend } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThreadSend";
import type { AwcMessengerOpenThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { fetchMessengerThread } from "@/features/projects/messenger/utils/fetchMessengerThread";

export const useAwcProjectMessengerThread = (input: {
  readonly projectId: string;
  readonly threadKey: string | null;
  /** Fired after GET open succeeds (server marks read). Refresh thread-list badge. */
  readonly onOpened?: (threadKey: string) => void;
}) => {
  const { projectId, threadKey, onOpened } = input;
  const [thread, setThread] = useState<AwcMessengerOpenThread | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
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
    if (threadKey === null) return;
    setIsLoading(true);
    applyResult(await fetchMessengerThread({ projectId, threadKey }));
    setIsLoading(false);
  }, [projectId, threadKey, applyResult]);

  useEffect(() => {
    if (threadKey === null) return;
    const generation = generationRef.current + 1;
    generationRef.current = generation;
    const load = async (): Promise<void> => {
      setIsLoading(true);
      const result = await fetchMessengerThread({ projectId, threadKey });
      if (generationRef.current !== generation) return;
      applyResult(result);
      setIsLoading(false);
      if (result.ok) onOpened?.(threadKey);
    };
    void load();
  }, [projectId, threadKey, applyResult, onOpened]);

  const onError = useCallback((errorMessage: string) => {
    setMessage(errorMessage);
  }, []);
  const { sending, send, sendTask } = useAwcProjectMessengerThreadSend({
    projectId,
    threadKey,
    reload,
    onError,
  });

  return {
    thread: threadKey === null ? null : thread,
    isLoading: threadKey === null ? false : isLoading,
    unavailable,
    message,
    sending,
    reload,
    send,
    sendTask,
  };
};
