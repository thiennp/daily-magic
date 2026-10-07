"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useAwcProjectMessengerThreadSend } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThreadSend";
import type { AwcMessengerOpenThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { fetchMessengerThreadPersisted } from "@/features/projects/messenger/utils/fetchMessengerThreadPersisted";
import { messengerChatStoreIdb } from "@/features/projects/messenger/utils/messengerChatStoreIdb";
import { hydrateMessengerChat } from "@/features/projects/messenger/utils/persistMessengerChat";

export const useAwcProjectMessengerThread = (input: {
  readonly projectId: string;
  readonly threadKey: string | null;
  /** No owner computer → browser copy is long-term (never trimmed). */
  readonly hasOwnerComputer: boolean;
  /** Fired after GET open succeeds (server marks read). Refresh thread-list badge. */
  readonly onOpened?: (threadKey: string) => void;
}) => {
  const { projectId, threadKey, hasOwnerComputer, onOpened } = input;
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
    (result: Awaited<ReturnType<typeof fetchMessengerThreadPersisted>>) => {
      if (!result.ok) {
        // Keep the browser copy on a network/server error; drop it only when
        // the messenger itself is unavailable on this deploy.
        if (result.unavailable) setThread(null);
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

  const fetchPersisted = useCallback(
    (key: string) =>
      fetchMessengerThreadPersisted({
        projectId,
        threadKey: key,
        hasOwnerComputer,
      }),
    [projectId, hasOwnerComputer],
  );

  const reload = useCallback(
    async (silent: boolean = false) => {
      if (threadKey === null) return;
      if (!silent) {
        setIsLoading(true);
      }
      applyResult(await fetchPersisted(threadKey));
      if (!silent) {
        setIsLoading(false);
      }
    },
    [threadKey, applyResult, fetchPersisted],
  );

  useEffect(() => {
    if (threadKey === null) return;
    const generation = generationRef.current + 1;
    generationRef.current = generation;
    const load = async (): Promise<void> => {
      setIsLoading(true);
      const cached = await hydrateMessengerChat({
        store: messengerChatStoreIdb,
        projectId,
        threadKey,
      });
      if (generationRef.current !== generation) return;
      if (cached !== null) setThread((prev) => prev ?? cached);
      const result = await fetchPersisted(threadKey);
      if (generationRef.current !== generation) return;
      applyResult(result);
      setIsLoading(false);
      if (result.ok) onOpened?.(threadKey);
    };
    void load();
  }, [projectId, threadKey, applyResult, fetchPersisted, onOpened]);

  const onError = useCallback((errorMessage: string) => {
    setMessage(errorMessage);
  }, []);
  const reloadLoud = useCallback(() => reload(false), [reload]);
  const reloadSilent = useCallback(() => reload(true), [reload]);
  const { sending, send, sendTask } = useAwcProjectMessengerThreadSend({
    projectId,
    threadKey,
    reload: reloadLoud,
    onError,
  });

  return {
    thread: threadKey === null ? null : thread,
    isLoading: threadKey === null ? false : isLoading,
    unavailable,
    message,
    sending,
    reload: reloadLoud,
    reloadSilent,
    send,
    sendTask,
  };
};
