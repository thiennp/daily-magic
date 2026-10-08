"use client";

import { useCallback, useState } from "react";

import { loadOlderNotifications } from "@/features/notifications/notificationsDemoLoader";
import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";

export type OlderState = "idle" | "loading" | "error" | "done";

export function useNotificationsOlder(
  append: (items: readonly NotificationItem[]) => void,
) {
  const [state, setState] = useState<OlderState>("idle");
  const load = useCallback(() => {
    setState("loading");
    loadOlderNotifications().then(
      (more) => {
        append(more);
        setState("done");
      },
      () => {
        setState("error");
      },
    );
  }, [append]);
  return { state, load };
}
