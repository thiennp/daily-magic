"use client";

import { useEffect, useState } from "react";

/** DF-036: how long an "Approved · …" / "Denied" card stays before it collapses. */
export const PENDING_RESOLVED_COLLAPSE_MS = 5000;
/** DF-036 F11: the height collapse runs over the last part of that window (instant under reduced motion). */
export const PENDING_RESOLVED_ANIM_MS = 250;

/**
 * Ids of resolved pending cards that have collapsed (~5 s after Approve /
 * Deny). The list stays mounted (DF-017); collapsed ids are just not drawn.
 */
export const useCollapsedPendingResolved = (
  resolved: readonly { readonly id: string }[],
  delayMs: number = PENDING_RESOLVED_COLLAPSE_MS,
): ReadonlySet<string> => {
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const openKey = resolved
    .map((entry) => entry.id)
    .filter((id) => !collapsed.has(id))
    .join("\n");

  useEffect(() => {
    if (openKey === "") return;
    const ids = openKey.split("\n");
    const timer = setTimeout(() => {
      setCollapsed((prev) => new Set([...prev, ...ids]));
    }, delayMs);
    return () => clearTimeout(timer);
  }, [openKey, delayMs]);

  return collapsed;
};
