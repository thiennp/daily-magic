"use client";

import AwcProjectInboxDispatchRefsFields from "@/features/projects/access/inbox/AwcProjectInboxDispatchRefsFields";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import { ACTIVITY_LINK_CLASS } from "@/features/projects/messenger/activityChrome.constant";

export type MessengerTaskRefsDraft = {
  readonly prUrl: string;
  readonly commitSha: string;
  readonly localPath: string;
  readonly allowClaimId: string;
};

interface AwcMessengerTaskRefsPanelProps {
  readonly open: boolean;
  readonly disabled: boolean;
  readonly refs: MessengerTaskRefsDraft;
  readonly onOpen: (open: boolean) => void;
  readonly onRefs: (refs: MessengerTaskRefsDraft) => void;
}

export default function AwcMessengerTaskRefsPanel({
  open,
  disabled,
  refs,
  onOpen,
  onRefs,
}: AwcMessengerTaskRefsPanelProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  return (
    <>
      <button
        type="button"
        className={`self-start ${ACTIVITY_LINK_CLASS} text-xs`}
        disabled={disabled}
        aria-expanded={open}
        onClick={() => {
          onOpen(!open);
        }}
      >
        {open ? "− " : "+ "}
        {copy.taskRefsToggle}
      </button>
      {open ? (
        <AwcProjectInboxDispatchRefsFields
          prUrl={refs.prUrl}
          commitSha={refs.commitSha}
          localPath={refs.localPath}
          allowClaimId={refs.allowClaimId}
          onPrUrl={(prUrl) => {
            onRefs({ ...refs, prUrl });
          }}
          onCommitSha={(commitSha) => {
            onRefs({ ...refs, commitSha });
          }}
          onLocalPath={(localPath) => {
            onRefs({ ...refs, localPath });
          }}
          onAllowClaimId={(allowClaimId) => {
            onRefs({ ...refs, allowClaimId });
          }}
        />
      ) : null}
    </>
  );
}
