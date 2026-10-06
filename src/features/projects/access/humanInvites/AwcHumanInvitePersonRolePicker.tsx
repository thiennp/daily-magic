"use client";

import { HUMAN_INVITE_PERSON_FLOW_COPY } from "@/features/projects/access/humanInvites/humanInvitePersonFlowCopy.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import {
  INV_ROLE_CARD_CLASS,
  INV_ROLE_CARD_ON_CLASS,
  INV_ROLE_GRID_CLASS,
} from "@/features/projects/access/humanInvites/invitePersonChromeClasses.constant";
import type { HumanInviteRole } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanInvitePersonRolePickerProps = {
  readonly role: HumanInviteRole;
  readonly busy: boolean;
  readonly onRoleChange: (role: HumanInviteRole) => void;
};

/** Member / Viewer role cards for Invite person — Claude HTML. */
export default function AwcHumanInvitePersonRolePicker({
  role,
  busy,
  onRoleChange,
}: AwcHumanInvitePersonRolePickerProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const flow = HUMAN_INVITE_PERSON_FLOW_COPY;
  return (
    <fieldset className="space-y-2">
      <legend className="text-xs font-semibold text-awc-fg-muted" title={flow.roleTip}>
        {flow.roleLegend}
      </legend>
      <div className={INV_ROLE_GRID_CLASS}>
        {(["member", "viewer"] as const).map((value) => {
          const on = role === value;
          const label = value === "member" ? copy.roleMember : copy.roleViewer;
          const detail =
            value === "member" ? copy.roleMemberOneLiner : copy.roleViewerOneLiner;
          return (
            <label
              key={value}
              className={on ? INV_ROLE_CARD_ON_CLASS : INV_ROLE_CARD_CLASS}
            >
              <input
                type="radio"
                className="mt-1"
                name="inv-role"
                value={value}
                checked={on}
                disabled={busy}
                onChange={() => onRoleChange(value)}
              />
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-awc-blue-950">
                  {label}
                </span>
                <span className="mt-0.5 block text-xs text-awc-fg-muted">{detail}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
