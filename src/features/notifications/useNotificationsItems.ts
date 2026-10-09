"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { fetchLiveNotifications } from "@/features/notifications/fetchLiveNotifications";
import { postNotificationDecision } from "@/features/notifications/notificationDecision";
import {
  loadReadIds,
  saveReadIds,
} from "@/features/notifications/notificationsReadState";
import {
  countUnread,
  type NotificationItem,
} from "@/features/notifications/notificationsDemoItems.constant";
import { countPendingApprovals } from "@/features/notifications/notificationsSelectors";

export interface NotificationCounts {
  readonly unread: number;
  readonly pending: number;
}

/** Live approvals (join requests and computer runs) for the projects you own. */
export function useNotificationsItems(
  onCountsChange?: (counts: NotificationCounts) => void,
) {
  const [items, setItems] = useState<readonly NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [decideError, setDecideError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const reload = useCallback((): void => {
    setLoading(true);
    setNonce((n) => n + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const read = loadReadIds();
    void fetchLiveNotifications({
      readIds: read,
      signal: controller.signal,
    }).then((result) => {
      if (controller.signal.aborted) return;
      setItems(result.items);
      setLoadFailed(result.failed);
      setLoading(false);
    });
    return () => controller.abort();
  }, [nonce]);

  const counts = useMemo<NotificationCounts>(
    () => ({
      unread: countUnread([...items]),
      pending: countPendingApprovals([...items]),
    }),
    [items],
  );

  useEffect(() => {
    onCountsChange?.(counts);
  }, [counts, onCountsChange]);

  const markRead = useCallback((ids: readonly string[]): void => {
    saveReadIds(new Set([...loadReadIds(), ...ids]));
    setItems((prev) =>
      prev.map((item) =>
        ids.includes(item.id) ? { ...item, unread: false } : item,
      ),
    );
  }, []);

  const onDecide = useCallback(
    (id: string, decision: "approved" | "denied") => {
      setDecideError(null);
      void postNotificationDecision(id, decision).then((result) => {
        if (!result.ok) {
          setDecideError(result.message);
          return;
        }
        markRead([id]);
        setItems((prev) =>
          prev.map((item) =>
            item.id === id && (item.kind === "join" || item.kind === "run")
              ? {
                  ...item,
                  state: decision,
                  unread: false,
                  doneAtLabel: "just now",
                }
              : item,
          ),
        );
      });
    },
    [markRead],
  );

  const onMarkRead = useCallback((id: string) => markRead([id]), [markRead]);
  const onMarkAllRead = useCallback(
    () => markRead(items.map((item) => item.id)),
    [items, markRead],
  );

  return {
    items,
    counts,
    loading,
    loadFailed,
    decideError,
    reload,
    onDecide,
    onMarkRead,
    onMarkAllRead,
  };
}
