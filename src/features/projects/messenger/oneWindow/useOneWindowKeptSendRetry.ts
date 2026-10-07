"use client";

import { useCallback, useRef, useState } from "react";

import type { OneWindowKeptProgress } from "@/features/projects/messenger/oneWindow/oneWindowSendTarget";

/**
 * P1-S5b: per-draft kept-send tracking. `progress` is read/written by the
 * send; `sync()` after each send mirrors it into state for the retry notice.
 */
export const useOneWindowKeptSendRetry = () => {
  const progress = useRef<OneWindowKeptProgress>(null);
  const [pending, setPending] = useState<OneWindowKeptProgress>(null);
  const sync = useCallback(() => setPending(progress.current), []);
  return { progress, pending, sync };
};
