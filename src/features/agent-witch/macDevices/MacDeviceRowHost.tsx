"use client";

import type { ReactNode } from "react";

interface MacDeviceRowHostProps {
  readonly onSelect?: () => void;
  readonly footer?: ReactNode;
  readonly children: ReactNode;
}

/** Wraps the row surface: optional footer, and `<li>` when not used as a select target. */
export default function MacDeviceRowHost({
  onSelect,
  footer,
  children,
}: MacDeviceRowHostProps) {
  if (onSelect !== undefined) {
    return footer === undefined ? (
      children
    ) : (
      <>
        {children}
        {footer}
      </>
    );
  }

  return (
    <li>
      {children}
      {footer}
    </li>
  );
}
