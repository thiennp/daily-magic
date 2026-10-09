"use client";

import { ASSISTANT_WAKE_BLOCK_COPY as B } from "@/features/projects/members/assistantWakeBlockCopy.constant";
import { ASSISTANT_WAKE_HEALTH_COPY as W } from "@/features/projects/members/assistantWakeHealthCopy.constant";

const LINK =
  "ml-[2.75rem] self-start text-[13px] font-medium text-awc-primary underline-offset-2 hover:underline";

/** Under an assistant row: Retry when the wake check failed, or "paste a new link" when it can't be reached. */
export default function AwcProjectMembersHelperRowLinks({
  cantCheck,
  offerPaste,
  onRetry,
  onPaste,
}: {
  readonly cantCheck: boolean;
  readonly offerPaste: boolean;
  readonly onRetry: () => void;
  readonly onPaste: () => void;
}) {
  return (
    <>
      {cantCheck ? (
        <button type="button" className={LINK} onClick={onRetry}>
          {B.retry}
        </button>
      ) : null}
      {offerPaste ? (
        <button type="button" className={LINK} onClick={onPaste}>
          {W.pasteNew}
        </button>
      ) : null}
    </>
  );
}
