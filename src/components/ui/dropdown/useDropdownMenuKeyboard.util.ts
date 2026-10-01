import { useEffect, type RefObject } from "react";

interface UseDropdownMenuKeyboardOptions {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly panelRef: RefObject<HTMLElement | null>;
  readonly toggleRef?: RefObject<HTMLElement | null>;
}

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

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== "Escape") {
        return;
      }
      event.preventDefault();
      onClose();
      toggleRef?.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, panelRef, toggleRef]);
}
