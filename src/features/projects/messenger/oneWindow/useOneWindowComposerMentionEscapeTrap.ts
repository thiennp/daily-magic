import { useEffect } from "react";

import { pushOneWindowComposerEscapeTrap } from "@/features/projects/messenger/oneWindow/oneWindowComposerEscapeTrap";

/** Capture-phase Esc while the inline @ list is open (before Chat dock document listener). */
export const useOneWindowComposerMentionEscapeTrap = (
  open: boolean,
  caret: number,
  onDismiss: (caret: number) => void,
): void => {
  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const releaseTrap = pushOneWindowComposerEscapeTrap();
    const onDocumentKeyDown = (event: globalThis.KeyboardEvent): void => {
      if (event.key !== "Escape") {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      onDismiss(caret);
    };
    document.addEventListener("keydown", onDocumentKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onDocumentKeyDown, true);
      releaseTrap();
    };
  }, [caret, onDismiss, open]);
};
