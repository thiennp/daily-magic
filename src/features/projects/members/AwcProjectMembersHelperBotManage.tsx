"use client";

import { useState } from "react";

import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";
import AwcProjectMembersHelperBotClaim from "@/features/projects/members/AwcProjectMembersHelperBotClaim";
import AwcProjectMembersHelperBotLocks from "@/features/projects/members/AwcProjectMembersHelperBotLocks";
import { BOT_CONTROLS_LINK_CLASS as LINK } from "@/features/projects/members/botControlsClasses.constant";
import { BOT_MANAGEMENT_COPY as C } from "@/features/projects/members/botManagementCopy.constant";

type ManageMember = Pick<
  AccessMembershipView,
  | "id"
  | "canManageBot"
  | "canClaimBot"
  | "canChangeInviter"
  | "inviterChoices"
  | "isolatedFromOtherBots"
  | "closedToOthers"
>;

/** Collapsed "Manage" disclosure: block, restrict messages, claim, change inviter. */
export default function AwcProjectMembersHelperBotManage({
  projectId,
  member,
  onChanged,
}: {
  readonly projectId: string;
  readonly member: ManageMember;
  readonly onChanged: () => void;
}) {
  const [open, setOpen] = useState(false);
  const manage = member.canManageBot === true;
  const claimable =
    member.canClaimBot === true || member.canChangeInviter === true;
  if (!manage && !claimable) return null;
  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        className={`${LINK} self-start`}
        aria-expanded={open}
        aria-label={C.manageAria}
        onClick={() => setOpen(!open)}
      >
        {C.manage} {open ? "▴" : "▾"}
      </button>
      {open ? (
        <div className="flex flex-col items-start gap-1.5 border-l border-awc-line pl-3">
          {manage ? (
            <AwcProjectMembersHelperBotLocks
              projectId={projectId}
              membershipId={member.id}
              blocked={member.isolatedFromOtherBots === true}
              closed={member.closedToOthers === true}
              onChanged={onChanged}
            />
          ) : null}
          <AwcProjectMembersHelperBotClaim
            projectId={projectId}
            member={member}
            onChanged={onChanged}
          />
        </div>
      ) : null}
    </div>
  );
}
