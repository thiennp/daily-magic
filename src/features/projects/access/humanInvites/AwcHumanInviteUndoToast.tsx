"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

export type AwcHumanInviteUndoToastProps = {
  readonly message: string;
  readonly onUndo: () => void;
};

/** 10s Undo banner for Revoke invite / Remove person (Lead GO). */
export default function AwcHumanInviteUndoToast({
  message,
  onUndo,
}: AwcHumanInviteUndoToastProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  return (
    <div
      role="status"
      className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-amber-300/80 bg-amber-50/90 px-3 py-2 text-xs text-amber-950 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-100"
    >
      <span className="font-medium">{message}</span>
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.secondary}
        onClick={onUndo}
      >
        {copy.undo}
      </button>
    </div>
  );
}
