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
  "id" | "canManageBot" | "isolatedFromOtherBots" | "guidanceOutdated"
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
  const bot = useHelperBotControls({
    projectId,
    membershipId: member.id,
    onChanged,
  });
  const { guidance, confirming, setConfirming, setBlocked } = bot;
  const blocked = member.isolatedFromOtherBots === true;
  const manage = member.canManageBot === true;
  const outdated = member.guidanceOutdated === true && manage;
  if (!manage && !blocked) return null;

  return (
    <div
      className={`flex flex-col gap-1 pb-2 pr-3.5 ${indent ? "pl-[2.75rem]" : "pl-3.5"}`}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {blocked ? <span className={CHIP}>{C.blockedChip}</span> : null}
        {outdated ? <span className={CHIP}>{C.newGuidance}</span> : null}
        {outdated && guidance !== "sent" ? (
          <button
            type="button"
            className={LINK}
            disabled={guidance === "sending"}
            onClick={() => void bot.updateGuidance()}
          >
            {guidance === "sending" ? C.updateSending : C.updateGuidance}
          </button>
        ) : null}
        {guidance === "sent" ? (
          <span className="text-[12.5px] text-awc-fg-muted">
            {C.updateSent}
          </span>
        ) : null}
        {manage && !confirming ? (
          <button
            type="button"
            className={LINK}
            onClick={() =>
              blocked ? void setBlocked(false) : setConfirming(true)
            }
          >
            {blocked ? C.allow : C.block}
          </button>
        ) : null}
      </div>
      {confirming ? (
        <div
          role="alert"
          className="flex flex-col gap-1.5 text-[12.5px] text-awc-fg-muted"
        >
          <span>{C.blockWarn}</span>
          <span className="flex gap-3">
            <button
              type="button"
              className={LINK}
              onClick={() => void setBlocked(true)}
            >
              {C.blockConfirm}
            </button>
            <button
              type="button"
              className={LINK}
              onClick={() => setConfirming(false)}
            >
              {C.cancel}
            </button>
          </span>
        </div>
      ) : null}
      {guidance === "failed" ? (
        <span role="alert" className="text-[12.5px] text-awc-bad">
          {C.updateFailed}
        </span>
      ) : null}
      {bot.changeFailed ? (
        <span role="alert" className="text-[12.5px] text-awc-bad">
          {C.changeFailed}
        </span>
      ) : null}
    </div>
  );
}
