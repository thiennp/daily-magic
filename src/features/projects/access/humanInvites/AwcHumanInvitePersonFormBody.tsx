"use client";

import AwcHumanInviteApprovalField from "@/features/projects/access/humanInvites/AwcHumanInviteApprovalField";
import AwcHumanInviteEmailLockField from "@/features/projects/access/humanInvites/AwcHumanInviteEmailLockField";
import { HUMAN_INVITE_PERSON_FLOW_COPY } from "@/features/projects/access/humanInvites/humanInvitePersonFlowCopy.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type { InvitePersonTab } from "@/features/projects/access/humanInvites/AwcHumanInvitePersonTabSeg";
import { INV_INPUT_CLASS } from "@/features/projects/access/humanInvites/invitePersonChromeClasses.constant";
import { AwcProjectMembersInfoTip } from "@/features/projects/members/public-api/presentation";

export type AwcHumanInvitePersonFormBodyProps = {
  readonly tab: InvitePersonTab;
  readonly busy: boolean;
  readonly email: string;
  readonly requireEmailMatch: boolean;
  readonly onEmailChange: (value: string) => void;
  readonly onRequireEmailMatchChange: (checked: boolean) => void;
  readonly requiresApproval?: boolean;
  readonly onRequiresApprovalChange?: (checked: boolean) => void;
  /** An error is shown for this form (email field is aria-invalid). */
  readonly invalid?: boolean;
};

/** Email tab fields (the Link tab has none — the link shows after Copy link). */
export default function AwcHumanInvitePersonFormBody({
  tab,
  busy,
  email,
  requireEmailMatch,
  onEmailChange,
  onRequireEmailMatchChange,
  requiresApproval = true,
  onRequiresApprovalChange,
  invalid = false,
}: AwcHumanInvitePersonFormBodyProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  if (tab === "link") return null;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label htmlFor="inv-email" className="sr-only">
          {copy.emailLabel}
        </label>
        <input
          id="inv-email"
          type="text"
          inputMode="email"
          autoComplete="off"
          spellCheck={false}
          value={email}
          disabled={busy}
          placeholder={copy.emailPlaceholder}
          className={INV_INPUT_CLASS}
          aria-describedby={invalid ? "inv-email-tip inv-err" : "inv-email-tip"}
          aria-invalid={invalid ? true : undefined}
          onChange={(event) => onEmailChange(event.target.value)}
        />
        <AwcProjectMembersInfoTip id="inv-email-tip">
          {HUMAN_INVITE_PERSON_FLOW_COPY.emailTip}
        </AwcProjectMembersInfoTip>
      </div>
      <AwcHumanInviteEmailLockField
        checked={requireEmailMatch}
        disabled={busy}
        onChange={onRequireEmailMatchChange}
      />
      {onRequiresApprovalChange ? (
        <AwcHumanInviteApprovalField
          checked={requiresApproval}
          disabled={busy}
          onChange={onRequiresApprovalChange}
        />
      ) : null}
    </div>
  );
}
