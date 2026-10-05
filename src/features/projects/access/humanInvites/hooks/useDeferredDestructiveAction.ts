"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const HUMAN_INVITE_UNDO_MS = 10_000;

export type DeferredDestructivePending<TId extends string = string> = {
  readonly id: TId;
  readonly label: string;
  readonly expiresAt: number;
};

/**
 * One-click destructive with 10s Undo: hides immediately, runs commit after
 * delay unless Undo cancels. Lead GO — not a confirm modal.
 */
export const useDeferredDestructiveAction = <TId extends string = string>(input: {
  readonly onCommit: (id: TId) => Promise<void>;
  readonly undoMs?: number;
}) => {
  const undoMs = input.undoMs ?? HUMAN_INVITE_UNDO_MS;
  const [pending, setPending] = useState<DeferredDestructivePending<TId> | null>(
    null,
  );
  const timerRef = useRef<number | null>(null);
  const pendingIdRef = useRef<TId | null>(null);
  const onCommitRef = useRef(input.onCommit);
  onCommitRef.current = input.onCommit;

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const cancel = useCallback(() => {
    clearTimer();
    pendingIdRef.current = null;
    setPending(null);
  }, [clearTimer]);

  const schedule = useCallback(
    (id: TId, label: string) => {
      clearTimer();
      pendingIdRef.current = id;
      setPending({ id, label, expiresAt: Date.now() + undoMs });
      timerRef.current = window.setTimeout(() => {
        const commitId = pendingIdRef.current;
        pendingIdRef.current = null;
        setPending(null);
        timerRef.current = null;
        if (commitId !== null) {
          void onCommitRef.current(commitId);
        }
      }, undoMs);
    },
    [clearTimer, undoMs],
  );

  useEffect(() => () => clearTimer(), [clearTimer]);

  return { pending, schedule, cancel, isPendingId: (id: TId) => pending?.id === id };
};
