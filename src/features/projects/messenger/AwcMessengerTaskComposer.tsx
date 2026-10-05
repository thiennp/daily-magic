"use client";

import { useState } from "react";

import AwcMessengerTaskComposerFields from "@/features/projects/messenger/AwcMessengerTaskComposerFields";
import AwcMessengerTaskRefsPanel from "@/features/projects/messenger/AwcMessengerTaskRefsPanel";
import { buildInboxDispatchRefs } from "@/features/projects/access/inbox/utils/buildInboxDispatchRefs";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import { ACTIVITY_CTA_PRIMARY_CLASS } from "@/features/projects/messenger/activityChrome.constant";
import type { MessengerTaskAssigneeOption } from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";

interface AwcMessengerTaskComposerProps {
  readonly disabled: boolean;
  readonly sending: boolean;
  readonly assignees: readonly MessengerTaskAssigneeOption[];
  readonly defaultAssigneeMembershipId: string;
  readonly onSend: (draft: MessengerTaskDraft) => Promise<boolean>;
}

const EMPTY_REFS = {
  prUrl: "",
  commitSha: "",
  localPath: "",
  allowClaimId: "",
};

/** Task mode: assignee + summary≤200 + optional kind/refs → inbox/dispatch. */
export default function AwcMessengerTaskComposer({
  disabled,
  sending,
  assignees,
  defaultAssigneeMembershipId,
  onSend,
}: AwcMessengerTaskComposerProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  const [assigneeMembershipId, setAssigneeMembershipId] = useState(
    defaultAssigneeMembershipId,
  );
  const [syncedDefault, setSyncedDefault] = useState(defaultAssigneeMembershipId);
  const [summary, setSummary] = useState("");
  const [kind, setKind] = useState("");
  const [refs, setRefs] = useState(EMPTY_REFS);
  const [refsOpen, setRefsOpen] = useState(false);
  const busy = disabled || sending;

  if (defaultAssigneeMembershipId !== syncedDefault) {
    setSyncedDefault(defaultAssigneeMembershipId);
    setAssigneeMembershipId(defaultAssigneeMembershipId);
  }

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        if (busy) return;
        void onSend({
          assigneeMembershipId,
          summary,
          kind,
          refs: buildInboxDispatchRefs(refs),
        }).then((ok) => {
          if (!ok) return;
          setSummary("");
          setKind("");
          setRefs(EMPTY_REFS);
          setRefsOpen(false);
        });
      }}
    >
      <AwcMessengerTaskComposerFields
        disabled={busy}
        assignees={assignees}
        assigneeMembershipId={assigneeMembershipId}
        summary={summary}
        kind={kind}
        onAssigneeMembershipId={setAssigneeMembershipId}
        onSummary={setSummary}
        onKind={setKind}
      />
      <AwcMessengerTaskRefsPanel
        open={refsOpen}
        disabled={busy}
        refs={refs}
        onOpen={setRefsOpen}
        onRefs={setRefs}
      />
      <button
        type="submit"
        disabled={busy}
        className={`ml-auto ${ACTIVITY_CTA_PRIMARY_CLASS}`}
      >
        {copy.taskSend}
      </button>
    </form>
  );
}
