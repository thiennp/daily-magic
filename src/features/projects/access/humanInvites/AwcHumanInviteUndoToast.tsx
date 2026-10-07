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
      className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-awc-line bg-awc-surface-2 px-3 py-2 text-xs text-awc-fg"
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
