"use client";

import { useEffect, useRef } from "react";

import {
  isTopModal,
  pushModal,
  removeModal,
} from "@/components/ui/modal/modalEscapeStack";

/**
 * afae8216: Esc closes only the top open layer. A layer joins the stack when
 * it opens (not on every render), so a parent re-render never jumps above a
 * child dialog opened later.
 */
export const useModalEscapeLayer = (
  isOpen: boolean,
  onEscape: () => void,
): void => {
  const onEscapeRef = useRef(onEscape);
  useEffect(() => {
    onEscapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const layerId = Symbol("modal-layer");
    pushModal(layerId);
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== "Escape" || !isTopModal(layerId)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      onEscapeRef.current();
    };
    document.addEventListener("keydown", onKeyDown, { capture: true });
    return () => {
      removeModal(layerId);
      document.removeEventListener("keydown", onKeyDown, { capture: true });
    };
  }, [isOpen]);
};
