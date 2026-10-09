"use client";

import { useState } from "react";

import { setBotInviterApi } from "@/features/projects/access/utils/botManagementApi";
import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";
import AwcProjectMembersHelperBotInviterPicker from "@/features/projects/members/AwcProjectMembersHelperBotInviterPicker";
import { BOT_CLAIM_COPY as C } from "@/features/projects/members/botClaimCopy.constant";

type ClaimMember = Pick<
  AccessMembershipView,
  "id" | "canClaimBot" | "canChangeInviter" | "inviterChoices"
>;

const LINK =
  "awc-focus-ring text-[12.5px] font-semibold text-awc-primary hover:underline disabled:opacity-50";

/** Claim an unclaimed assistant; its owner can also change who invited it. */
export default function AwcProjectMembersHelperBotClaim({
  projectId,
  member,
  onChanged,
}: {
  readonly projectId: string;
  readonly member: ClaimMember;
  readonly onChanged: () => void;
}) {
  const choices = member.inviterChoices ?? [];
  const [picking, setPicking] = useState(false);
  const [choice, setChoice] = useState(
    choices.find((c) => c.isYou)?.userId ?? choices[0]?.userId ?? "",
  );
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  if (member.canClaimBot !== true && member.canChangeInviter !== true) {
    return null;
  }
  const submit = async (inviterUserId: string | null): Promise<void> => {
    setPending(true);
    setFailed(false);
    const ok = await setBotInviterApi(projectId, member.id, inviterUserId);
    setPending(false);
    if (ok) {
      setPicking(false);
      onChanged();
    } else {
      setFailed(true);
    }
  };
  return (
    <div className="flex flex-col gap-1 px-3.5 pb-2 pl-[2.75rem]">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {member.canClaimBot === true ? (
          <>
            <span className="text-[12.5px] text-awc-fg-muted">
              {C.unclaimed}
            </span>
            <button
              type="button"
              className={LINK}
              disabled={pending}
              onClick={() => void submit(null)}
            >
              {C.claim}
            </button>
          </>
        ) : null}
        {!picking ? (
          <button
            type="button"
            className={LINK}
            onClick={() => setPicking(true)}
          >
            {member.canClaimBot === true ? C.choose : C.change}
          </button>
        ) : null}
      </div>
      {picking ? (
        <AwcProjectMembersHelperBotInviterPicker
          choices={choices}
          choice={choice}
          pending={pending}
          onChoice={setChoice}
          onSubmit={() => void submit(choice)}
          onCancel={() => setPicking(false)}
        />
      ) : null}
      {failed ? (
        <span role="alert" className="text-[12.5px] text-awc-bad">
          {C.failed}
        </span>
      ) : null}
    </div>
  );
}
