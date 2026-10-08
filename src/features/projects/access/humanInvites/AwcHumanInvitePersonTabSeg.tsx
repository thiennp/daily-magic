"use client";

import { HUMAN_INVITE_PERSON_FLOW_COPY } from "@/features/projects/access/humanInvites/humanInvitePersonFlowCopy.constant";
import {
  INV_SEG_BTN_ACTIVE_CLASS,
  INV_SEG_BTN_CLASS,
  INV_SEG_CLASS,
} from "@/features/projects/access/humanInvites/invitePersonChromeClasses.constant";

export type InvitePersonTab = "email" | "link";

export type AwcHumanInvitePersonTabSegProps = {
  readonly tab: InvitePersonTab;
  readonly busy: boolean;
  readonly onTabChange: (tab: InvitePersonTab) => void;
};

/** Email | Link segmented control — Claude Invite-person HTML. */
export default function AwcHumanInvitePersonTabSeg({
  tab,
  busy,
  onTabChange,
}: AwcHumanInvitePersonTabSegProps) {
  const copy = HUMAN_INVITE_PERSON_FLOW_COPY;
  return (
    <div
      className={INV_SEG_CLASS}
      role="group"
      aria-label={copy.howToInviteAria}
    >
      {(["email", "link"] as const).map((value) => (
        <button
          key={value}
          type="button"
          id={`inv-tab-${value}`}
          disabled={busy}
          aria-pressed={tab === value}
          className={
            tab === value
              ? `${INV_SEG_BTN_CLASS} ${INV_SEG_BTN_ACTIVE_CLASS}`
              : INV_SEG_BTN_CLASS
          }
          onClick={() => onTabChange(value)}
        >
          {value === "email" ? copy.tabEmail : copy.tabLink}
        </button>
      ))}
    </div>
  );
}
