"use client";

import { useCallback, useState } from "react";

export type HelperRowMode = "idle" | "rename" | "remove";

/** DF-036 F12: one assistant row — detail open, wake paste box open, inline rename / remove confirm. */
export const useHelperRowState = () => {
  const [open, setOpen] = useState(false);
  const [wakeOpen, setWakeOpen] = useState(false);
  const [mode, setMode] = useState<HelperRowMode>("idle");
  const openWake = useCallback(() => {
    setOpen(true);
    setWakeOpen(true);
  }, []);
  const start = (next: Exclude<HelperRowMode, "idle">) => {
    setOpen(true);
    setMode(next);
  };
  return {
    open,
    wakeOpen,
    mode,
    toggle: () => setOpen((value) => !value),
    openWake,
    openPaste: () => setWakeOpen(true),
    closeWake: () => setWakeOpen(false),
    startRename: () => start("rename"),
    startRemove: () => start("remove"),
    endMode: () => setMode("idle"),
  };
};
