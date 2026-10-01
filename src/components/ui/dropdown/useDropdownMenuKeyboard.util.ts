import { useEffect, type RefObject } from "react";

interface UseDropdownMenuKeyboardOptions {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly panelRef: RefObject<HTMLElement | null>;
  readonly toggleRef?: RefObject<HTMLElement | null>;
}

interface AttachDropdownMenuEscapeKeyListenerOptions {
  readonly onClose: () => void;
  readonly toggleRef?: RefObject<HTMLElement | null>;
}

/** Capture phase so ancestor keydown stopPropagation cannot block Escape. */
export const attachDropdownMenuEscapeKeyListener = ({
  onClose,
  toggleRef,
}: AttachDropdownMenuEscapeKeyListenerOptions): (() => void) => {
  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== "Escape") {
      return;
    }
    event.preventDefault();
    onClose();
    toggleRef?.current?.focus();
  };

  document.addEventListener("keydown", handleKeyDown, true);
  return () => {
    document.removeEventListener("keydown", handleKeyDown, true);
  };
};

/** Escape closes; focus moves to first menuitem when opened (WAI-ARIA menu pattern). */
export function useDropdownMenuKeyboard({
  isOpen,
  onClose,
  panelRef,
  toggleRef,
}: UseDropdownMenuKeyboardOptions): void {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const firstMenuItem = panelRef.current?.querySelector<HTMLElement>(
      '[role="menuitem"]:not([disabled])',
    );
    firstMenuItem?.focus();

    return attachDropdownMenuEscapeKeyListener({ onClose, toggleRef });
  }, [isOpen, onClose, panelRef, toggleRef]);
}
