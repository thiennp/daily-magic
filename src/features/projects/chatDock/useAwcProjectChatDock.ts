"use client";

import { useCallback, useEffect, useState } from "react";

import { isOneWindowComposerEscapeTrapActive } from "@/features/projects/messenger/oneWindow/oneWindowComposerEscapeTrap";

/**
 * Chat dock state: minimal (the floating button) or maximal (the full chat).
 * There is no middle size; `full` is kept as an alias of `open` for callers.
 */
export const useAwcProjectChatDock = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen);

  const openDock = useCallback(() => {
    setOpen(true);
  }, []);
  const closeDock = useCallback(() => {
    setOpen(false);
  }, []);
  const toggleDock = useCallback(() => {
    setOpen((current) => !current);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key !== "Escape") return;
      if (event.defaultPrevented || isOneWindowComposerEscapeTrapActive()) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return {
    open,
    full: open,
    openDock,
    openFull: openDock,
    closeDock,
    toggleDock,
  };
};
