"use client";

import { useEffect, useState } from "react";

/** Current time, refreshed every `intervalMs` while mounted. */
export const useNowMsEvery = (intervalMs: number): number => {
  const [nowMs, setNowMs] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return nowMs;
};
