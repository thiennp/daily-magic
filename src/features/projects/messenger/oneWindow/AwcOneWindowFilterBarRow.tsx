"use client";

import type { ComponentProps } from "react";

import AwcOneWindowFilterBar from "@/features/projects/messenger/oneWindow/AwcOneWindowFilterBar";

type AwcOneWindowFilterBarRowProps = ComponentProps<
  typeof AwcOneWindowFilterBar
> & {
  /** False while loading / empty: only the owner Clear all control remains. */
  readonly show: boolean;
};

/** Filter bar when the feed has rows; else just the Clear all slot (if any). */
export default function AwcOneWindowFilterBarRow({
  show,
  ...barProps
}: AwcOneWindowFilterBarRowProps) {
  if (show) return <AwcOneWindowFilterBar {...barProps} />;
  if (!barProps.clearAllSlot) return null;
  return (
    <div className="flex justify-end border-b border-awc-border px-4 py-2">
      {barProps.clearAllSlot}
    </div>
  );
}
