"use client";

import { useEffect } from "react";

import {
  PENDING_RESOLVED_ANIM_MS,
  PENDING_RESOLVED_COLLAPSE_MS,
  useCollapsedPendingResolved,
} from "@/features/projects/access/hooks/useCollapsedPendingResolved";

/**
 * DF-036 F11: a resolved card first shrinks (height + fade, `collapsing`),
 * then unmounts (`collapsed`). Two timers on the same resolved list.
 */
export const usePendingResolvedCollapse = (
  resolved: readonly { readonly id: string }[],
) => {
  const collapsing = useCollapsedPendingResolved(
    resolved,
    PENDING_RESOLVED_COLLAPSE_MS - PENDING_RESOLVED_ANIM_MS,
  );
  const collapsed = useCollapsedPendingResolved(resolved);
  return { collapsing, collapsed };
};

/** Tell the parent once the list has nothing left to show (the rail then unmounts the section). */
export const useNotifyPendingIdle = (
  idle: boolean,
  onIdle?: () => void,
): void => {
  useEffect(() => {
    if (idle) onIdle?.();
  }, [idle, onIdle]);
};
