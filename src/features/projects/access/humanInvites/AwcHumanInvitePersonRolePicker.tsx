"use client";

import { HUMAN_INVITE_PERSON_FLOW_COPY } from "@/features/projects/access/humanInvites/humanInvitePersonFlowCopy.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import {
  INV_ROLE_CARD_CLASS,
  INV_ROLE_CARD_ON_CLASS,
  INV_ROLE_GRID_CLASS,
} from "@/features/projects/access/humanInvites/invitePersonChromeClasses.constant";
import type { HumanInviteRole } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";
import AwcProjectMembersInfoTip from "@/features/projects/members/AwcProjectMembersInfoTip";

export type AwcHumanInvitePersonRolePickerProps = {
  readonly role: HumanInviteRole;
  readonly busy: boolean;
  readonly onRoleChange: (role: HumanInviteRole) => void;
};

/** Member / Viewer radio cards; the description lives in an (i) tip. */
export default function AwcHumanInvitePersonRolePicker({
  role,
  busy,
  onRoleChange,
}: AwcHumanInvitePersonRolePickerProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  return (
    <fieldset>
      <legend className="sr-only">
        {HUMAN_INVITE_PERSON_FLOW_COPY.roleLegend}
      </legend>
      <div className={INV_ROLE_GRID_CLASS}>
        {(["member", "viewer"] as const).map((value) => {
          const on = role === value;
          const isMember = value === "member";
          return (
            <label
              key={value}
              className={on ? INV_ROLE_CARD_ON_CLASS : INV_ROLE_CARD_CLASS}
            >
              <input
                type="radio"
                name="inv-role"
                value={value}
                checked={on}
                disabled={busy}
                onChange={() => onRoleChange(value)}
              />
              <span>{isMember ? copy.roleMember : copy.roleViewer}</span>
              <AwcProjectMembersInfoTip id={`inv-role-tip-${value}`}>
                {isMember ? copy.roleMemberOneLiner : copy.roleViewerOneLiner}
              </AwcProjectMembersInfoTip>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
