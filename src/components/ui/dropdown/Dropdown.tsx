"use client";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { isDocumentMouseDownOutsideDropdown } from "@/components/ui/dropdown/isDocumentMouseDownOutsideDropdown.util";
import { useDropdownFixedPanelRect } from "@/components/ui/dropdown/useDropdownFixedPanelRect.util";
import { useDropdownMenuKeyboard } from "@/components/ui/dropdown/useDropdownMenuKeyboard.util";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  /** When set, only this control is treated as inside the dropdown (not every `.dropdown-toggle`). */
  toggleRef?: React.RefObject<HTMLElement | null>;
  panelBaseClassName?: string;
}

const DROPDOWN_PANEL_BASE_CLASS =
  "rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark";

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  toggleRef,
  panelBaseClassName = DROPDOWN_PANEL_BASE_CLASS,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [canPortal, setCanPortal] = useState(false);
  const useFixedPortal = toggleRef !== undefined;
  const fixedRect = useDropdownFixedPanelRect(
    isOpen && useFixedPortal,
    toggleRef,
    dropdownRef,
  );

  useDropdownMenuKeyboard({
    isOpen,
    onClose,
    panelRef: dropdownRef,
    toggleRef,
  });

  useEffect(() => {
    setCanPortal(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        isDocumentMouseDownOutsideDropdown(
          target,
          dropdownRef.current,
          toggleRef?.current ?? undefined,
        )
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, toggleRef]);

  if (!isOpen) return null;

  const panelClassName = useFixedPortal
    ? `fixed z-[200] ${panelBaseClassName} ${className}`
    : `absolute z-40 right-0 mt-2 ${panelBaseClassName} ${className}`;

  const panel = (
    <div
      ref={dropdownRef}
      className={panelClassName}
      style={
        useFixedPortal && fixedRect !== null
          ? { top: fixedRect.top, left: fixedRect.left }
          : undefined
      }
    >
      {children}
    </div>
  );

  if (useFixedPortal && canPortal) {
    return createPortal(panel, document.body);
  }

  return panel;
};
