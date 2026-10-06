"use client";

import { useCallback, useEffect, useState } from "react";

/** Open / full-screen state for the floating Chat dock (UI expand only). */
export const useAwcProjectChatDock = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen);
  const [full, setFull] = useState(false);

  const openDock = useCallback(() => {
    setOpen(true);
  }, []);
  const closeDock = useCallback(() => {
    setOpen(false);
    setFull(false);
  }, []);
  const toggleDock = useCallback(() => {
    setOpen((current) => {
      if (current) {
        setFull(false);
        return false;
      }
      return true;
    });
  }, []);
  const toggleFull = useCallback(() => {
    setFull((current) => !current);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key !== "Escape") return;
      if (full) {
        setFull(false);
        return;
      }
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [full, open]);

  return { open, full, openDock, closeDock, toggleDock, toggleFull };
};
