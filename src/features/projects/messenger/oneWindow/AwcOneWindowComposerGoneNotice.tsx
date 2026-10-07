"use client";

import { OW_GONE_CLASS } from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { formatKeptGone } from "@/features/projects/messenger/oneWindow/formatOneWindowComposerCopy";

interface AwcOneWindowComposerGoneNoticeProps {
  readonly name: string;
  readonly onDismiss: () => void;
}

/** Kept assistant left — composer.keptGone. */
export default function AwcOneWindowComposerGoneNotice({
  name,
  onDismiss,
}: AwcOneWindowComposerGoneNoticeProps) {
  return (
    <div className={OW_GONE_CLASS} role="status">
      <span className="flex-1">{formatKeptGone(name)}</span>
      <button
        type="button"
        onClick={onDismiss}
        className="rounded p-0.5 text-awc-warn hover:bg-black/5"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
