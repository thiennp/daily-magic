"use client";

import {
  InviteEyeIcon,
  InviteUsersIcon,
} from "@/features/projects/access/humanInvites/inviteInlineIcons";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type { HumanInviteRole } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

const initialsOf = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();

export const AcceptAvatar = ({ name }: { readonly name: string }) => (
  <span
    aria-hidden="true"
    className="grid h-9 w-9 flex-none place-items-center rounded-full bg-awc-accent-soft text-sm font-semibold text-awc-blue-700"
  >
    {initialsOf(name)}
  </span>
);

/** "Thien invited you" row. */
export const AcceptFromRow = ({ inviter }: { readonly inviter: string }) => (
  <div className="flex items-center gap-2.5 text-awc-fg-muted">
    <AcceptAvatar name={inviter} />
    <span>
      <b className="font-semibold text-awc-fg">{inviter}</b>{" "}
      {HUMAN_INVITE_UI_COPY.invitedYou}
    </span>
  </div>
);

/** Role tile: icon + name + one-liner. */
export const AcceptRoleBox = ({ role }: { readonly role: HumanInviteRole }) => {
  const copy = HUMAN_INVITE_UI_COPY;
  const member = role === "member";
  const Icon = member ? InviteUsersIcon : InviteEyeIcon;
  return (
    <div className="flex items-start gap-2.5 rounded-[14px] bg-awc-tile p-3">
      <span className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[10px] bg-awc-surface text-awc-blue-700">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="flex flex-col">
        <b className="font-semibold">
          {member ? copy.roleMember : copy.roleViewer}
        </b>
        <span className="text-sm text-awc-fg-muted">
          {member ? copy.roleMemberOneLiner : copy.roleViewerOneLiner}
        </span>
      </span>
    </div>
  );
};
