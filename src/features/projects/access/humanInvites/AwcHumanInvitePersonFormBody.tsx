"use client";

import AwcHumanInviteApprovalField from "@/features/projects/access/humanInvites/AwcHumanInviteApprovalField";
import AwcHumanInviteEmailLockField from "@/features/projects/access/humanInvites/AwcHumanInviteEmailLockField";
import { HUMAN_INVITE_PERSON_FLOW_COPY } from "@/features/projects/access/humanInvites/humanInvitePersonFlowCopy.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type { InvitePersonTab } from "@/features/projects/access/humanInvites/AwcHumanInvitePersonTabSeg";
import { INV_INPUT_CLASS } from "@/features/projects/access/humanInvites/invitePersonChromeClasses.constant";

export type AwcHumanInvitePersonFormBodyProps = {
  readonly tab: InvitePersonTab;
  readonly busy: boolean;
  readonly email: string;
  readonly requireEmailMatch: boolean;
  readonly createdUrl: string | null;
  readonly roleLabel: string;
  readonly onEmailChange: (value: string) => void;
  readonly onRequireEmailMatchChange: (checked: boolean) => void;
  readonly requiresApproval?: boolean;
  readonly onRequiresApprovalChange?: (checked: boolean) => void;
  /** An error is shown for this form (email field is aria-invalid). */
  readonly invalid?: boolean;
};

/** Email or Link fields for Invite person — Claude HTML tabs. */
export default function AwcHumanInvitePersonFormBody({
  tab,
  busy,
  email,
  requireEmailMatch,
  createdUrl,
  roleLabel,
  onEmailChange,
  onRequireEmailMatchChange,
  requiresApproval = true,
  onRequiresApprovalChange,
  invalid = false,
}: AwcHumanInvitePersonFormBodyProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const flow = HUMAN_INVITE_PERSON_FLOW_COPY;
  if (tab === "link") {
    return (
      <div className="space-y-1">
        <label
          className="block text-xs font-medium text-awc-fg-muted"
          htmlFor="inv-link"
        >
          {flow.linkLabel}
        </label>
        <input
          id="inv-link"
          className={`${INV_INPUT_CLASS} font-mono`}
          readOnly
          value={createdUrl ?? ""}
          placeholder={flow.linkEmptyHelp}
          aria-describedby="inv-link-help"
        />
        <p className="text-xs text-awc-fg-subtle" id="inv-link-help">
          {createdUrl
            ? flow.linkHelp.replace("{role}", roleLabel)
            : flow.linkEmptyHelp}
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <label className="block space-y-1">
        <span
          className="text-xs font-medium text-awc-fg-muted"
          title={flow.emailTip}
        >
          {copy.emailLabel}
        </span>
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
          aria-describedby={
            invalid ? "inv-email-help inv-err" : "inv-email-help"
          }
          aria-invalid={invalid ? true : undefined}
          onChange={(event) => onEmailChange(event.target.value)}
        />
        <p className="text-xs text-awc-fg-subtle" id="inv-email-help">
          {flow.emailHelp}
        </p>
      </label>
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
