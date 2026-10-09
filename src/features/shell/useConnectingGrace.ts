"use client";

import { useEffect, useState } from "react";

import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";

/** No "Reconnecting…" until a connect has taken this long (a fresh tab connects in well under it). */
export const CONNECTING_GRACE_MS = 2_000;

/**
 * False while a connect is still inside its grace period: the badge stays
 * quiet instead of flashing "Reconnecting…" on every page load. Any status
 * other than `connecting` shows at once.
 */
export const useConnectingGraceElapsed = (
  status: WsTestConnectionStatus,
): boolean => {
  const [elapsed, setElapsed] = useState(false);

  useEffect(() => {
    if (status !== "connecting") {
      return;
    }
    const timer = window.setTimeout(
      () => setElapsed(true),
      CONNECTING_GRACE_MS,
    );
    return () => {
      window.clearTimeout(timer);
      setElapsed(false);
    };
  }, [status]);

  return status !== "connecting" || elapsed;
};
