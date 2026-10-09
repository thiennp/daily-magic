"use client";

import type { InviterChoiceView } from "@/features/projects/access/utils/botManagementApi";
import { BOT_CLAIM_COPY as C } from "@/features/projects/members/botClaimCopy.constant";

const LINK =
  "awc-focus-ring text-[12.5px] font-semibold text-awc-primary hover:underline disabled:opacity-50";

/** "Invited by" select with Submit / Cancel. */
export default function AwcProjectMembersHelperBotInviterPicker({
  choices,
  choice,
  pending,
  onChoice,
  onSubmit,
  onCancel,
}: {
  readonly choices: readonly InviterChoiceView[];
  readonly choice: string;
  readonly pending: boolean;
  readonly onChoice: (userId: string) => void;
  readonly onSubmit: () => void;
  readonly onCancel: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-awc-fg-muted">
      <label className="flex items-center gap-1.5">
        {C.pickLabel}
        <select
          className="rounded-lg border border-awc-control-border bg-awc-surface px-2 py-1 text-[13px] text-awc-fg"
          value={choice}
          onChange={(e) => onChoice(e.target.value)}
        >
          {choices.map((c) => (
            <option key={c.userId} value={c.userId}>
              {c.label}
              {c.isYou ? C.you : ""}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        className={LINK}
        disabled={pending || choice === ""}
        onClick={onSubmit}
      >
        {C.submit}
      </button>
      <button type="button" className={LINK} onClick={onCancel}>
        {C.cancel}
      </button>
    </div>
  );
}
