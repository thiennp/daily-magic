"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** Open/close state for a popover menu; Escape or outside mousedown closes it. */
const useDismissibleMenu = (): {
  readonly menuOpen: boolean;
  readonly setMenuOpen: (next: boolean | ((open: boolean) => boolean)) => void;
  readonly wrapRef: RefObject<HTMLDivElement | null>;
} => {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    const onPointer = (event: MouseEvent): void => {
      if (
        wrapRef.current !== null &&
        !wrapRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
    };
  }, [menuOpen]);

  return { menuOpen, setMenuOpen, wrapRef };
};

export default useDismissibleMenu;
