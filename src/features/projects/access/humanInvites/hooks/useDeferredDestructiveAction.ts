"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const HUMAN_INVITE_UNDO_MS = 10_000;

export type DeferredDestructivePending<TId extends string = string> = {
  readonly id: TId;
  readonly label: string;
  readonly expiresAt: number;
};

export type DeferredCommitOptions = {
  readonly keepalive?: boolean;
};

/**
 * One-click destructive with 10s Undo.
 * Lead Undo lock: client delay → API; Undo cancels; navigate-away/unmount
 * COMMITS pending (keepalive OK); no server undo.
 */
export const useDeferredDestructiveAction = <TId extends string = string>(input: {
  readonly onCommit: (
    id: TId,
    options?: DeferredCommitOptions,
  ) => void | Promise<void>;
  readonly undoMs?: number;
}) => {
  const undoMs = input.undoMs ?? HUMAN_INVITE_UNDO_MS;
  const [pending, setPending] = useState<DeferredDestructivePending<TId> | null>(
    null,
  );
  const timerRef = useRef<number | null>(null);
  const pendingIdRef = useRef<TId | null>(null);
  const committedRef = useRef(false);
  const onCommitRef = useRef(input.onCommit);
  onCommitRef.current = input.onCommit;

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const flushCommit = useCallback((options?: DeferredCommitOptions) => {
    const commitId = pendingIdRef.current;
    if (commitId === null || committedRef.current) {
      return;
    }
    committedRef.current = true;
    pendingIdRef.current = null;
    clearTimer();
    setPending(null);
    void onCommitRef.current(commitId, options);
  }, [clearTimer]);

  const cancel = useCallback(() => {
    clearTimer();
    pendingIdRef.current = null;
    committedRef.current = false;
    setPending(null);
  }, [clearTimer]);

  const schedule = useCallback(
    (id: TId, label: string) => {
      clearTimer();
      committedRef.current = false;
      pendingIdRef.current = id;
      setPending({ id, label, expiresAt: Date.now() + undoMs });
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        flushCommit();
      }, undoMs);
    },
    [clearTimer, flushCommit, undoMs],
  );

  useEffect(() => {
    const onPageHide = () => {
      // Navigate-away / tab close: commit with keepalive (Lead lock).
      if (pendingIdRef.current !== null) {
        flushCommit({ keepalive: true });
      }
    };
    window.addEventListener("pagehide", onPageHide);
    return () => {
      window.removeEventListener("pagehide", onPageHide);
      // Unmount: commit pending (do not cancel).
      if (pendingIdRef.current !== null) {
        flushCommit({ keepalive: true });
      } else {
        clearTimer();
      }
    };
  }, [clearTimer, flushCommit]);

  return {
    pending,
    schedule,
    cancel,
    isPendingId: (id: TId) => pending?.id === id,
  };
};
