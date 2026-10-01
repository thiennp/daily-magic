"use client";
import type React from "react";
import { useEffect, useRef } from "react";

import { isDocumentMouseDownOutsideDropdown } from "@/components/ui/dropdown/isDocumentMouseDownOutsideDropdown.util";
import { useDropdownMenuKeyboard } from "@/components/ui/dropdown/useDropdownMenuKeyboard.util";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  /** When set, only this control is treated as inside the dropdown (not every `.dropdown-toggle`). */
  toggleRef?: React.RefObject<HTMLElement | null>;
}

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  toggleRef,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useDropdownMenuKeyboard({
    isOpen,
    onClose,
    panelRef: dropdownRef,
    toggleRef,
  });

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

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-40  right-0 mt-2  rounded-xl border border-gray-200 bg-white  shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`}
    >
      {children}
    </div>
  );
};
