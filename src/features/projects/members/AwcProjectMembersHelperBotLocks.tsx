"use client";

import { BOT_CONTROLS_LINK_CLASS as LINK } from "@/features/projects/members/botControlsClasses.constant";
import { BOT_MANAGEMENT_COPY as C } from "@/features/projects/members/botManagementCopy.constant";
import { useHelperBotLocks } from "@/features/projects/members/useHelperBotLocks";

/**
 * The two switches an assistant's owner or inviter can flip any time: block it
 * from other people's assistants, and restrict messages to the inviter.
 */
export default function AwcProjectMembersHelperBotLocks({
  projectId,
  membershipId,
  blocked,
  closed,
  onChanged,
}: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly blocked: boolean;
  readonly closed: boolean;
  readonly onChanged: () => void;
}) {
  const locks = useHelperBotLocks({ projectId, membershipId, onChanged });
  return (
    <>
      {locks.confirming ? (
        <span
          role="alert"
          className="flex flex-col gap-1.5 text-[12.5px] text-awc-fg-muted"
        >
          <span>{C.blockWarn}</span>
          <span className="flex gap-3">
            <button
              type="button"
              className={LINK}
              onClick={() => void locks.change({ isolated: true })}
            >
              {C.blockConfirm}
            </button>
            <button
              type="button"
              className={LINK}
              onClick={() => locks.setConfirming(false)}
            >
              {C.cancel}
            </button>
          </span>
        </span>
      ) : (
        <>
          <button
            type="button"
            className={LINK}
            onClick={() =>
              blocked
                ? void locks.change({ isolated: false })
                : locks.setConfirming(true)
            }
          >
            {blocked ? C.allow : C.block}
          </button>
          <button
            type="button"
            className={LINK}
            onClick={() => void locks.change({ closed: !closed })}
          >
            {closed ? C.open : C.close}
          </button>
        </>
      )}
      {locks.failed ? (
        <span role="alert" className="text-[12.5px] text-awc-bad">
          {C.changeFailed}
        </span>
      ) : null}
    </>
  );
}
