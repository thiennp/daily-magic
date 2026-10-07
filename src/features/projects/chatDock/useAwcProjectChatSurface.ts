"use client";

import { useCallback, useEffect, useState } from "react";

import { useAwcProjectChatDock } from "@/features/projects/chatDock/useAwcProjectChatDock";
import { isProjectChatHash } from "@/features/projects/utils/isProjectChatHash";

/**
 * P1-S1 Chat surface (replaces the Activity tab): dock open/full state, the
 * thread to open, and a remount key after an ask-box send. Every "go to chat"
 * call site (Overview, Members "Message", unread FAB, `#chat` / `#activity`
 * hash, ask-box send) opens the dock full view on that thread.
 */
export const useAwcProjectChatSurface = (input: {
  readonly startOpen: boolean;
  readonly reloadThreads: () => Promise<void>;
}) => {
  const { reloadThreads } = input;
  const dock = useAwcProjectChatDock(input.startOpen);
  const { openFull } = dock;
  const [threadKey, setThreadKey] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const onGotoChat = useCallback(
    (key: string | null) => {
      setThreadKey(key === null ? "whole" : key);
      openFull();
    },
    [openFull],
  );
  const onAskSent = useCallback(
    (key: string) => {
      void reloadThreads();
      setRefreshKey((n) => n + 1);
      onGotoChat(key);
    },
    [onGotoChat, reloadThreads],
  );

  useEffect(() => {
    const openFromHash = (): void => {
      if (!isProjectChatHash(window.location.hash)) return;
      const { pathname, search } = window.location;
      window.history.replaceState(null, "", `${pathname}${search}`);
      onGotoChat(null);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => {
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [onGotoChat]);

  return { dock, threadKey, refreshKey, onGotoChat, onAskSent };
};

export type AwcProjectChatSurface = ReturnType<typeof useAwcProjectChatSurface>;
