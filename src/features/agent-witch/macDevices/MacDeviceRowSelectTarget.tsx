"use client";

import type { ReactNode } from "react";

interface MacDeviceRowSelectTargetProps {
  readonly children: ReactNode;
  readonly onSelect?: () => void;
}

export default function MacDeviceRowSelectTarget({
  children,
  onSelect,
}: MacDeviceRowSelectTargetProps) {
  if (onSelect === undefined) {
    return children;
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className="min-w-0 flex-1 text-left"
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      {children}
    </div>
  );
}
