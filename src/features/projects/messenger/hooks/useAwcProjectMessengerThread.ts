"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
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
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [projectComputerOffline, setProjectComputerOffline] = useState(false);
  const generationRef = useRef(0);
  const loadingOlderRef = useRef(false);
  const threadRef = useRef<AwcMessengerOpenThread | null>(null);

  useEffect(() => {
    threadRef.current = thread;
  }, [thread]);

  // Clear cached thread when the selection becomes empty (render-time adjust).
  const [selectedKey, setSelectedKey] = useState(threadKey);
  if (threadKey !== selectedKey) {
    setSelectedKey(threadKey);
    setThread(null);
    setUnavailable(false);
    setMessage(null);
    setProjectComputerOffline(false);
    setLoadingOlder(false);
    setIsLoading(threadKey !== null);
  }

  const applyResult = useCallback(
    (
      result: Awaited<ReturnType<typeof fetchMessengerThreadPersisted>>,
      options?: { readonly preservePage?: boolean },
    ) => {
      if (!result.ok) {
        // Keep the browser copy on a network/server error; drop it only when
        // the messenger itself is unavailable on this deploy.
        if (result.unavailable) setThread(null);
        setUnavailable(result.unavailable);
        setMessage(result.errorMessage);
        return;
      }
      const next = result.thread;
      setThread((prev) => {
        if (
          options?.preservePage === true &&
          prev !== null &&
          prev.page !== undefined
        ) {
          // Silent poll of the newest page: keep load-older cursor progress.
          return {
            ...next,
            page: prev.page,
            ...(prev.error !== undefined && next.error === undefined
              ? {}
              : next.error !== undefined
                ? { error: next.error }
                : {}),
          };
        }
        return next;
      });
      setUnavailable(false);
      setMessage(null);
      if (next.error?.code === "project_computer_offline") {
        setProjectComputerOffline(true);
      } else if (options?.preservePage !== true) {
        setProjectComputerOffline(false);
      }
    },
    [],
  );

  const fetchPersisted = useCallback(
    (key: string, before?: string | null, existing?: AwcMessengerOpenThread | null) =>
      fetchMessengerThreadPersisted({
        projectId,
        threadKey: key,
        hasOwnerComputer,
        before,
        existing,
      }),
    [projectId, hasOwnerComputer],
  );

  const reload = useCallback(
    async (silent: boolean = false) => {
      if (threadKey === null) return;
      if (!silent) {
        setIsLoading(true);
      }
      applyResult(await fetchPersisted(threadKey), {
        preservePage: silent,
      });
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
      setProjectComputerOffline(false);
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

  const loadOlder = useCallback(async (): Promise<void> => {
    if (threadKey === null) return;
    const current = threadRef.current;
    const page = current?.page;
    if (page === undefined || !page.hasMore || page.beforeCursor === null) {
      return;
    }
    if (loadingOlderRef.current) return;
    loadingOlderRef.current = true;
    setLoadingOlder(true);
    setProjectComputerOffline(false);
    const result = await fetchPersisted(
      threadKey,
      page.beforeCursor,
      current,
    );
    loadingOlderRef.current = false;
    setLoadingOlder(false);
    if (!result.ok) {
      setMessage(result.errorMessage);
      return;
    }
    if (result.thread.error?.code === "project_computer_offline") {
      setProjectComputerOffline(true);
      // Keep existing messages + the pre-request cursor so Retry can re-hit.
      setThread((prev) => {
        if (prev === null) return result.thread;
        return {
          ...result.thread,
          entries: result.thread.entries.length > 0
            ? result.thread.entries
            : prev.entries,
          page: {
            beforeCursor: prev.page?.beforeCursor ?? null,
            hasMore: true,
            source: result.thread.page?.source ?? "exhausted",
            localLive: result.thread.page?.localLive ?? false,
          },
          error: result.thread.error,
        };
      });
      return;
    }
    setThread(result.thread);
    setProjectComputerOffline(false);
  }, [threadKey, fetchPersisted]);

  const onError = useCallback((errorMessage: string) => {
    setMessage(errorMessage);
  }, []);
  const reloadLoud = useCallback(() => reload(false), [reload]);
  const reloadSilent = useCallback(() => reload(true), [reload]);
  const { sending, send, sendTask } = useAwcProjectMessengerThreadSend({
    projectId,
    threadKey,
    reload: reloadSilent,
    onError,
  });

  const page = thread?.page;
  const canLoadOlder =
    page !== undefined &&
    page.hasMore === true &&
    typeof page.beforeCursor === "string" &&
    page.beforeCursor.length > 0;
  const reachedStart =
    page !== undefined && page.hasMore === false && !projectComputerOffline;

  return {
    thread: threadKey === null ? null : thread,
    isLoading: threadKey === null ? false : isLoading,
    loadingOlder,
    canLoadOlder,
    reachedStart,
    projectComputerOffline,
    projectComputerOfflineMessage:
      AWC_PROJECT_MESSENGER_COPY.projectComputerOffline,
    unavailable,
    message,
    sending,
    reload: reloadLoud,
    reloadSilent,
    loadOlder,
    send,
    sendTask,
  };
};
