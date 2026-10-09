"use client";

import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";
import AwcProjectMembersHelperBotLocks from "@/features/projects/members/AwcProjectMembersHelperBotLocks";
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
  | "isolatedFromOtherBots"
  | "closedToOthers"
  | "guidanceOutdated"
>;

/** Per-assistant status line, shown to the owner and the inviting member. */
export default function AwcProjectMembersHelperBotControls({
  projectId,
  member,
  onChanged,
  indent = false,
}: {
  readonly projectId: string;
  readonly member: BotMember;
  readonly onChanged: () => void;
  readonly indent?: boolean;
}) {
  const bot = useHelperBotControls({ projectId, membershipId: member.id });
  const blocked = member.isolatedFromOtherBots === true;
  const closed = member.closedToOthers === true;
  const manage = member.canManageBot === true;
  const outdated = member.guidanceOutdated === true && manage;
  if (!manage && !blocked && !closed) return null;

  return (
    <div
      className={`flex flex-col gap-1 pb-2 pr-3.5 ${indent ? "pl-[2.75rem]" : "pl-3.5"}`}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {blocked ? <span className={CHIP}>{C.blockedChip}</span> : null}
        {closed ? <span className={CHIP}>{C.closedChip}</span> : null}
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
          <span className="text-[12.5px] text-awc-fg-muted">
            {C.updateSent}
          </span>
        ) : null}
        {manage ? (
          <AwcProjectMembersHelperBotLocks
            projectId={projectId}
            membershipId={member.id}
            blocked={blocked}
            closed={closed}
            onChanged={onChanged}
          />
        ) : null}
      </div>
      {bot.guidance === "failed" ? (
        <span role="alert" className="text-[12.5px] text-awc-bad">
          {C.updateFailed}
        </span>
      ) : null}
    </div>
  );
}
