"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  AWC_PROJECT_INBOX_TOAST_MS,
  AWC_PROJECT_INBOX_UNDO_MS,
} from "@/features/projects/access/inbox/awcProjectInboxArchive.constant";

export type AwcProjectInboxToast = {
  readonly text: string;
  /** Clear-all batch the Undo button restores; null → no Undo. */
  readonly undoBatch: string | null;
};

export type ShowAwcProjectInboxToast = (
  text: string,
  undoBatch?: string | null,
) => void;

/** One toast at a time; Undo toasts stay 6s, plain toasts shorter. */
export const useAwcProjectInboxToast = () => {
  const [toast, setToast] = useState<AwcProjectInboxToast | null>(null);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const showToast = useCallback<ShowAwcProjectInboxToast>(
    (text, undoBatch = null) => {
      clearTimer();
      setToast({ text, undoBatch });
      timerRef.current = window.setTimeout(
        () => setToast(null),
        undoBatch !== null
          ? AWC_PROJECT_INBOX_UNDO_MS
          : AWC_PROJECT_INBOX_TOAST_MS,
      );
    },
    [clearTimer],
  );

  useEffect(() => clearTimer, [clearTimer]);

  return { toast, showToast };
};
