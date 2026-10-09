"use client";

import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";
import { useHelperBotControls } from "@/features/projects/members/useHelperBotControls";
import {
  BOT_CONTROLS_CHIP_CLASS as CHIP,
  BOT_CONTROLS_LINK_CLASS as LINK,
} from "@/features/projects/members/botControlsClasses.constant";
import { BOT_MANAGEMENT_COPY as C } from "@/features/projects/members/botManagementCopy.constant";

type BotMember = Pick<
  AccessMembershipView,
  | "id"
  | "canManageBot"
  | "canClaimBot"
  | "isolatedFromOtherBots"
  | "closedToOthers"
  | "guidanceOutdated"
>;

/**
 * One status line under an assistant: chips for what is restricted or
 * pending, and Update guidance when it applies. Every other action lives
 * under Manage.
 */
export default function AwcProjectMembersHelperBotControls({
  projectId,
  member,
}: {
  readonly projectId: string;
  readonly member: BotMember;
}) {
  const bot = useHelperBotControls({ projectId, membershipId: member.id });
  const blocked = member.isolatedFromOtherBots === true;
  const closed = member.closedToOthers === true;
  const unclaimed = member.canClaimBot === true;
  const outdated =
    member.guidanceOutdated === true && member.canManageBot === true;
  if (!blocked && !closed && !unclaimed && !outdated) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      {blocked ? <span className={CHIP}>{C.blockedChip}</span> : null}
      {closed ? <span className={CHIP}>{C.closedChip}</span> : null}
      {unclaimed ? <span className={CHIP}>{C.unclaimedChip}</span> : null}
      {outdated ? <span className={CHIP}>{C.newGuidance}</span> : null}
      {outdated && bot.guidance !== "sent" ? (
        <button
          type="button"
          className={LINK}
          disabled={bot.guidance === "sending"}
          onClick={() => void bot.updateGuidance()}
        >
          {bot.guidance === "sending" ? C.updateSending : C.updateGuidance}
        </button>
      ) : null}
      {bot.guidance === "sent" ? (
        <span className="text-[12.5px] text-awc-fg-muted">{C.updateSent}</span>
      ) : null}
      {bot.guidance === "failed" ? (
        <span role="alert" className="text-[12.5px] text-awc-bad">
          {C.updateFailed}
        </span>
      ) : null}
    </div>
  );
}
