import { useEffect } from "react";

import { pushOneWindowComposerEscapeTrap } from "@/features/projects/messenger/oneWindow/oneWindowComposerEscapeTrap";

/** Capture-phase Esc while the recipient picker is open (before Chat dock). */
export const useOneWindowComposerPickerEscapeTrap = (
  onEscape: () => void,
): void => {
  useEffect(() => {
    const releaseTrap = pushOneWindowComposerEscapeTrap();
    const onDocumentKeyDown = (event: globalThis.KeyboardEvent): void => {
      if (event.key !== "Escape") {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      onEscape();
    };
    document.addEventListener("keydown", onDocumentKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onDocumentKeyDown, true);
      releaseTrap();
    };
  }, [onEscape]);
};
