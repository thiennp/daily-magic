import { useLayoutEffect, useState, type RefObject } from "react";

import {
  computeDropdownFixedPanelRect,
  type DropdownFixedPanelRect,
} from "@/components/ui/dropdown/computeDropdownFixedPanelRect.util";

export const useDropdownFixedPanelRect = (
  isOpen: boolean,
  toggleRef: RefObject<HTMLElement | null> | undefined,
  panelRef: RefObject<HTMLElement | null>,
): DropdownFixedPanelRect | null => {
  const [rect, setRect] = useState<DropdownFixedPanelRect | null>(null);

  useLayoutEffect(() => {
    if (
      !isOpen ||
      toggleRef?.current === undefined ||
      toggleRef.current === null
    ) {
      setRect(null);
      return;
    }

    const update = (): void => {
      const toggle = toggleRef.current;
      const panel = panelRef.current;
      if (toggle === null || toggle === undefined) {
        return;
      }

      const panelWidth = panel?.offsetWidth ?? 208;
      setRect(
        computeDropdownFixedPanelRect(
          toggle.getBoundingClientRect(),
          panelWidth,
          window.innerWidth,
        ),
      );
    };

    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [isOpen, toggleRef, panelRef]);

  return rect;
};
