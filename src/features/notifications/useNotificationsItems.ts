"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { countPendingApprovals } from "@/features/notifications/notificationsSelectors";
import {
  NOTIFICATIONS_DEMO_ITEMS,
  countUnread,
  type NotificationItem,
} from "@/features/notifications/notificationsDemoItems.constant";

export interface NotificationCounts {
  readonly unread: number;
  readonly pending: number;
}

export function useNotificationsItems(
  onCountsChange?: (counts: NotificationCounts) => void,
) {
  const [items, setItems] = useState<NotificationItem[]>(() => [
    ...NOTIFICATIONS_DEMO_ITEMS,
  ]);
  const counts = useMemo<NotificationCounts>(
    () => ({
      unread: countUnread(items),
      pending: countPendingApprovals(items),
    }),
    [items],
  );

  useEffect(() => {
    onCountsChange?.(counts);
  }, [counts, onCountsChange]);

  const onDecide = useCallback(
    (id: string, decision: "approved" | "denied") => {
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
    },
    [],
  );

  const onMarkRead = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item)),
    );
  }, []);

  const onMarkAllRead = useCallback(() => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
  }, []);

  const append = useCallback((more: readonly NotificationItem[]) => {
    setItems((prev) => [...prev, ...more]);
  }, []);

  const reset = useCallback(() => {
    setItems([...NOTIFICATIONS_DEMO_ITEMS]);
  }, []);

  return { items, counts, onDecide, onMarkRead, onMarkAllRead, append, reset };
}
